import { conditionMeta } from '../shared/catalog.ts'
import { formatCondition, formatSort, rowTags } from '../shared/format.ts'
import type { ConditionClause, ConditionOp, EvaluateResult, RankingConfig, ResultRow } from '../shared/types.ts'
import type { BuiltMarket, MarketRow } from './data.ts'

function metricValue(row: MarketRow, key: string): number | null {
  switch (key) {
    case 'listedDays':
      return row.listedDays
    case 'price':
      return row.price
    case 'pct':
      return row.pct
    case 'amount':
      return row.amount
    case 'volume':
      return row.volume
    case 'amplitude':
      return row.amplitude
    case 'gap':
      return row.gap
    case 'pct5':
      return row.pct5
    case 'pct10':
      return row.pct10
    case 'volRatio5':
      return row.volRatio5
    case 'ma5dev':
      return row.ma5dev
    case 'pct60':
      return row.pct60
    case 'ma60dev':
      return row.ma60dev
    case 'limitUpCnt60':
      return row.limitUpCnt60
    case 'limitDownCnt60':
      return row.limitDownCnt60
    case 'brokenCnt60':
      return row.brokenCnt60
    case 'maxStep60':
      return row.maxStep60
    case 'rsi24':
      return row.rsi24
    case 'kdjJ':
      return row.kdjJ
    case 'bollPct':
      return row.bollPct
    case 'cci':
      return row.cci
    case 'pe':
      return row.pe
    case 'pb':
      return row.pb
    case 'turnoverRate':
      return row.turnoverRate
    case 'totalMv':
      return row.totalMv
    case 'circMv':
      return row.circMv
    case 'boardCount':
      return row.boardCount
    case 'sealMoney':
      return row.sealMoney
    case 'openTimes':
      return row.openTimes
    case 'hotRank':
      return row.hotRank
    case 'hotChange':
      return row.hotChange
    case 'hotHeat':
      return row.hotHeat
    case 'skyRank':
      return row.skyRank
    default:
      return null
  }
}

function boolValue(row: MarketRow, key: string): boolean | null {
  switch (key) {
    case 'isST':
      return row.isST
    case 'aboveMa5':
      return row.aboveMa5
    case 'aboveMa10':
      return row.aboveMa10
    case 'aboveMa60':
      return row.aboveMa60
    case 'maCross':
      return row.maCross
    case 'high5':
      return row.high5
    case 'high10':
      return row.high10
    case 'low5':
      return row.low5
    case 'limitUp':
      return row.limitUp
    case 'limitDown':
      return row.limitDown
    case 'broken':
      return row.broken
    case 'onHot':
      return row.hotRank !== null
    case 'onSkyrocket':
      return row.skyRank !== null
    default:
      return null
  }
}

function compareNumber(value: number, op: ConditionOp, raw: ConditionClause['value']): boolean {
  if (op === 'between' && typeof raw === 'object' && !Array.isArray(raw)) {
    return value >= raw.min && value <= raw.max
  }
  const target = typeof raw === 'number' ? raw : Number(raw)
  if (!Number.isFinite(target)) return false
  if (op === 'lte') return value <= target
  if (op === 'gte') return value >= target
  return false
}

function minutesOf(text: string): number {
  const [hour, minute] = text.split(':')
  return Number(hour) * 60 + Number(minute)
}

function testClause(row: MarketRow, clause: ConditionClause, memberships: Map<string, Set<string>>): boolean | null {
  const meta = conditionMeta(clause.key)
  if (!meta) return null
  switch (meta.kind) {
    case 'number': {
      const value = metricValue(row, clause.key)
      return value === null ? null : compareNumber(value, clause.op, clause.value)
    }
    case 'bool': {
      const value = boolValue(row, clause.key)
      if (value === null) return null
      return value === (clause.value === 'yes')
    }
    case 'enum': {
      if (clause.key === 'board') {
        const values = Array.isArray(clause.value) ? clause.value : []
        return values.includes(row.board)
      }
      return null
    }
    case 'text': {
      const target = String(clause.value).toLowerCase()
      if (clause.key === 'keyword') return row.name.toLowerCase().includes(target) || row.ticker.includes(target)
      if (clause.key === 'limitReason') {
        if (!row.limitReason) return null
        return row.limitReason.toLowerCase().includes(target)
      }
      return null
    }
    case 'time': {
      if (!row.limitTime) return null
      return minutesOf(row.limitTime) <= minutesOf(String(clause.value))
    }
    case 'board': {
      if (!meta.boardTag) return null
      const values = Array.isArray(clause.value) ? clause.value : []
      if (values.length === 0) return null
      let known = false
      for (const code of values) {
        const members = memberships.get(`${meta.boardTag}:${code}`)
        if (!members) continue
        known = true
        if (members.has(row.thscode)) return true
      }
      // 板块成员没有取到时应计为未知，而不是把全市场判成不符合。
      return known ? false : null
    }
    default:
      return null
  }
}

function sortValue(row: MarketRow, config: RankingConfig): number | null {
  return metricValue(row, config.sortKey)
}

function toResult(row: MarketRow, rank: number): ResultRow {
  const result: ResultRow = {
    rank,
    thscode: row.thscode,
    ticker: row.ticker,
    name: row.name,
    board: row.board,
    industry: null,
    concepts: [],
    isST: row.isST,
    price: row.price,
    pct: row.pct,
    amount: row.amount,
    volume: row.volume,
    amplitude: row.amplitude,
    gap: row.gap,
    pct5: row.pct5,
    pct10: row.pct10,
    volRatio5: row.volRatio5,
    ma5dev: row.ma5dev,
    pct60: row.pct60,
    ma60dev: row.ma60dev,
    aboveMa60: row.aboveMa60,
    limitUpCnt60: row.limitUpCnt60,
    limitDownCnt60: row.limitDownCnt60,
    brokenCnt60: row.brokenCnt60,
    maxStep60: row.maxStep60,
    rsi24: row.rsi24,
    kdjJ: row.kdjJ,
    bollPct: row.bollPct,
    cci: row.cci,
    limitUp: row.limitUp,
    limitDown: row.limitDown,
    broken: row.broken,
    boardCount: row.boardCount,
    sealMoney: row.sealMoney,
    openTimes: row.openTimes,
    limitTime: row.limitTime,
    hotRank: row.hotRank,
    hotChange: row.hotChange,
    hotHeat: row.hotHeat,
    skyRank: row.skyRank,
    pe: row.pe,
    pb: row.pb,
    turnoverRate: row.turnoverRate,
    totalMv: row.totalMv,
    circMv: row.circMv,
    tags: [],
    spark: row.spark,
  }
  result.tags = rowTags(result)
  return result
}

export interface EvaluateOptions {
  maxRows?: number
}

export function evaluate(config: RankingConfig, built: BuiltMarket, options: EvaluateOptions = {}): EvaluateResult {
  const started = Date.now()
  const membershipMap = new Map<string, Set<string>>()
  for (const board of built.boardMembers) membershipMap.set(`${board.tag}:${board.code}`, board.members)

  const logic = config.logic === 'or' ? 'or' : 'and'
  const hits = config.conditions.map((clause) => ({
    key: clause.key,
    label: conditionMeta(clause.key)?.label ?? clause.key,
    hits: 0,
    known: 0,
  }))

  const matched: MarketRow[] = []
  let insufficient = 0
  for (const row of built.rows) {
    let anyPass = false
    let anyUnknown = false
    let knownFalse = false
    for (let index = 0; index < config.conditions.length; index += 1) {
      const clause = config.conditions[index]!
      const raw = testClause(row, clause, membershipMap)
      if (raw === null) {
        anyUnknown = true
        continue
      }
      hits[index]!.known += 1
      const pass = clause.negate ? raw === false : raw
      if (pass) {
        anyPass = true
        hits[index]!.hits += 1
      } else {
        knownFalse = true
      }
    }
    const pass = logic === 'or' ? anyPass : (!knownFalse && !anyUnknown)
    if (pass) matched.push(row)
    else if (anyUnknown) insufficient += 1
  }

  matched.sort((left, right) => {
    const a = sortValue(left, config)
    const b = sortValue(right, config)
    if (a === null && b === null) return left.thscode.localeCompare(right.thscode)
    if (a === null) return 1
    if (b === null) return -1
    const diff = a - b
    const oriented = config.sortDir === 'asc' ? diff : -diff
    return oriented === 0 ? left.thscode.localeCompare(right.thscode) : oriented
  })

  const limit = Math.min(config.limit, options.maxRows ?? config.limit)
  const conceptClauses = config.conditions.filter(
    (clause) => conditionMeta(clause.key)?.boardTag === 'cn_concept' && Array.isArray(clause.value),
  )
  const selected = matched.slice(0, limit).map((row, index) => {
    const result = toResult(row, index + 1)
    const labels: string[] = []
    for (const clause of conceptClauses) {
      const codes = Array.isArray(clause.value) ? clause.value : []
      const hit = codes.some((code) => membershipMap.get(`cn_concept:${code}`)?.has(row.thscode))
      if (hit) {
        const label = clause.note?.trim()
        if (label && !labels.includes(label)) labels.push(label)
      }
    }
    result.concepts = labels
    return result
  })
  const warnings = [...built.warnings]
  if (insufficient > 0) warnings.push(`有 ${insufficient} 只股票缺少所需数据，未参与排名`)

  return {
    ranking: config,
    dataDate: built.dataDate,
    previewAt: built.previewAt,
    asOf: built.asOf,
    generatedAt: new Date().toISOString(),
    universe: built.rows.length,
    matched: matched.length,
    insufficient,
    rows: selected,
    conditionTexts: config.conditions.map(formatCondition),
    conditionHits: hits.map((item) => ({
      key: item.key,
      label: item.label,
      hits: item.hits,
      available: item.known > 0,
    })),
    sortText: formatSort(config.sortKey, config.sortDir),
    warnings,
    elapsedMs: Date.now() - started,
  }
}
