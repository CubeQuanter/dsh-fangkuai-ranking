import { conditionMeta } from '../shared/catalog.ts'
import type { BoardInfo, ColumnKey, MetricKey, RankingConfig } from '../shared/types.ts'
import type { Bar } from './history.ts'
import { HistoryStore } from './history.ts'
import { latestTradeDate } from './calendar.ts'
import type { FuyaoClient, HotItem, LimitBreakItem, LimitDownItem, LimitUpItem, TickerItem } from './fuyao.ts'

const SNAPSHOT_TTL = 30_000
const POOL_TTL = 60_000
const HOT_TTL = 60_000
const REFERENCE_TTL = 6 * 60 * 60 * 1000
const BOARD_TTL = 12 * 60 * 60 * 1000

interface QuoteRow {
  thscode: string
  ticker: string
  name: string
  board: string
  isST: boolean
  listedDays: number | null
  price: number | null
  pct: number | null
  amount: number | null
  volume: number | null
  high: number | null
  low: number | null
  amplitude: number | null
  gap: number | null
  pct5: number | null
  pct10: number | null
  volRatio5: number | null
  ma5dev: number | null
  pct60: number | null
  ma60dev: number | null
  aboveMa60: boolean | null
  limitUpCnt60: number | null
  limitDownCnt60: number | null
  brokenCnt60: number | null
  maxStep60: number | null
  rsi24: number | null
  kdjJ: number | null
  bollPct: number | null
  cci: number | null
  pe: number | null
  pb: number | null
  turnoverRate: number | null
  totalMv: number | null
  circMv: number | null
  aboveMa5: boolean | null
  aboveMa10: boolean | null
  maCross: boolean | null
  high5: boolean | null
  high10: boolean | null
  low5: boolean | null
  limitUp: boolean
  limitDown: boolean
  broken: boolean
  boardCount: number | null
  sealMoney: number | null
  openTimes: number | null
  limitTime: string | null
  limitReason: string | null
  hotRank: number | null
  hotChange: number | null
  hotHeat: number | null
  skyRank: number | null
  spark: number[]
}

export type MarketRow = QuoteRow

export interface BoardMembership {
  tag: string
  code: string
  name: string
  members: Set<string>
}

export interface BuiltMarket {
  rows: MarketRow[]
  asOf: number | null
  /** 最近一个完整交易日；盘中快照不推进这个日期。 */
  dataDate: string | null
  /** 盘中快照时点；只做预览，不写入数据日。 */
  previewAt: number | null
  warnings: string[]
  boardMembers: BoardMembership[]
  historyReady: boolean
}

function shanghaiToday(): string {
  return new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

function boardOf(code: string, exchange?: string | null): string {
  if (code.startsWith('688') || code.startsWith('689')) return 'kechuang'
  if (code.startsWith('300') || code.startsWith('301')) return 'chinext'
  if (exchange === 'BJ' || code.startsWith('4') || code.startsWith('8') || code.startsWith('92')) return 'beijing'
  if (exchange === 'SH') return 'main'
  if (code.startsWith('60')) return 'main'
  return 'main'
}

function listedDaysOf(listDate: string | null | undefined, today: string): number | null {
  if (!listDate) return null
  const day = listDate.slice(0, 10)
  const parsed = Date.parse(`${day}T00:00:00+08:00`)
  if (!Number.isFinite(parsed)) return null
  const todayMs = Date.parse(`${today}T00:00:00+08:00`)
  return Math.max(0, Math.floor((todayMs - parsed) / 86_400_000))
}

/** 上游有的接口给秒级时间戳，有的给毫秒；统一成毫秒再展示。 */
function timestampMs(value: number | null | undefined): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) return null
  return value < 1e11 ? value * 1000 : value
}

function num(value: unknown): number | null {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function timeText(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const text = value.trim()
  return /^\d{2}:\d{2}/.test(text) ? text.slice(0, 5) : null
}

function collectBoards(config: RankingConfig): { tag: string; code: string; note: string }[] {
  const result: { tag: string; code: string; note: string }[] = []
  for (const clause of config.conditions) {
    const meta = conditionMeta(clause.key)
    if (!meta || meta.kind !== 'board' || !meta.boardTag) continue
    if (!Array.isArray(clause.value)) continue
    for (const code of clause.value) {
      result.push({ tag: meta.boardTag, code, note: clause.note ?? '' })
    }
  }
  return result
}

function needsSource(config: RankingConfig, source: 'history' | 'limit' | 'hot'): boolean {
  if (config.conditions.some((clause) => conditionMeta(clause.key)?.source === source)) return true
  if (conditionSourceOfMetric(config.sortKey) === source) return true
  const limitColumns: ColumnKey[] = ['boardCount', 'sealMoney', 'openTimes', 'limitTime']
  const hotColumns: ColumnKey[] = ['hotRank', 'hotChange', 'hotHeat', 'skyRank']
  const historyColumns: ColumnKey[] = ['pct5', 'pct10', 'volRatio5', 'ma5dev']
  if (source === 'limit') return config.columns.some((key) => limitColumns.includes(key))
  if (source === 'hot') return config.columns.some((key) => hotColumns.includes(key))
  return config.columns.some((key) => historyColumns.includes(key))
}

function conditionSourceOfMetric(key: MetricKey): string | undefined {
  const limitKeys: MetricKey[] = ['boardCount', 'sealMoney', 'openTimes']
  const hotKeys: MetricKey[] = ['hotRank', 'hotChange', 'hotHeat', 'skyRank']
  const historyKeys: MetricKey[] = ['pct5', 'pct10', 'volRatio5', 'ma5dev']
  if (limitKeys.includes(key)) return 'limit'
  if (hotKeys.includes(key)) return 'hot'
  if (historyKeys.includes(key)) return 'history'
  return 'quote'
}

function historyMetrics(row: MarketRow, bars: Bar[] | undefined): void {
  if (!bars || bars.length === 0 || row.price === null || row.price <= 0) return
  const closes = bars.map((bar) => bar.close)
  const highs = bars.map((bar) => bar.high)
  const lows = bars.map((bar) => bar.low)
  const volumes = bars.map((bar) => bar.volume)
  if (closes.length >= 5) {
    const base5 = closes[closes.length - 5]
    if (base5 && base5 > 0) row.pct5 = (row.price / base5 - 1) * 100
  }
  if (closes.length >= 10) {
    const base10 = closes[closes.length - 10]
    if (base10 && base10 > 0) row.pct10 = (row.price / base10 - 1) * 100
  }
  if (volumes.length >= 5) {
    const last5 = volumes.slice(-5)
    const avg = last5.reduce((sum, value) => sum + value, 0) / last5.length
    if (avg > 0 && row.volume !== null && row.volume > 0) row.volRatio5 = row.volume / (avg / 1e6)
  }
  if (closes.length >= 4) {
    const ma5 = ([...closes.slice(-4), row.price].reduce((sum, value) => sum + value, 0)) / 5
    if (ma5 > 0) {
      row.ma5dev = (row.price / ma5 - 1) * 100
      row.aboveMa5 = row.price >= ma5
      if (closes.length >= 9) {
        const ma10 = ([...closes.slice(-9), row.price].reduce((sum, value) => sum + value, 0)) / 10
        row.aboveMa10 = row.price >= ma10
        if (closes.length >= 10) {
          const ma5Prev = closes.slice(-5).reduce((sum, value) => sum + value, 0) / 5
          const ma10Prev = closes.slice(-10).reduce((sum, value) => sum + value, 0) / 10
          row.maCross = ma5Prev <= ma10Prev && ma5 > ma10
        }
      }
    }
  }
  if (highs.length >= 5 && row.high !== null) {
    row.high5 = row.high >= Math.max(...highs.slice(-5))
  }
  if (highs.length >= 10 && row.high !== null) {
    row.high10 = row.high >= Math.max(...highs.slice(-10))
  }
  if (lows.length >= 5 && row.low !== null) {
    row.low5 = row.low <= Math.min(...lows.slice(-5))
  }
  row.spark = [...closes.slice(-10), row.price]
}

/** 实时行情层：只做查询与短时缓存，不落历史库；近 10 日窗口文件按日缓存。 */
export class MarketData {
  private readonly history = new HistoryStore()
  private readonly cache = new Map<string, { at: number; value: Promise<unknown> }>()

  private async cached<T>(key: string, ttl: number, force: boolean, loader: () => Promise<T>): Promise<T> {
    const now = Date.now()
    const hit = this.cache.get(key)
    if (!force && hit && now - hit.at < ttl) return (await hit.value) as T
    const value = loader()
    const entry = { at: now, value: value as Promise<unknown> }
    this.cache.set(key, entry)
    try {
      return await value
    } catch (error) {
      if (this.cache.get(key) === entry) this.cache.delete(key)
      throw error
    }
  }

  async tickers(client: FuyaoClient): Promise<TickerItem[]> {
    return this.cached('tickers', REFERENCE_TTL, false, () => client.fetchTickers())
  }

  async boardCatalog(client: FuyaoClient, tag: string): Promise<BoardInfo[]> {
    return this.cached(`boards:${tag}`, BOARD_TTL, false, async () => {
      const items = await client.fetchBoardCatalog(tag)
      return items.map((item) => ({ code: item.thscode, name: item.name, count: item.count ?? null }))
    })
  }

  async hasHistory(): Promise<boolean> {
    return this.history.hasToday()
  }

  async build(client: FuyaoClient, config: RankingConfig, force: boolean): Promise<BuiltMarket> {
    const today = shanghaiToday()
    const warnings: string[] = []
    const boards = collectBoards(config)
    const needsHistory = needsSource(config, 'history')
    const needsLimit = needsSource(config, 'limit')
    const needsHot = needsSource(config, 'hot')

    const [tickers, snapshot] = await Promise.all([
      this.tickers(client),
      this.cached('snapshot', SNAPSHOT_TTL, force, () => client.fetchSnapshot()),
    ])

    const pools = needsLimit
      ? await this.cached('pools', POOL_TTL, force, () => client.fetchLimitPools())
      : { up: [], down: [], broken: [] } as { up: LimitUpItem[]; down: LimitDownItem[]; broken: LimitBreakItem[] }
    const hot = needsHot
      ? await this.cached('hot', HOT_TTL, force, () => client.fetchHot())
      : { hot: [], skyrocket: [] } as { hot: HotItem[]; skyrocket: HotItem[] }

    const memberships: BoardMembership[] = []
    if (boards.length > 0) {
      const unique = new Map<string, { tag: string; code: string }>()
      for (const board of boards) unique.set(`${board.tag}:${board.code}`, board)
      const results = await Promise.all(
        [...unique.values()].map(async (board) => {
          const members = await this.cached(`members:${board.code}`, BOARD_TTL, false, () => client.fetchBoardMembers(board.code))
          return {
            tag: board.tag,
            code: board.code,
            name: '',
            members: new Set(members.map((item) => item.thscode)),
          }
        }),
      )
      memberships.push(...results)
    }

    let historyBars: Map<string, Bar[]> | null = null
    let dataDate: string | null = await latestTradeDate()
    if (needsHistory) {
      historyBars = await this.history.load(client)
      dataDate = this.history.latestDate() ?? dataDate
    } else {
      // 不加载整包历史，数据日由交易日历给出：始终是最近一个已完整收盘的交易日。
      historyBars = null
    }

    const snapshotMap = new Map(snapshot.item.map((item) => [item.thscode, item]))
    const hotMap = new Map(hot.hot.map((item) => [item.thscode, item]))
    const skyMap = new Map(hot.skyrocket.map((item) => [item.thscode, item]))
    const upMap = new Map(pools.up.map((item) => [item.thscode, item]))
    const downMap = new Map(pools.down.map((item) => [item.thscode, item]))
    const brokenMap = new Map(pools.broken.map((item) => [item.thscode, item]))

    const rows: MarketRow[] = []
    for (const ticker of tickers) {
      const quote = snapshotMap.get(ticker.thscode)
      if (!quote) continue
      const prev = num(quote.prev_price) ?? 0
      const high = num(quote.high_price) ?? 0
      const low = num(quote.low_price) ?? 0
      const open = num(quote.open_price) ?? 0
      const up = upMap.get(ticker.thscode)
      const down = downMap.get(ticker.thscode)
      const broken = brokenMap.get(ticker.thscode)
      const hotItem = hotMap.get(ticker.thscode)
      const skyItem = skyMap.get(ticker.thscode)
      const row: MarketRow = {
        thscode: ticker.thscode,
        ticker: ticker.ticker,
        name: ticker.name || ticker.ticker,
        board: boardOf(ticker.ticker, ticker.exchange),
        isST: /ST/i.test(ticker.name || '') || up?.is_st === true,
        listedDays: listedDaysOf(ticker.list_date, today),
        price: num(quote.last_price),
        pct: num(quote.price_change_ratio_pct),
        amount: num(quote.turnover) === null ? null : (num(quote.turnover) ?? 0) / 1e8,
        volume: num(quote.volume) === null ? null : (num(quote.volume) ?? 0) / 1e6,
        high: num(quote.high_price),
        low: num(quote.low_price),
        amplitude: prev > 0 ? ((high - low) / prev) * 100 : null,
        gap: prev > 0 && open > 0 ? (open / prev - 1) * 100 : null,
        pct5: null,
        pct10: null,
        volRatio5: null,
        ma5dev: null,
        pct60: null,
        ma60dev: null,
        aboveMa60: null,
        limitUpCnt60: null,
        limitDownCnt60: null,
        brokenCnt60: null,
        maxStep60: null,
        rsi24: null,
        kdjJ: null,
        bollPct: null,
        cci: null,
        pe: null,
        pb: null,
        turnoverRate: null,
        totalMv: null,
        circMv: null,
        aboveMa5: null,
        aboveMa10: null,
        maCross: null,
        high5: null,
        high10: null,
        low5: null,
        limitUp: up !== undefined,
        limitDown: down !== undefined,
        broken: broken !== undefined,
        boardCount: up ? (num(up.continue_day_cnt) ?? 0) : 0,
        sealMoney: up ? (num(up.seal_money) ?? 0) / 1e4 : 0,
        openTimes: broken ? (num(broken.open_times) ?? 0) : 0,
        limitTime: up ? timeText(up.limit_up_time) : null,
        limitReason: up ? (up.limit_up_reason ?? null) : null,
        hotRank: hotItem ? num(hotItem.rank) : null,
        hotChange: hotItem ? num(hotItem.rank_change) : null,
        hotHeat: hotItem ? (num(hotItem.heat) ?? 0) / 1e4 : null,
        skyRank: skyItem ? num(skyItem.rank) : null,
        spark: [],
      }
      if (historyBars) historyMetrics(row, historyBars.get(ticker.thscode))
      rows.push(row)
    }

    const missing = snapshot.item.length - rows.length
    if (missing > 0) warnings.push(`有 ${missing} 只股票当前没有行情，未参与计算`)

    return {
      rows,
      asOf: timestampMs(snapshot.timestamp),
      dataDate,
      previewAt: timestampMs(snapshot.timestamp),
      warnings,
      boardMembers: memberships,
      historyReady: historyBars !== null,
    }
  }
}
