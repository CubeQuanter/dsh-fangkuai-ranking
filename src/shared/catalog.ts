import type {
  AccentKey,
  BoardTag,
  ColumnKey,
  ConditionKind,
  ConditionOp,
  ConditionSource,
  ConditionValue,
  GroupKind,
  MetricKey,
  RankingDraft,
  SortDirection,
  ViewKind,
} from './types.ts'

export interface ConditionGroup {
  id: string
  label: string
  hint: string
}

export interface ConditionMeta {
  key: string
  label: string
  group: string
  kind: ConditionKind
  source: ConditionSource
  ops: ConditionOp[]
  defaultOp: ConditionOp
  defaultValue: ConditionValue
  unit?: string
  min?: number
  max?: number
  step?: number
  maxLength?: number
  placeholder?: string
  hint?: string
  options?: { value: string; label: string }[]
  boardTag?: BoardTag
}

export interface MetricMeta {
  key: ColumnKey
  label: string
  short: string
  unit?: string
  sortable: boolean
  defaultDir: SortDirection
}

export interface AccentMeta {
  key: AccentKey
  label: string
  color: string
}

export interface TemplateMeta {
  id: string
  name: string
  accent: AccentKey
  description: string
  /** 模板不强制填备注/逻辑，由 draftFromTemplate 补默认值。 */
  draft: Omit<RankingDraft, 'name' | 'note' | 'logic'>
}

export const CONDITION_GROUPS: ConditionGroup[] = [
  { id: 'scope', label: '范围与身份', hint: '先圈定看哪一类股票' },
  { id: 'quote', label: '行情与量能', hint: '价格、成交和波动' },
  { id: 'valuation', label: '估值与换手', hint: '市盈率、市值和换手' },
  { id: 'window', label: '短线窗口', hint: '近 5 到 10 个交易日的强弱' },
  { id: 'limit', label: '涨停与打板', hint: '封板、连板和炸板状态' },
  { id: 'trend', label: '趋势与历史', hint: '近 60 个交易日的趋势与技术指标' },
  { id: 'hot', label: '热榜与情绪', hint: '同花顺热榜和飙升榜' },
]

/** 条件选择器首屏只放这些高频条件；其余收在「更多条件」里，避免一次摊 53 个。
 *  选的是覆盖「圈范围、看强弱、抓涨停、跟情绪」四类动作的最小集，
 *  不是按数据源或字段数量摊平。 */
export const COMMON_CONDITION_KEYS: string[] = [
  'keyword',
  'industry',
  'concept',
  'pct',
  'amount',
  'pct5',
  'pct60',
  'volRatio5',
  'aboveMa5',
  'high5',
  'limitUp',
  'limitUpCnt60',
  'maxStep60',
  'boardCount',
  'sealMoney',
  'hotRank',
  'onHot',
]

const NUMERIC_OPS: ConditionOp[] = ['gte', 'lte', 'between']
const BOARD_OPTIONS = [
  { value: 'main', label: '沪深主板' },
  { value: 'chinext', label: '创业板' },
  { value: 'kechuang', label: '科创板' },
  { value: 'beijing', label: '北交所' },
]

function numberCondition(
  key: MetricKey | string,
  label: string,
  group: string,
  source: ConditionSource,
  defaultValue: number,
  unit: string | undefined,
  hint: string,
  extra?: Partial<ConditionMeta>,
): ConditionMeta {
  return {
    key,
    label,
    group,
    kind: 'number',
    source,
    ops: NUMERIC_OPS,
    defaultOp: 'gte',
    defaultValue,
    ...(unit === undefined ? {} : { unit }),
    hint,
    ...extra,
  }
}

function yesNoCondition(
  key: string,
  label: string,
  group: string,
  source: ConditionSource,
  hint: string,
): ConditionMeta {
  return {
    key,
    label,
    group,
    kind: 'bool',
    source,
    ops: ['eq'],
    defaultOp: 'eq',
    defaultValue: 'yes',
    hint,
  }
}

export const CONDITIONS: ConditionMeta[] = [
  {
    key: 'keyword',
    label: '名称或代码包含',
    group: 'scope',
    kind: 'text',
    source: 'profile',
    ops: ['contains'],
    defaultOp: 'contains',
    defaultValue: '',
    maxLength: 12,
    placeholder: '如：宁德、300750',
    hint: '不区分大小写，支持简称或六位代码',
  },
  {
    key: 'board',
    label: '所属市场',
    group: 'scope',
    kind: 'enum',
    source: 'profile',
    ops: ['in'],
    defaultOp: 'in',
    defaultValue: ['main'],
    options: BOARD_OPTIONS,
    hint: '可同时勾选多个市场',
  },
  {
    key: 'industry',
    label: '所属行业',
    group: 'scope',
    kind: 'board',
    source: 'board',
    boardTag: 'industry',
    ops: ['in'],
    defaultOp: 'in',
    defaultValue: [],
    hint: '按同花顺行业板块筛选，可多选',
  },
  {
    key: 'concept',
    label: '所属概念',
    group: 'scope',
    kind: 'board',
    source: 'board',
    boardTag: 'cn_concept',
    ops: ['in'],
    defaultOp: 'in',
    defaultValue: [],
    hint: '按同花顺概念板块筛选，可多选',
  },
  {
    key: 'region',
    label: '所属地域',
    group: 'scope',
    kind: 'board',
    source: 'board',
    boardTag: 'region',
    ops: ['in'],
    defaultOp: 'in',
    defaultValue: [],
    hint: '按地域板块筛选，可多选',
  },
  numberCondition('listedDays', '上市天数不超过', 'scope', 'profile', 60, '天', '用于挑次新股；0 表示今天上市', {
    min: 0,
    max: 3650,
    step: 1,
  }),
  yesNoCondition('isST', '风险警示股', 'scope', 'profile', '风险警示股通常带有 ST 标识'),

  numberCondition('price', '最新价', 'quote', 'quote', 10, '元', '按当前成交价筛选', {
    min: 0,
    max: 10000,
    step: 0.01,
  }),
  numberCondition('pct', '今日涨跌幅', 'quote', 'quote', 3, '%', '正数为上涨，负数为下跌', {
    min: -100,
    max: 100,
    step: 0.01,
  }),
  numberCondition('amount', '成交额', 'quote', 'quote', 1, '亿元', '盘中累计成交金额', {
    min: 0,
    max: 10000,
    step: 0.1,
  }),
  numberCondition('volume', '成交量', 'quote', 'quote', 500, '万手', '盘中累计成交手数', {
    min: 0,
    max: 100000,
    step: 10,
  }),
  numberCondition('amplitude', '振幅', 'quote', 'quote', 5, '%', '今日最高与最低的波动幅度', {
    min: 0,
    max: 100,
    step: 0.1,
  }),
  numberCondition('gap', '开盘涨幅', 'quote', 'quote', 0, '%', '开盘价相对昨收的涨跌', {
    min: -100,
    max: 100,
    step: 0.01,
  }),

  numberCondition('pe', '市盈率 PE', 'valuation', 'profile', 30, '倍', '东方财富公开行情口径，亏损股可能为负', {
    min: -1000,
    max: 5000,
    step: 0.1,
  }),
  numberCondition('pb', '市净率 PB', 'valuation', 'profile', 3, '倍', '股价相对每股净资产', {
    min: 0,
    max: 1000,
    step: 0.01,
  }),
  numberCondition('turnoverRate', '换手率', 'valuation', 'profile', 3, '%', '当日成交占流通股本的比例', {
    min: 0,
    max: 100,
    step: 0.01,
  }),
  numberCondition('totalMv', '总市值', 'valuation', 'profile', 100, '亿元', '按最新价计算的总市值', {
    min: 0,
    max: 100000,
    step: 1,
  }),
  numberCondition('circMv', '流通市值', 'valuation', 'profile', 100, '亿元', '按最新价计算的流通市值', {
    min: 0,
    max: 100000,
    step: 1,
  }),

  numberCondition('pct5', '5日涨跌幅', 'window', 'history', 5, '%', '近 5 个交易日累计涨跌', {
    min: -100,
    max: 500,
    step: 0.1,
  }),
  numberCondition('pct10', '10日涨跌幅', 'window', 'history', 10, '%', '近 10 个交易日累计涨跌', {
    min: -100,
    max: 1000,
    step: 0.1,
  }),
  numberCondition('volRatio5', '5日量比', 'window', 'history', 1.5, '倍', '今日成交量相对前 5 日均量的倍数', {
    min: 0,
    max: 50,
    step: 0.1,
  }),
  numberCondition('ma5dev', '偏离5日均线', 'window', 'history', 3, '%', '现价高于 5 日均线的幅度', {
    min: -100,
    max: 100,
    step: 0.1,
  }),
  yesNoCondition('aboveMa5', '站上5日均线', 'window', 'history', '现价在 5 日均线上方'),
  yesNoCondition('aboveMa10', '站上10日均线', 'window', 'history', '现价在 10 日均线上方'),
  yesNoCondition('maCross', '5日线上穿10日线', 'window', 'history', '昨日 5 日线不高于 10 日线，今日上穿'),
  yesNoCondition('high5', '创5日新高', 'window', 'history', '今日最高价超过前 5 个交易日最高价'),
  yesNoCondition('high10', '创10日新高', 'window', 'history', '今日最高价超过前 10 个交易日最高价'),
  yesNoCondition('low5', '创5日新低', 'window', 'history', '今日最低价低于前 5 个交易日最低价'),

  yesNoCondition('limitUp', '今日涨停', 'limit', 'limit', '来自当日涨停股票池'),
  yesNoCondition('limitDown', '今日跌停', 'limit', 'limit', '来自当日跌停股票池'),
  yesNoCondition('broken', '今日炸板', 'limit', 'limit', '盘中触及涨停后打开'),
  numberCondition('boardCount', '连板数', 'limit', 'limit', 2, '板', '首板为 1，连续涨停依次递增', {
    min: 1,
    max: 30,
    step: 1,
  }),
  numberCondition('sealMoney', '封单金额', 'limit', 'limit', 1000, '万元', '涨停价上当前封单金额', {
    min: 0,
    max: 1000000,
    step: 100,
  }),
  numberCondition('openTimes', '开板次数', 'limit', 'limit', 3, '次', '炸板股票盘中的开板次数', {
    min: 0,
    max: 100,
    step: 1,
  }),
  {
    key: 'limitTime',
    label: '封板时间不晚于',
    group: 'limit',
    kind: 'time',
    source: 'limit',
    ops: ['lte'],
    defaultOp: 'lte',
    defaultValue: '10:00',
    hint: '只对涨停股票有效',
  },
  {
    key: 'limitReason',
    label: '涨停原因包含',
    group: 'limit',
    kind: 'text',
    source: 'limit',
    ops: ['contains'],
    defaultOp: 'contains',
    defaultValue: '',
    maxLength: 12,
    placeholder: '如：存储、机器人',
    hint: '来自涨停池给出的题材原因',
  },

  numberCondition('limitUpCnt60', '近 60 日涨停次数', 'trend', 'history', 3, '次', '按日 K 的涨跌停价推导，含今天；ST 按 5% 口径', {
    min: 0,
    max: 60,
    step: 1,
  }),
  numberCondition('limitDownCnt60', '近 60 日跌停次数', 'trend', 'history', 1, '次', '按日 K 的涨跌停价推导，含今天', {
    min: 0,
    max: 60,
    step: 1,
  }),
  numberCondition('brokenCnt60', '近 60 日炸板次数', 'trend', 'history', 2, '次', '盘中触及涨停或跌停价但收盘没有封住', {
    min: 0,
    max: 60,
    step: 1,
  }),
  numberCondition('maxStep60', '近 60 日最高连板', 'trend', 'history', 2, '板', '连续涨停的最高天数，不是今天的连板数', {
    min: 0,
    max: 60,
    step: 1,
  }),
  numberCondition('pct60', '近 60 日涨跌幅', 'trend', 'history', 10, '%', '最近 60 个交易日的累计涨跌', {
    min: -100,
    max: 1000,
    step: 1,
  }),
  numberCondition('ma60dev', '偏离 60 日均线', 'trend', 'history', 5, '%', '现价相对 60 日均线的偏离幅度', {
    min: -100,
    max: 100,
    step: 0.1,
  }),
  yesNoCondition('aboveMa60', '站上 60 日均线', 'trend', 'history', '收盘价在 60 日均线上方'),
  numberCondition('rsi24', 'RSI（24 日）', 'trend', 'history', 70, '', '相对强弱指标，0 到 100，越高越强', {
    min: 0,
    max: 100,
    step: 0.1,
  }),
  numberCondition('kdjJ', 'KDJ 的 J 值', 'trend', 'history', 80, '', '9 日 KDJ 的 J 值，超过 80 常视为短线偏热', {
    min: -50,
    max: 150,
    step: 0.1,
  }),
  numberCondition('bollPct', '布林带位置', 'trend', 'history', 80, '%', '0 在下轨、100 在上轨；超过 100 表示突破上轨', {
    min: -100,
    max: 200,
    step: 0.1,
  }),
  numberCondition('cci', 'CCI（14 日）', 'trend', 'history', 100, '', '顺势指标，超过 100 表示走势偏强', {
    min: -500,
    max: 500,
    step: 0.1,
  }),

  numberCondition('hotRank', '热榜排名', 'hot', 'hot', 20, '名', '数值越小排名越靠前', {
    min: 1,
    max: 100,
    step: 1,
  }),
  numberCondition('hotChange', '热榜排名上升', 'hot', 'hot', 5, '位', '正数表示排名上升的位次数', {
    min: 0,
    max: 200,
    step: 1,
  }),
  numberCondition('hotHeat', '热度值', 'hot', 'hot', 50, '万', '同花顺热榜热度，按万展示', {
    min: 0,
    max: 100000,
    step: 1,
  }),
  yesNoCondition('onHot', '进入热榜', 'hot', 'hot', '在当日热股榜前 100 名内'),
  yesNoCondition('onSkyrocket', '进入飙升榜', 'hot', 'hot', '在当日热度飙升榜前 100 名内'),
  numberCondition('skyRank', '飙升榜排名', 'hot', 'hot', 20, '名', '数值越小排名越靠前', {
    min: 1,
    max: 100,
    step: 1,
  }),
]

export const METRICS: MetricMeta[] = [
  { key: 'pct', label: '涨跌幅', short: '涨跌', unit: '%', sortable: true, defaultDir: 'desc' },
  { key: 'price', label: '最新价', short: '现价', unit: '元', sortable: true, defaultDir: 'desc' },
  { key: 'amount', label: '成交额', short: '成交额', unit: '亿元', sortable: true, defaultDir: 'desc' },
  { key: 'volume', label: '成交量', short: '成交量', unit: '万手', sortable: true, defaultDir: 'desc' },
  { key: 'amplitude', label: '振幅', short: '振幅', unit: '%', sortable: true, defaultDir: 'desc' },
  { key: 'gap', label: '开盘涨幅', short: '开盘', unit: '%', sortable: true, defaultDir: 'desc' },
  { key: 'pct5', label: '5日涨跌幅', short: '5日', unit: '%', sortable: true, defaultDir: 'desc' },
  { key: 'pct10', label: '10日涨跌幅', short: '10日', unit: '%', sortable: true, defaultDir: 'desc' },
  { key: 'pct60', label: '60日涨跌幅', short: '60日', unit: '%', sortable: true, defaultDir: 'desc' },
  { key: 'volRatio5', label: '5日量比', short: '量比', unit: '倍', sortable: true, defaultDir: 'desc' },
  { key: 'ma5dev', label: '偏离5日均线', short: '偏离', unit: '%', sortable: true, defaultDir: 'desc' },
  { key: 'ma60dev', label: '偏离60日均线', short: '60日线', unit: '%', sortable: true, defaultDir: 'desc' },
  { key: 'limitUpCnt60', label: '60日涨停次数', short: '60日涨停', unit: '次', sortable: true, defaultDir: 'desc' },
  { key: 'limitDownCnt60', label: '60日跌停次数', short: '60日跌停', unit: '次', sortable: true, defaultDir: 'desc' },
  { key: 'brokenCnt60', label: '60日炸板次数', short: '60日炸板', unit: '次', sortable: true, defaultDir: 'desc' },
  { key: 'maxStep60', label: '60日最高连板', short: '最高连板', unit: '板', sortable: true, defaultDir: 'desc' },
  { key: 'rsi24', label: 'RSI(24)', short: 'RSI', unit: '', sortable: true, defaultDir: 'desc' },
  { key: 'kdjJ', label: 'KDJ 的 J 值', short: 'KDJ', unit: '', sortable: true, defaultDir: 'desc' },
  { key: 'bollPct', label: '布林带位置', short: '布林', unit: '%', sortable: true, defaultDir: 'desc' },
  { key: 'cci', label: 'CCI(14)', short: 'CCI', unit: '', sortable: true, defaultDir: 'desc' },
  { key: 'boardCount', label: '连板数', short: '连板', unit: '板', sortable: true, defaultDir: 'desc' },
  { key: 'sealMoney', label: '封单额', short: '封单', unit: '万元', sortable: true, defaultDir: 'desc' },
  { key: 'openTimes', label: '开板次数', short: '开板', unit: '次', sortable: true, defaultDir: 'desc' },
  { key: 'limitTime', label: '封板时间', short: '封板', sortable: false, defaultDir: 'asc' },
  { key: 'hotRank', label: '热榜排名', short: '热榜', unit: '名', sortable: true, defaultDir: 'asc' },
  { key: 'hotChange', label: '热榜上升', short: '上升', unit: '位', sortable: true, defaultDir: 'desc' },
  { key: 'hotHeat', label: '热度', short: '热度', unit: '万', sortable: true, defaultDir: 'desc' },
  { key: 'skyRank', label: '飙升榜排名', short: '飙升', unit: '名', sortable: true, defaultDir: 'asc' },
  { key: 'pe', label: 'PE(TTM)', short: 'PE', unit: '倍', sortable: false, defaultDir: 'desc' },
  { key: 'pb', label: 'PB', short: 'PB', unit: '倍', sortable: false, defaultDir: 'desc' },
  { key: 'turnoverRate', label: '换手率', short: '换手', unit: '%', sortable: false, defaultDir: 'desc' },
  { key: 'totalMv', label: '总市值', short: '市值', unit: '亿', sortable: false, defaultDir: 'desc' },
  { key: 'circMv', label: '流通市值', short: '流通', unit: '亿', sortable: false, defaultDir: 'desc' },
]

/** 这些条件依赖本机 6 个月基础历史；未初始化时应提示，而不是静默判为不符合。 */
export const BASIC_METRIC_KEYS = new Set([
  'pct60',
  'ma60dev',
  'aboveMa60',
  'limitUpCnt60',
  'limitDownCnt60',
  'brokenCnt60',
  'maxStep60',
  'rsi24',
  'kdjJ',
  'bollPct',
  'cci',
])

export const ACCENTS: AccentMeta[] = [  { key: 'indigo', label: '靛蓝', color: '#6366f1' },
  { key: 'rose', label: '玫红', color: '#f43f5e' },
  { key: 'amber', label: '琥珀', color: '#f59e0b' },
  { key: 'emerald', label: '翠绿', color: '#10b981' },
  { key: 'sky', label: '天蓝', color: '#0ea5e9' },
  { key: 'violet', label: '紫罗兰', color: '#8b5cf6' },
  { key: 'orange', label: '橙', color: '#f97316' },
  { key: 'teal', label: '青', color: '#14b8a6' },
]

export const VIEWS: { key: ViewKind; label: string; hint: string }[] = [
  { key: 'list', label: '列表', hint: '表格形态：精确读数、可排序、可分页，看名单的默认选择' },
  { key: 'card', label: '卡片墙', hint: '每股一张小卡：名称 + 涨跌幅大字 + 三个关键指标 + 命中理由' },
  { key: 'podium', label: '排行榜', hint: '前三名领奖台突出，其余按排序指标画长度条，名次感最强' },
  { key: 'group', label: '分组', hint: '按行业/概念/连板高度分组折叠，看结构而不是看个体' },
  { key: 'chip', label: '芯片墙', hint: '极致密度的色块墙，一屏盯几十只，涨跌停带角标' },
]

export const GROUPS: { key: GroupKind; label: string }[] = [
  { key: 'industry', label: '所属行业' },
  { key: 'limit_times', label: '连板高度' },
  { key: 'pct_band', label: '涨跌幅区间' },
  { key: 'concept', label: '所属题材' },
]

export const TEMPLATES: TemplateMeta[] = [
  {
    id: 'limit-ladder',
    name: '今日涨停梯队',
    accent: 'rose',
    description: '按连板高度排序，一眼看清今天的晋级梯队。',
    draft: {
      accent: 'rose',
      conditions: [
        { key: 'limitUp', op: 'eq', value: 'yes' },
        { key: 'boardCount', op: 'gte', value: 1 },
      ],
      sortKey: 'boardCount',
      sortDir: 'desc',
      limit: 50,
      view: 'list',
      columns: ['pct', 'boardCount', 'sealMoney', 'limitTime'],
      groupBy: 'limit_times',
    },
  },
  {
    id: 'volume-breakout',
    name: '放量突破',
    accent: 'teal',
    description: '量能明显放大，同时创出近 10 日新高。',
    draft: {
      accent: 'teal',
      conditions: [
        { key: 'pct', op: 'between', value: { min: 2.5, max: 8.5 } },
        { key: 'volRatio5', op: 'gte', value: 1.5 },
        { key: 'high10', op: 'eq', value: 'yes' },
      ],
      sortKey: 'amount',
      sortDir: 'desc',
      limit: 40,
      view: 'card',
      columns: ['pct', 'amount', 'volRatio5', 'pct5'],
      groupBy: 'industry',
    },
  },
  {
    id: 'hot-rise',
    name: '热榜飙升',
    accent: 'amber',
    description: '热度排名明显上升的股票，适合观察情绪发酵。',
    draft: {
      accent: 'amber',
      conditions: [
        { key: 'onHot', op: 'eq', value: 'yes' },
        { key: 'hotChange', op: 'gte', value: 5 },
      ],
      sortKey: 'hotChange',
      sortDir: 'desc',
      limit: 30,
      view: 'podium',
      columns: ['pct', 'hotRank', 'hotChange', 'hotHeat'],
      groupBy: 'industry',
    },
  },
  {
    id: 'new-stock',
    name: '次新活跃',
    accent: 'indigo',
    description: '上市不久、成交活跃且今日走强的次新股。',
    draft: {
      accent: 'indigo',
      conditions: [
        { key: 'listedDays', op: 'lte', value: 60 },
        { key: 'pct', op: 'gte', value: 3 },
        { key: 'amount', op: 'gte', value: 0.5 },
      ],
      sortKey: 'amount',
      sortDir: 'desc',
      limit: 40,
      view: 'card',
      columns: ['pct', 'amount', 'volume', 'hotRank'],
      groupBy: 'industry',
    },
  },
  {
    id: 'reversal',
    name: '低位反转',
    accent: 'violet',
    description: '近 5 日仍在低位，今天重新站上 5 日线的股票。',
    draft: {
      accent: 'violet',
      conditions: [
        { key: 'pct5', op: 'between', value: { min: -8, max: 2 } },
        { key: 'pct', op: 'gte', value: 3 },
        { key: 'aboveMa5', op: 'eq', value: 'yes' },
      ],
      sortKey: 'pct',
      sortDir: 'desc',
      limit: 30,
      view: 'list',
      columns: ['pct', 'pct5', 'ma5dev', 'amount'],
      groupBy: 'industry',
    },
  },
  {
    id: 'sixty-strong',
    name: '60日强势',
    accent: 'teal',
    description: '近 60 日涨幅靠前、期间有过涨停、仍站在 60 日线上的股票。',
    draft: {
      accent: 'teal',
      conditions: [
        { key: 'pct60', op: 'gte', value: 15 },
        { key: 'limitUpCnt60', op: 'gte', value: 2 },
        { key: 'aboveMa60', op: 'eq', value: 'yes' },
      ],
      sortKey: 'pct60',
      sortDir: 'desc',
      limit: 30,
      view: 'card',
      columns: ['pct60', 'limitUpCnt60', 'maxStep60', 'ma60dev'],
      groupBy: 'industry',
    },
  },
  {
    id: 'break-watch',
    name: '炸板观察',
    accent: 'rose',
    description: '今天摸过涨停又打开，开板次数较多的股票。',
    draft: {
      accent: 'rose',
      conditions: [
        { key: 'broken', op: 'eq', value: 'yes' },
        { key: 'openTimes', op: 'gte', value: 2 },
      ],
      sortKey: 'pct',
      sortDir: 'desc',
      limit: 30,
      view: 'list',
      columns: ['pct', 'openTimes', 'amount', 'hotRank'],
      groupBy: 'limit_times',
    },
  },
]

export const DEFAULT_COLUMNS: ColumnKey[] = ['pct', 'amount', 'pct5', 'hotRank']

export function conditionMeta(key: string): ConditionMeta | undefined {
  return CONDITIONS.find((item) => item.key === key)
}

export function metricMeta(key: string): MetricMeta | undefined {
  return METRICS.find((item) => item.key === key)
}

export function accentMeta(key: AccentKey): AccentMeta {
  return ACCENTS.find((item) => item.key === key) ?? ACCENTS[0]!
}

export function sortOptions(): MetricMeta[] {
  return METRICS.filter((item) => item.sortable)
}

export function columnOptions(): MetricMeta[] {
  return METRICS
}

export function boardTagLabel(tag: BoardTag): string {
  if (tag === 'industry') return '行业'
  if (tag === 'cn_concept') return '概念'
  return '地域'
}

export function draftFromTemplate(template: TemplateMeta): RankingDraft {
  return { name: template.name, note: '', logic: 'and', ...template.draft }
}

export function baseDraft(): RankingDraft {
  return {
    name: '',
    note: '',
    accent: 'indigo',
    logic: 'and',
    conditions: [],
    sortKey: 'pct',
    sortDir: 'desc',
    limit: 50,
    view: 'list',
    columns: [...DEFAULT_COLUMNS],
    groupBy: 'industry',
  }
}

export function seedDrafts(): RankingDraft[] {
  return [
    {
      name: '今日涨停梯队',
      note: '按连板高度排，先看今天走到第几板。',
      accent: 'rose',
      logic: 'and',
      conditions: [
        { key: 'limitUp', op: 'eq', value: 'yes' },
        { key: 'boardCount', op: 'gte', value: 1 },
      ],
      sortKey: 'boardCount',
      sortDir: 'desc',
      limit: 50,
      view: 'list',
      columns: ['pct', 'boardCount', 'sealMoney', 'limitTime'],
      groupBy: 'limit_times',
    },
    {
      name: '热榜飙升',
      note: '热度排名明显上升，适合观察情绪发酵。',
      accent: 'amber',
      logic: 'and',
      conditions: [
        { key: 'onHot', op: 'eq', value: 'yes' },
        { key: 'hotChange', op: 'gte', value: 5 },
      ],
      sortKey: 'hotChange',
      sortDir: 'desc',
      limit: 30,
      view: 'podium',
      columns: ['pct', 'hotRank', 'hotChange', 'hotHeat'],
      groupBy: 'industry',
    },
    {
      name: '成交额领涨',
      note: '用成交额确认强度，避免只看涨幅。',
      accent: 'teal',
      logic: 'and',
      conditions: [
        { key: 'pct', op: 'gte', value: 3 },
        { key: 'amount', op: 'gte', value: 1 },
      ],
      sortKey: 'amount',
      sortDir: 'desc',
      limit: 40,
      view: 'card',
      columns: ['pct', 'amount', 'volume', 'hotRank'],
      groupBy: 'industry',
    },
  ]
}

export function isEmptyConditionValue(value: ConditionValue): boolean {
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'string') return value.trim().length === 0
  if (typeof value === 'number') return !Number.isFinite(value)
  return !Number.isFinite(value.min) || !Number.isFinite(value.max)
}

