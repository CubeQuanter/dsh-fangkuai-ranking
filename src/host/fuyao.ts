import { AppError, DataUnavailableError, KeyInvalidError } from './errors.ts'

const BASE_URL = 'https://fuyao.aicubes.cn'
const MAX_CONCURRENCY = 4
const MIN_GAP_MS = 180

interface Envelope<T> {
  code: number
  message: string
  data: T
  request_id?: string
}

interface Paged<T> {
  timestamp?: number
  total?: number
  pagination?: { total?: number; pages?: number; size?: number; page?: number }
  item?: T[]
}

export interface TickerItem {
  thscode: string
  ticker: string
  name: string
  exchange?: string | null
  asset_type?: string
  list_date?: string | null
}

export interface SnapshotItem {
  thscode: string
  ticker: string
  volume: number
  turnover: number
  last_price: number
  price_change: number
  price_change_ratio_pct: number
  open_price: number
  high_price: number
  low_price: number
  prev_price: number
}

export interface HotItem {
  thscode: string
  ticker: string
  name: string
  rank: number
  heat: string
  rank_change: number | null
  rank_trend?: string
}

export interface LimitUpItem {
  thscode: string
  ticker: string
  name: string
  last_price: number
  price_change_ratio_pct: number
  limit_up_time: string | null
  limit_up_reason: string | null
  continue_day_cnt: number
  seal_money: number
  max_seal_money?: number
  is_st?: boolean
  is_new?: boolean
}

export interface LimitDownItem {
  thscode: string
  ticker: string
  name: string
  last_price: number
  price_change_ratio_pct: number
  first_limit_time?: string
  last_limit_time?: string
  turnover_ratio_pct?: number
}

export interface LimitBreakItem {
  thscode: string
  ticker: string
  name: string
  last_price: number
  price_change_ratio_pct: number
  open_times: number
  turnover_ratio_pct?: number
  turnover?: number
}

export interface BoardItem {
  thscode: string
  name: string
  count?: number | null
}

export interface SnapshotPage {
  timestamp: number | null
  total: number
  item: SnapshotItem[]
}

class Gate {
  private active = 0
  private nextStart = 0

  async run<T>(work: () => Promise<T>): Promise<T> {
    await this.acquire()
    try {
      return await work()
    } finally {
      this.active -= 1
    }
  }

  private async acquire(): Promise<void> {
    for (;;) {
      const now = Date.now()
      const wait = this.nextStart - now
      if (this.active < MAX_CONCURRENCY && wait <= 0) {
        this.active += 1
        this.nextStart = now + MIN_GAP_MS
        return
      }
      await sleep(Math.max(30, Math.min(wait, 400)))
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function collectUrl(value: unknown): string {
  if (typeof value === 'string' && /^https?:\/\//.test(value)) return value
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = collectUrl(item)
      if (found) return found
    }
    return ''
  }
  if (typeof value === 'object' && value !== null) {
    for (const item of Object.values(value)) {
      const found = collectUrl(item)
      if (found) return found
    }
  }
  return ''
}

export class FuyaoClient {
  private readonly key: string
  private readonly gate = new Gate()

  constructor(key: string) {
    this.key = key
  }

  private async rawJson<T>(path: string, params?: Record<string, string | number | undefined>, timeoutMs = 20000): Promise<Envelope<T>> {
    const url = new URL(path, BASE_URL)
    if (params) {
      for (const [name, value] of Object.entries(params)) {
        if (value !== undefined && value !== '') url.searchParams.set(name, String(value))
      }
    }
    const response = await fetch(url, {
      headers: { 'X-api-key': this.key, accept: 'application/json' },
      signal: AbortSignal.timeout(timeoutMs),
    })
    if (response.status === 429) {
      throw new DataUnavailableError('数据服务正忙，请稍后再试', 'busy')
    }
    if (!response.ok) {
      throw new DataUnavailableError('暂时连不上扶摇数据服务，请检查网络后重试', 'network')
    }
    const body = (await response.json().catch(() => null)) as Envelope<T> | null
    if (!body || typeof body.code !== 'number') {
      throw new DataUnavailableError('扶摇数据服务返回了无法识别的内容', 'bad_response')
    }
    if (body.code === 2001 || body.code === 2002) throw new KeyInvalidError()
    if (body.code !== 0) {
      throw new AppError('data_service', '数据服务暂时没有响应这次查询，请稍后重试', 502)
    }
    return body
  }

  private async json<T>(path: string, params?: Record<string, string | number | undefined>, timeoutMs = 20000): Promise<T> {
    let lastError: unknown
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        return await this.gate.run(async () => (await this.rawJson<T>(path, params, timeoutMs)).data)
      } catch (error) {
        lastError = error
        if (error instanceof KeyInvalidError || (error instanceof AppError && error.status === 400)) throw error
        if (attempt < 2) await sleep(attempt === 0 ? 700 : 1800)
      }
    }
    if (lastError instanceof AppError) throw lastError
    throw new DataUnavailableError('暂时连不上扶摇数据服务，请检查网络后重试', 'network')
  }

  async test(): Promise<void> {
    await this.json<Paged<TickerItem>>('/api/meta/tickers/list', { asset_type: 'a-share', limit: 1 })
  }

  async fetchTickers(): Promise<TickerItem[]> {
    const rows: TickerItem[] = []
    let offset = 0
    for (let page = 0; page < 10; page += 1) {
      const data = await this.json<Paged<TickerItem>>('/api/meta/tickers/list', {
        asset_type: 'a-share',
        limit: 10000,
        offset,
      })
      const items = data.item ?? []
      if (items.length === 0) break
      rows.push(...items)
      offset += items.length
      if (items.length < 10000) break
    }
    return rows.filter((row) => /^\d{6}\.(SH|SZ|BJ)$/.test(row.thscode))
  }

  async fetchSnapshot(): Promise<SnapshotPage> {
    const first = await this.fetchSnapshotPage(0)
    const items = [...first.item]
    const total = first.total || items.length
    let timestamp = first.timestamp
    if (items.length >= 500) {
      const offsets: number[] = []
      for (let offset = 500; offset < total; offset += 500) offsets.push(offset)
      for (let index = 0; index < offsets.length; index += MAX_CONCURRENCY) {
        const batch = offsets.slice(index, index + MAX_CONCURRENCY)
        const pages = await Promise.all(batch.map((offset) => this.fetchSnapshotPage(offset)))
        for (const page of pages) {
          items.push(...page.item)
          timestamp = timestamp ?? page.timestamp
        }
      }
    } else if (items.length > 0) {
      let offset = items.length
      while (offset < total) {
        const page = await this.fetchSnapshotPage(offset)
        if (page.item.length === 0) break
        items.push(...page.item)
        timestamp = timestamp ?? page.timestamp
        offset += page.item.length
      }
    }
    const seen = new Set<string>()
    const unique = items.filter((item) => {
      if (!item.thscode || seen.has(item.thscode)) return false
      seen.add(item.thscode)
      return true
    })
    return { timestamp: timestamp ?? null, total: Math.max(total, unique.length), item: unique }
  }

  private async fetchSnapshotPage(offset: number): Promise<SnapshotPage> {
    const data = await this.json<Paged<SnapshotItem>>('/api/a-share/prices/snapshot', { limit: 500, offset })
    return {
      timestamp: typeof data.timestamp === 'number' ? data.timestamp : null,
      total: typeof data.total === 'number' ? data.total : (data.item?.length ?? 0),
      item: data.item ?? [],
    }
  }

  async fetchLimitPools(): Promise<{ up: LimitUpItem[]; down: LimitDownItem[]; broken: LimitBreakItem[] }> {
    const [up, down, broken] = await Promise.all([
      this.fetchPool<LimitUpItem>('/api/a-share/special-data/limit-up-pool', 'limit_up_time'),
      this.fetchPool<LimitDownItem>('/api/a-share/special-data/limit-down-pool', 'last_limit_time'),
      this.fetchPool<LimitBreakItem>('/api/a-share/special-data/limit-break-pool', 'open_times'),
    ])
    return { up, down, broken }
  }

  private async fetchPool<T>(path: string, sortField: string): Promise<T[]> {
    const first = await this.json<Paged<T>>(path, { page: 1, size: 200, sort_field: sortField, sort_dir: 'desc' })
    const items = [...(first.item ?? [])]
    const pages = first.pagination?.pages ?? 1
    if (pages > 1) {
      const rest: number[] = []
      for (let page = 2; page <= pages; page += 1) rest.push(page)
      for (let index = 0; index < rest.length; index += MAX_CONCURRENCY) {
        const batch = rest.slice(index, index + MAX_CONCURRENCY)
        const results = await Promise.all(
          batch.map((page) => this.json<Paged<T>>(path, { page, size: 200, sort_field: sortField, sort_dir: 'desc' })),
        )
        for (const result of results) items.push(...(result.item ?? []))
      }
    }
    return items
  }

  async fetchHot(): Promise<{ hot: HotItem[]; skyrocket: HotItem[] }> {
    const [hot, skyrocket] = await Promise.all([
      this.json<Paged<HotItem>>('/api/a-share/special-data/hot-stock-list', { period: 'day', limit: 100 }),
      this.json<Paged<HotItem>>('/api/a-share/special-data/skyrocket-list', { period: 'day', limit: 100 }),
    ])
    return { hot: hot.item ?? [], skyrocket: skyrocket.item ?? [] }
  }

  async fetchBoardCatalog(tag: string): Promise<BoardItem[]> {
    const data = await this.json<Paged<BoardItem>>('/api/a-share-index/catalog/ths-index-list', { tag })
    return data.item ?? []
  }

  async fetchBoardMembers(boardCode: string): Promise<BoardItem[]> {
    const data = await this.json<Paged<BoardItem>>('/api/a-share-index/constituents/ths-stock-list', {
      thscode: boardCode,
    })
    return data.item ?? []
  }

  async fetchDumpUrl(): Promise<string> {
    const data = await this.json<unknown>('/api/dump/market-dumps/daily-k-10d/download-url', undefined, 30000)
    const url = collectUrl(data)
    if (!url) throw new DataUnavailableError('近10日行情暂时没有准备好，请稍后再试', 'history')
    return url
  }

  async downloadDump(url: string): Promise<ArrayBuffer> {
    const response = await fetch(url, { signal: AbortSignal.timeout(120000) })
    if (!response.ok) throw new DataUnavailableError('近10日行情下载失败，请稍后重试', 'history')
    const length = Number(response.headers.get('content-length') ?? '0')
    if (length > 120 * 1024 * 1024) throw new DataUnavailableError('近10日行情文件异常偏大，已停止读取', 'history')
    return response.arrayBuffer()
  }
}
