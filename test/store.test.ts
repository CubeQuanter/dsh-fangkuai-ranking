import { afterEach, describe, expect, it } from 'vitest'
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { baseDraft } from '../src/shared/catalog.ts'
import { RankingStore } from '../src/host/store.ts'

const directories: string[] = []
const ONE_CONDITION = [{ key: 'pct', op: 'gte', value: 1 }]

async function makeStore(): Promise<{ store: RankingStore; file: string; dir: string }> {
  const dir = await mkdtemp(join(tmpdir(), 'dsh-fuyao-store-'))
  directories.push(dir)
  const file = join(dir, 'rankings.json')
  return { store: new RankingStore(file), file, dir }
}

afterEach(async () => {
  await Promise.all(directories.map((dir) => rm(dir, { recursive: true, force: true })))
  directories.length = 0
})

describe('RankingStore', () => {
  it('首次打开播种三个榜单并落盘', async () => {
    const { store, file } = await makeStore()
    const list = await store.list()
    expect(list).toHaveLength(3)
    expect(list.map((item) => item.name)).toEqual(['今日涨停梯队', '热榜飙升', '成交额领涨'])
    const saved = JSON.parse(await readFile(file, 'utf8')) as { version: number; rankings: unknown[] }
    expect(saved.version).toBe(1)
    expect(saved.rankings).toHaveLength(3)
    expect(list.every((item) => item.id.length > 3 && item.createdAt.length > 10)).toBe(true)
  })

  it('创建、修改、删除，并拒绝重名', async () => {
    const { store } = await makeStore()
    const seeded = await store.list()
    const created = await store.create({ ...baseDraft(), name: '我的榜单', conditions: ONE_CONDITION })
    expect(created.name).toBe('我的榜单')
    expect(await store.get(created.id)).toBeDefined()

    await expect(store.create({ ...baseDraft(), name: '我的榜单', conditions: ONE_CONDITION })).rejects.toThrow(/同名/)
    await expect(store.update(seeded[1]!.id, { name: seeded[0]!.name })).rejects.toThrow(/同名/)

    const updated = await store.update(created.id, { name: '新的名字', view: 'cards' as never })
    expect(updated.name).toBe('新的名字')
    expect(updated.view).toBe('card')
    expect(updated.createdAt).toBe(created.createdAt)

    await store.remove(created.id)
    expect(await store.get(created.id)).toBeUndefined()
  })

  it('串行处理并发创建，文件始终可解析', async () => {
    const { store, file } = await makeStore()
    await store.list()
    const [left, right] = await Promise.all([
      store.create({ ...baseDraft(), name: '并发一', conditions: ONE_CONDITION }),
      store.create({ ...baseDraft(), name: '并发二', conditions: ONE_CONDITION }),
    ])
    expect(left.id).not.toBe(right.id)
    const saved = JSON.parse(await readFile(file, 'utf8')) as { rankings: unknown[] }
    expect(saved.rankings).toHaveLength(5)
  })

  it('升级时把旧目录榜单迁移到新目录', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'dsh-fuyao-store-'))
    directories.push(dir)
    const legacyFile = join(dir, 'old', 'rankings.json')
    const oldStore = new RankingStore(legacyFile)
    const oldList = await oldStore.list()
    const file = join(dir, 'new', 'rankings.json')
    const store = new RankingStore(file, legacyFile)
    const list = await store.list()
    expect(list.map((item) => item.id)).toEqual(oldList.map((item) => item.id))
    expect((await readFile(file, 'utf8')).length).toBeGreaterThan(0)
  })

  it('文件损坏时备份并重新播种', async () => {
    const { store, file, dir } = await makeStore()
    await writeFile(file, '{ 坏掉的内容', 'utf8')
    const list = await store.list()
    expect(list).toHaveLength(3)
    const names = await readdir(dir)
    expect(names.some((name) => name.includes('.broken-'))).toBe(true)
    expect((await readFile(file, 'utf8')).length).toBeGreaterThan(0)
  })
})
