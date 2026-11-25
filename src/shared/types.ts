/** 浏览器与宿主共用的纯类型，不依赖任何运行时环境。 */

export type ConditionKind = 'number' | 'enum' | 'bool' | 'text' | 'time' | 'board'
export type ConditionOp = 'gte' | 'lte' | 'between' | 'in' | 'eq' | 'contains'
export type BoardTag = 'industry' | 'cn_concept' | 'region'
export type ConditionSource = 'profile' | 'quote' | 'history' | 'limit' | 'hot' | 'board'
export type SortDirection = 'asc' | 'desc'
/** 与主项目 VIEW_OPTIONS 同键同义 */
export type ViewKind = 'list' | 'card' | 'podium' | 'group' | 'chip'
/** 与主项目 GROUP_BY_OPTIONS 同键 */
export type GroupKind = 'industry' | 'limit_times' | 'pct_band' | 'concept'
/** 与主项目 ACCENT_OPTIONS 同键 */
export type AccentKey =
  | 'indigo'
  | 'rose'
  | 'amber'
  | 'emerald'
  | 'sky'
  | 'violet'
  | 'orange'
  | 'teal'

/** 主项目的「全部满足 / 任一满足」顶层逻辑，不做嵌套布尔树。 */
export type LogicMode = 'and' | 'or'

export type MetricKey =
  | 'pct'
  | 'price'
  | 'amount'
  | 'volume'
  | 'amplitude'
  | 'gap'
  | 'pct5'
  | 'pct10'
  | 'volRatio5'
  | 'ma5dev'
  | 'boardCount'
  | 'sealMoney'
  | 'openTimes'
  | 'hotRank'
  | 'hotChange'
  | 'hotHeat'
  | 'skyRank'
  | 'pe'
  | 'pb'
  | 'turnoverRate'
  | 'totalMv'
  | 'circMv'
  | 'pct60'
  | 'ma60dev'
  | 'limitUpCnt60'
  | 'limitDownCnt60'
  | 'brokenCnt60'
  | 'maxStep60'
  | 'rsi24'
  | 'kdjJ'
  | 'bollPct'
  | 'cci'

export type ColumnKey = MetricKey | 'limitTime'

export type ConditionValue = number | string | string[] | { min: number; max: number }

/** 一条选股条件。`negate` 表示排除；`note` 仅用于界面展示板块名称等补充信息。 */
export interface ConditionClause {
  key: string
  op: ConditionOp
  value: ConditionValue
  negate?: boolean
  note?: string
}

export interface RankingConfig {
  id: string
  name: string
  note: string
  accent: AccentKey
  logic: LogicMode
  conditions: ConditionClause[]
  sortKey: MetricKey
  sortDir: SortDirection
  limit: number
  view: ViewKind
  columns: ColumnKey[]
  groupBy: GroupKind
  createdAt: string
  updatedAt: string
}

export interface RankingDraft {
  name: string
  note: string
  accent: AccentKey
  logic: LogicMode
  conditions: ConditionClause[]
  sortKey: MetricKey
  sortDir: SortDirection
  limit: number
  view: ViewKind
  columns: ColumnKey[]
  groupBy: GroupKind
}

export interface ResultRow {
  rank: number
  thscode: string
  ticker: string
  name: string
  board: string
  industry: string | null
  concepts: string[]
  isST: boolean
  price: number | null
  pct: number | null
  amount: number | null
  volume: number | null
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
  limitUp: boolean
  limitDown: boolean
  broken: boolean
  boardCount: number | null
  sealMoney: number | null
  openTimes: number | null
  limitTime: string | null
  hotRank: number | null
  hotChange: number | null
  hotHeat: number | null
  skyRank: number | null
  pe: number | null
  pb: number | null
  turnoverRate: number | null
  totalMv: number | null
  circMv: number | null
  tags: string[]
  spark: number[]
}

export interface ConditionHit {
  key: string
  label: string
  hits: number
  available: boolean
}

export interface EvaluateResult {
  ranking: RankingConfig
  /** 最近一个完整交易日（YYYY-MM-DD）。 */
  dataDate: string | null
  /** 盘中快照时点；只做预览，不写入数据日。 */
  previewAt: number | null
  asOf: number | null
  generatedAt: string
  universe: number
  matched: number
  insufficient: number
  rows: ResultRow[]
  conditionTexts: string[]
  conditionHits: ConditionHit[]
  sortText: string
  warnings: string[]
  elapsedMs: number
}

export interface BoardInfo {
  code: string
  name: string
  count: number | null
}

export interface ConnectionInfo {
  configured: boolean
  writable: boolean
  source?: string
  masked?: string
}

export interface DataSourceInfo {
  key: string
  name: string
  role: string
  status: 'ready' | 'need_key' | 'pending' | 'running'
}

/** 基础数据的本机初始化状态；只统计免费公开行情。 */
export interface BasicHistoryStatus {
  status: 'idle' | 'running' | 'ready' | 'error'
  done: number
  total: number
  failed: number
  coverage: number
  asOf: string | null
  updatedAt: string | null
  message?: string
}

export interface BootstrapData {
  connection: ConnectionInfo
  rankings: RankingConfig[]
  historyReady: boolean
  basic: BasicHistoryStatus
  sources: DataSourceInfo[]
  now: string
}

export interface ApiErrorBody {
  code: string
  message: string
}

export type ApiEnvelope<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiErrorBody }

export interface WallEntry {
  id: string
  name: string
  result?: EvaluateResult
  error?: string
}

export interface WallData {
  entries: WallEntry[]
  historyReady: boolean
  dataDate: string | null
  previewAt: number | null
}
