import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { dshHomePath } from '@deepseek-ai/dsh-home-paths'
import { seedDrafts } from '../shared/catalog.ts'
import type { RankingConfig, RankingDraft } from '../shared/types.ts'
import { AppError } from './errors.ts'
import { normalizeDraft, normalizeStoredConfig } from './validate.ts'

const MAX_RANKINGS = 20

interface StoreFile {
  version: 1
  rankings: RankingConfig[]
}

function draftOf(config: RankingConfig): RankingDraft {
  return {
    name: config.name,
    note: config.note,
    accent: config.accent,
    logic: config.logic,
    conditions: config.conditions,
    sortKey: config.sortKey,
    sortDir: config.sortDir,
    limit: config.limit,
    view: config.view,
    columns: config.columns,
    groupBy: config.groupBy,
  }
}

function newId(): string {
  return `r${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
}

/** 榜单只保存在本机用户目录；写入串行、原子替换，避免半截文件。 */
export class RankingStore {
  private readonly file: string
  private readonly legacyFile: string | null
  private loaded: RankingConfig[] | null = null
  private loading: Promise<RankingConfig[]> | null = null
  private lock: Promise<unknown> = Promise.resolve()

  constructor(file?: string, legacyFile?: string) {
    this.file = file ?? join(dshHomePath('storages', 'fangkuai-ranking'), 'rankings.json')
    // 旧版插件叫 fuyao-ranking。升级时只在现场读一次，把旧榜单复制到新位置；
    // 不在两个目录间建立持续依赖，避免以后读错文件。
    this.legacyFile =
      legacyFile ?? (file ? null : join(dshHomePath('storages', 'fuyao-ranking'), 'rankings.json'))
  }

  private async load(): Promise<RankingConfig[]> {
    if (this.loaded) return this.loaded
    if (this.loading) return this.loading
    this.loading = this.readFile().finally(() => {
      this.loading = null
    })
    return this.loading
  }

  private async readLegacy(): Promise<RankingConfig[] | null> {
    if (!this.legacyFile) return null
    try {
      const text = await readFile(this.legacyFile, 'utf8')
      const parsed = JSON.parse(text) as Partial<StoreFile>
      const raw = parsed.rankings
      if (!Array.isArray(raw)) return null
      const rankings = raw.map(normalizeStoredConfig).filter((item): item is RankingConfig => item !== null)
      if (raw.length > 0 && rankings.length === 0) return null
      return rankings
    } catch {
      return null
    }
  }

  private async readFile(): Promise<RankingConfig[]> {
    try {
      const text = await readFile(this.file, 'utf8')
      const parsed = JSON.parse(text) as Partial<StoreFile>
      const rankings = Array.isArray(parsed.rankings)
        ? parsed.rankings.map(normalizeStoredConfig).filter((item): item is RankingConfig => item !== null)
        : []
      this.loaded = rankings
      return rankings
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code
      if (code === 'ENOENT') {
        const legacy = await this.readLegacy()
        if (legacy !== null) {
          this.loaded = legacy
          await this.write(legacy)
          return legacy
        }
        const seeded = seedDrafts().map((draft) => this.makeConfig(draft))
        this.loaded = seeded
        await this.write(seeded)
        return seeded
      }
      if (error instanceof SyntaxError) {
        await rename(this.file, `${this.file}.broken-${Date.now()}`).catch(() => undefined)
        const seeded = seedDrafts().map((draft) => this.makeConfig(draft))
        this.loaded = seeded
        await this.write(seeded)
        return seeded
      }
      throw error
    }
  }

  private makeConfig(draft: RankingDraft, now = new Date().toISOString()): RankingConfig {
    return { ...draft, id: newId(), createdAt: now, updatedAt: now }
  }

  private async write(rankings: RankingConfig[]): Promise<void> {
    await mkdir(dirname(this.file), { recursive: true })
    const body = `${JSON.stringify({ version: 1, rankings } satisfies StoreFile, null, 2)}\n`
    const temp = `${this.file}.tmp`
    await writeFile(temp, body, 'utf8')
    await rename(temp, this.file)
  }

  private serialize<T>(work: () => Promise<T>): Promise<T> {
    const run = this.lock.then(work, work)
    this.lock = run.then(
      () => undefined,
      () => undefined,
    )
    return run
  }

  async list(): Promise<RankingConfig[]> {
    return [...(await this.load())]
  }

  async get(id: string): Promise<RankingConfig | undefined> {
    return (await this.load()).find((item) => item.id === id)
  }

  async create(input: unknown): Promise<RankingConfig> {
    return this.serialize(async () => {
      const current = await this.load()
      if (current.length >= MAX_RANKINGS) throw new AppError('too_many', `最多保存 ${MAX_RANKINGS} 个榜单`)
      const draft = normalizeDraft(input)
      if (current.some((item) => item.name === draft.name)) {
        throw new AppError('duplicate_name', '已经有同名榜单了，请换一个名字')
      }
      const config = this.makeConfig(draft)
      const next = [...current, config]
      await this.write(next)
      this.loaded = next
      return config
    })
  }

  async update(id: string, patch: unknown): Promise<RankingConfig> {
    return this.serialize(async () => {
      const current = await this.load()
      const existing = current.find((item) => item.id === id)
      if (!existing) throw new AppError('not_found', '这个榜单已经不存在了', 404)
      const draft = normalizeDraft(patch, draftOf(existing))
      if (current.some((item) => item.id !== id && item.name === draft.name)) {
        throw new AppError('duplicate_name', '已经有同名榜单了，请换一个名字')
      }
      const next: RankingConfig = {
        ...existing,
        ...draft,
        updatedAt: new Date().toISOString(),
      }
      const rankings = current.map((item) => (item.id === id ? next : item))
      await this.write(rankings)
      this.loaded = rankings
      return next
    })
  }

  async remove(id: string): Promise<void> {
    return this.serialize(async () => {
      const current = await this.load()
      if (!current.some((item) => item.id === id)) throw new AppError('not_found', '这个榜单已经不存在了', 404)
      const rankings = current.filter((item) => item.id !== id)
      await this.write(rankings)
      this.loaded = rankings
    })
  }
}

