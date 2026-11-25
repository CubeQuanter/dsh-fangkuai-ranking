import { afterEach, describe, expect, it, vi } from 'vitest'
import { KeyInvalidError } from '../src/host/errors.ts'
import { FuyaoClient } from '../src/host/fuyao.ts'

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } })
}

function snapshotItem(index: number) {
  return {
    thscode: `${String(600000 + index).padStart(6, '0')}.SH`,
    ticker: String(600000 + index),
    volume: 100,
    turnover: 1000,
    last_price: 10,
    price_change: 1,
    price_change_ratio_pct: 1,
    open_price: 9.8,
    high_price: 10.2,
    low_price: 9.7,
    prev_price: 9.9,
  }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('FuyaoClient', () => {
  it('分页拉取完整快照并去重', async () => {
    const fetchMock = vi.fn(async (input: URL | string) => {
      const url = new URL(String(input))
      const offset = Number(url.searchParams.get('offset') ?? 0)
      if (url.pathname === '/api/a-share/prices/snapshot') {
        const items = offset === 0 ? Array.from({ length: 500 }, (_, index) => snapshotItem(index)) : [snapshotItem(500), snapshotItem(1)]
        return jsonResponse({ code: 0, message: 'ok', data: { timestamp: 123, total: 501, item: items } })
      }
      return jsonResponse({ code: 404, message: 'no', data: null })
    })
    vi.stubGlobal('fetch', fetchMock)
    const client = new FuyaoClient('key')
    const page = await client.fetchSnapshot()
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(page.total).toBe(501)
    expect(page.timestamp).toBe(123)
    expect(page.item).toHaveLength(501)
  })

  it('股票清单只保留规范的六位代码', async () => {
    const fetchMock = vi.fn(async () =>
      jsonResponse({
        code: 0,
        message: 'ok',
        data: {
          item: [
            { thscode: '600000.SH', ticker: '600000', name: '浦发银行', exchange: 'SH' },
            { thscode: '000001.SZ', ticker: '000001', name: '平安银行', exchange: 'SZ' },
            { thscode: 'BAD', ticker: 'BAD', name: '坏数据' },
          ],
        },
      }),
    )
    vi.stubGlobal('fetch', fetchMock)
    const client = new FuyaoClient('key')
    const items = await client.fetchTickers()
    expect(items.map((item) => item.thscode)).toEqual(['600000.SH', '000001.SZ'])
  })

  it('密钥错误立即失败，不重试', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ code: 2001, message: 'invalid key', data: null }))
    vi.stubGlobal('fetch', fetchMock)
    const client = new FuyaoClient('bad')
    await expect(client.test()).rejects.toBeInstanceOf(KeyInvalidError)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
