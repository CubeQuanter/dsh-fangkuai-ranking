import type { BoardTag, ColumnKey, GroupKind, ResultRow } from '../../shared/types.ts'
import { formatMetric } from '../../shared/format.ts'

export function formatClock(asOf: number | null): string {
  if (!asOf) return '暂无'
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date(asOf))
}

/** 数据日按上海时区输出 YYYY-MM-DD，和主项目的 trade_date 口径一致。 */
export function formatDate(asOf: number | null): string {
  if (!asOf) return '—'
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(asOf))
}

export function marketPhase(): { label: string; live: boolean } {
  const shifted = new Date(Date.now() + 8 * 60 * 60 * 1000)
  const day = shifted.getUTCDay()
  if (day === 0 || day === 6) return { label: '已收盘', live: false }
  const minutes = shifted.getUTCHours() * 60 + shifted.getUTCMinutes()
  if (minutes < 9 * 60 + 30) return { label: '未开盘', live: false }
  if (minutes <= 11 * 60 + 30) return { label: '盘中', live: true }
  if (minutes < 13 * 60) return { label: '午间休市', live: false }
  if (minutes <= 15 * 60) return { label: '盘中', live: true }
  return { label: '已收盘', live: false }
}

/** 快照是否属于今天（上海时区）；避免拿昨天的快照冒充盘中预览。 */
export function isTodayShanghai(timestamp: number | null): boolean {
  if (!timestamp || !Number.isFinite(timestamp)) return false
  const shifted = new Date(timestamp + 8 * 60 * 60 * 1000)
  const now = new Date(Date.now() + 8 * 60 * 60 * 1000)
  return shifted.toISOString().slice(0, 10) === now.toISOString().slice(0, 10)
}

export function boardLabel(key: string): string {
  if (key === 'main') return '沪深主板'
  if (key === 'chinext') return '创业板'
  if (key === 'kechuang') return '科创板'
  if (key === 'beijing') return '北交所'
  return key
}

export function boardTagName(tag: BoardTag): string {
  if (tag === 'industry') return '行业'
  if (tag === 'cn_concept') return '概念'
  return '地域'
}

export function limitStateLabel(row: ResultRow): string {
  if (row.limitUp) return row.boardCount && row.boardCount > 0 ? `${row.boardCount}连板` : '涨停'
  if (row.broken) return '炸板'
  if (row.limitDown) return '跌停'
  return '其他'
}

export function groupKey(row: ResultRow, group: GroupKind): string {
  if (group === 'industry') return row.industry?.trim() || '未分类'
  if (group === 'limit_times') {
    const count = row.boardCount ?? 0
    if (count <= 0) return '未涨停'
    return count === 1 ? '首板' : `${count}连板`
  }
  if (group === 'pct_band') {
    const pct = row.pct
    if (pct === null || !Number.isFinite(pct)) return '无行情'
    if (pct < -7) return '跌幅 > 7%'
    if (pct < -3) return '跌幅 3%~7%'
    if (pct < 0) return '跌幅 0%~3%'
    if (pct === 0) return '平盘'
    if (pct <= 3) return '涨幅 0%~3%'
    if (pct <= 7) return '涨幅 3%~7%'
    return '涨幅 > 7%'
  }
  return row.concepts[0] ?? '未分类'
}

export function groupOrder(key: string, group: GroupKind): number {
  if (group === 'industry' || group === 'concept') return 0
  if (group === 'limit_times') {
    if (key === '未涨停') return 99
    if (key === '首板') return 0
    const match = /(\d+)/.exec(key)
    return match ? Number(match[1]) : 50
  }
  const order = ['跌幅 > 7%', '跌幅 3%~7%', '跌幅 0%~3%', '平盘', '涨幅 0%~3%', '涨幅 3%~7%', '涨幅 > 7%', '无行情']
  const index = order.indexOf(key)
  return index === -1 ? 99 : index
}

export function truncate(text: string, length: number): string {
  return text.length > length ? `${text.slice(0, length)}…` : text
}

export function pctClass(value: number | null): string {
  if (value === null || !Number.isFinite(value) || value === 0) return 'flat'
  return value > 0 ? 'up' : 'down'
}

export function metricOfRow(row: ResultRow, key: ColumnKey): number | null {
  if (key === 'limitTime') return null
  const value = row[key]
  return typeof value === 'number' ? value : null
}

export function metricDisplay(row: ResultRow, key: ColumnKey): string {
  if (key === 'limitTime') return row.limitTime || '—'
  return formatMetric(key, metricOfRow(row, key))
}
