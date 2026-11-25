import { accentMeta, conditionMeta, metricMeta, GROUPS, VIEWS } from './catalog.ts'
import type { AccentKey, ColumnKey, ConditionClause, GroupKind, MetricKey, ResultRow, SortDirection, ViewKind } from './types.ts'

export function formatNumber(value: number, digits = 2): string {
  return value.toLocaleString('zh-CN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

export function formatSignedPercent(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return '—'
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export function formatPercent(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return '—'
  return `${value.toFixed(2)}%`
}

/** 成交额统一按亿元存储，展示时大于一亿用亿、否则用万。 */
export function formatAmountYi(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return '—'
  if (value >= 1) return `${value.toFixed(value >= 100 ? 0 : 2)}亿`
  return `${(value * 10000).toFixed(0)}万`
}

/** 成交量统一按万手存储。 */
export function formatVolumeWan(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return '—'
  return `${value.toFixed(value >= 100 ? 0 : 2)}万手`
}

/** 封单额统一按万元存储。 */
export function formatSealWan(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return '—'
  if (value >= 10000) return `${(value / 10000).toFixed(2)}亿`
  return `${value.toFixed(0)}万`
}

/** 热度统一按万存储。 */
export function formatHeatWan(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return '—'
  return `${value.toFixed(value >= 10 ? 0 : 1)}万`
}

export function formatMetric(key: ColumnKey, value: number | null): string {
  if (key === 'limitTime') {
    const raw = value as unknown as string | null
    return raw || '—'
  }
  if (value === null || !Number.isFinite(value)) return '—'
  switch (key) {
    case 'pct':
    case 'pct5':
    case 'pct10':
    case 'pct60':
    case 'gap':
    case 'ma5dev':
    case 'ma60dev':
    case 'amplitude':
      return formatSignedPercent(value)
    case 'price':
      return formatNumber(value, 2)
    case 'amount':
      return formatAmountYi(value)
    case 'volume':
      return formatVolumeWan(value)
    case 'volRatio5':
      return value.toFixed(2)
    case 'boardCount':
      return `${value.toFixed(0)}板`
    case 'sealMoney':
      return formatSealWan(value)
    case 'openTimes':
      return `${value.toFixed(0)}次`
    case 'hotRank':
    case 'skyRank':
      return `第${value.toFixed(0)}名`
    case 'hotChange':
      return `${value > 0 ? '+' : ''}${value.toFixed(0)}`
    case 'hotHeat':
      return formatHeatWan(value)
    case 'pe':
    case 'pb':
      return value.toFixed(2)
    case 'turnoverRate':
      return `${value.toFixed(2)}%`
    case 'totalMv':
    case 'circMv':
      return `${value.toFixed(value >= 100 ? 0 : 2)}亿`
    case 'limitUpCnt60':
    case 'limitDownCnt60':
    case 'brokenCnt60':
      return `${value.toFixed(0)}次`
    case 'maxStep60':
      return `${value.toFixed(0)}板`
    case 'rsi24':
    case 'kdjJ':
    case 'bollPct':
    case 'cci':
      return value.toFixed(1)
    default:
      return String(value)
  }
}

export function metricUnit(key: ColumnKey): string {
  return metricMeta(key)?.unit ?? ''
}

export function viewLabel(view: ViewKind): string {
  return VIEWS.find((item) => item.key === view)?.label ?? '列表'
}

export function groupLabel(group: GroupKind): string {
  return GROUPS.find((item) => item.key === group)?.label ?? '所属行业'
}

export function accentColor(accent: AccentKey): string {
  return accentMeta(accent).color
}

export function formatSort(sortKey: MetricKey, direction: SortDirection): string {
  const meta = metricMeta(sortKey)
  return `${meta?.label ?? sortKey}${direction === 'desc' ? '从高到低' : '从低到高'}`
}

function enumLabel(key: string, value: string): string {
  const meta = conditionMeta(key)
  return meta?.options?.find((item) => item.value === value)?.label ?? value
}

function valueWithUnit(metaUnit: string | undefined, value: string, key: string): string {
  if (!metaUnit) return value
  if (key === 'hotRank' || key === 'skyRank') return value
  return `${value}${metaUnit}`
}

/** 榜单条件的中文摘要，界面和模型工具共用。 */
export function formatCondition(clause: ConditionClause): string {
  const meta = conditionMeta(clause.key)
  if (!meta) return clause.key
  const prefix = clause.negate ? '排除 ' : ''
  const value = clause.value
  if (meta.kind === 'number') {
    if (clause.op === 'between' && typeof value === 'object' && !Array.isArray(value)) {
      const unit = meta.unit ?? ''
      return `${prefix}${meta.label} ${value.min}${unit} 至 ${value.max}${unit}`
    }
    const number = typeof value === 'number' ? value : Number(value)
    if (!Number.isFinite(number)) return `${prefix}${meta.label}`
    const cmp = clause.op === 'lte' ? '≤' : '≥'
    return `${prefix}${meta.label} ${cmp} ${valueWithUnit(meta.unit, String(number), clause.key)}`
  }
  if (meta.kind === 'enum') {
    const values = Array.isArray(value) ? value : [String(value)]
    return `${prefix}${meta.label}：${values.map((item) => enumLabel(clause.key, item)).join('、')}`
  }
  if (meta.kind === 'bool') {
    return `${prefix}${meta.label}：${value === 'yes' ? '是' : '否'}`
  }
  if (meta.kind === 'text') {
    return `${prefix}${meta.label}“${String(value)}”`
  }
  if (meta.kind === 'time') {
    return `${prefix}${meta.label} ${String(value)}`
  }
  if (meta.kind === 'board') {
    const labels = clause.note?.trim()
    return `${prefix}${meta.label}：${labels || '已选板块'}`
  }
  return `${prefix}${meta.label}`
}

export function conditionTexts(conditions: ConditionClause[]): string[] {
  return conditions.map(formatCondition)
}

export function rowTags(row: ResultRow): string[] {
  const tags: string[] = []
  if (row.boardCount !== null && row.boardCount > 0) {
    tags.push(row.boardCount > 1 ? `${row.boardCount}连板` : '首板')
  } else if (row.limitUp) {
    tags.push('涨停')
  } else if (row.broken) {
    tags.push('炸板')
  } else if (row.limitDown) {
    tags.push('跌停')
  }
  if (row.hotRank !== null) tags.push(`热榜第${row.hotRank}`)
  if (row.skyRank !== null) tags.push(`飙升第${row.skyRank}`)
  if (row.pct5 !== null && row.pct5 >= 5) tags.push('5日走强')
  if (row.volRatio5 !== null && row.volRatio5 >= 1.5) tags.push('放量')
  if (row.isST) tags.push('风险警示')
  return tags.slice(0, 3)
}
