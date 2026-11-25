import { describe, expect, it } from 'vitest'
import { baseDraft } from '../src/shared/catalog.ts'
import type { ConditionClause, RankingConfig } from '../src/shared/types.ts'
import type { BoardMembership, BuiltMarket, MarketRow } from '../src/host/data.ts'
import { evaluate } from '../src/host/engine.ts'

function row(overrides: Partial<MarketRow> = {}): MarketRow {
  return {
    thscode: '000001.SZ',
    ticker: '000001',
    name: '平安银行',
    board: 'main',
    isST: false,
    listedDays: 1000,
    price: 10,
    pct: 1,
    amount: 1,
    volume: 10,
    high: 10.5,
    low: 9.5,
    amplitude: 10,
    gap: 0,
    pct5: 1,
    pct10: 1,
    volRatio5: 1,
    ma5dev: 1,
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
    pe: 12,
    pb: 2,
    turnoverRate: 4,
    totalMv: 1000,
    circMv: 800,
    aboveMa5: true,
    aboveMa10: true,
    maCross: false,
    high5: false,
    high10: false,
    low5: false,
    limitUp: false,
    limitDown: false,
    broken: false,
    boardCount: 0,
    sealMoney: 0,
    openTimes: 0,
    limitTime: null,
    limitReason: null,
    hotRank: null,
    hotChange: null,
    hotHeat: null,
    skyRank: null,
    spark: [],
    ...overrides,
  }
}

function config(conditions: ConditionClause[], overrides: Partial<RankingConfig> = {}): RankingConfig {
  return {
    ...baseDraft(),
    id: 'r-test',
    name: '测试榜单',
    createdAt: '2026-11-25T00:00:00.000Z',
    updatedAt: '2026-11-25T00:00:00.000Z',
    conditions,
    ...overrides,
  }
}

function built(rows: MarketRow[], boardMembers: BoardMembership[] = []): BuiltMarket {
  return { rows, asOf: 1, dataDate: '2026-11-24', previewAt: null, warnings: [], boardMembers, historyReady: false }
}

describe('evaluate', () => {
  it('按数值区间筛选，并按排序和条数取结果', () => {
    const rows = [
      row({ thscode: '000001.SZ', name: '一号', pct: 1.5 }),
      row({ thscode: '000002.SZ', name: '二号', pct: 2.5 }),
      row({ thscode: '000003.SZ', name: '三号', pct: 3.5 }),
      row({ thscode: '000004.SZ', name: '四号', pct: 4.5 }),
    ]
    const result = evaluate(
      config([{ key: 'pct', op: 'between', value: { min: 2, max: 4 } }], { limit: 2 }),
      built(rows),
    )
    expect(result.matched).toBe(2)
    expect(result.rows.map((item) => item.pct)).toEqual([3.5, 2.5])
    expect(result.rows.map((item) => item.rank)).toEqual([1, 2])
  })

  it('缺少指标时按数据不足排除，不参与排名', () => {
    const result = evaluate(
      config([{ key: 'pct', op: 'gte', value: 3 }]),
      built([row({ thscode: '000001.SZ', pct: null }), row({ thscode: '000002.SZ', pct: 5 })]),
    )
    expect(result.matched).toBe(1)
    expect(result.insufficient).toBe(1)
    expect(result.rows).toHaveLength(1)
    expect(result.warnings.some((text) => text.includes('缺少所需数据'))).toBe(true)
  })

  it('排除条件遇到缺失数据时不会误收', () => {
    const rows = [
      row({ thscode: '000001.SZ', volRatio5: null }),
      row({ thscode: '000002.SZ', volRatio5: 0.5 }),
      row({ thscode: '000003.SZ', volRatio5: 2 }),
    ]
    const result = evaluate(config([{ key: 'volRatio5', op: 'gte', value: 1.5, negate: true }]), built(rows))
    expect(result.rows.map((item) => item.thscode)).toEqual(['000002.SZ'])
    expect(result.insufficient).toBe(1)
  })

  it('支持是否、文本、时间和板块条件', () => {
    const members: BoardMembership[] = [
      { tag: 'industry', code: '881101', name: '半导体', members: new Set(['000002.SZ']) },
    ]
    const rows = [
      row({ thscode: '000001.SZ', name: '平安银行', isST: true, limitTime: '09:32', limitReason: '银行' }),
      row({ thscode: '000002.SZ', name: '平安好医生', isST: false, limitTime: '09:20', limitReason: '算力租赁' }),
      row({ thscode: '000003.SZ', name: '别的公司', isST: false, limitTime: null, limitReason: null }),
    ]
    const result = evaluate(
      config([
        { key: 'isST', op: 'eq', value: 'no' },
        { key: 'keyword', op: 'contains', value: '平安' },
        { key: 'limitTime', op: 'lte', value: '09:30' },
        { key: 'industry', op: 'in', value: ['881101'] },
      ]),
      built(rows, members),
    )
    expect(result.rows.map((item) => item.name)).toEqual(['平安好医生'])
  })

  it('支持市场枚举过滤和空值沉底排序', () => {
    const rows = [
      row({ thscode: '000001.SZ', board: 'main', hotRank: null }),
      row({ thscode: '300001.SZ', ticker: '300001', board: 'chinext', hotRank: 8 }),
      row({ thscode: '300002.SZ', ticker: '300002', board: 'chinext', hotRank: 3 }),
    ]
    const result = evaluate(
      config([{ key: 'board', op: 'in', value: ['chinext'] }], { sortKey: 'hotRank', sortDir: 'asc' }),
      built(rows),
    )
    expect(result.rows.map((item) => item.ticker)).toEqual(['300002', '300001'])
  })

  it('支持估值与换手条件，并按任一满足出结果', () => {
    const rows = [
      row({ thscode: '000001.SZ', pe: 12, turnoverRate: 2 }),
      row({ thscode: '000002.SZ', pe: 35, turnoverRate: 6 }),
      row({ thscode: '000003.SZ', pe: 60, turnoverRate: 1 }),
    ]
    const result = evaluate(
      config([
        { key: 'pe', op: 'lte', value: 20 },
        { key: 'turnoverRate', op: 'gte', value: 5 },
      ], { logic: 'or' }),
      built(rows),
    )
    expect(result.rows.map((item) => item.thscode)).toEqual(['000001.SZ', '000002.SZ'])
  })

  it('顶层全部满足要等每条都已知且为真', () => {
    const rows = [
      row({ thscode: '000001.SZ', pe: 12, turnoverRate: 4 }),
      row({ thscode: '000002.SZ', pe: 12, turnoverRate: null }),
      row({ thscode: '000003.SZ', pe: null, turnoverRate: 6 }),
    ]
    const result = evaluate(
      config([
        { key: 'pe', op: 'lte', value: 20 },
        { key: 'turnoverRate', op: 'gte', value: 3 },
      ]),
      built(rows),
    )
    expect(result.rows).toHaveLength(1)
    expect(result.insufficient).toBe(2)
  })

  it('板块成员没有取到时算数据不足，不把全市场判成不符合', () => {
    const result = evaluate(
      config([{ key: 'industry', op: 'in', value: ['881101'] }]),
      built([row({ thscode: '000001.SZ' })], []),
    )
    expect(result.matched).toBe(0)
    expect(result.insufficient).toBe(1)
    expect(result.conditionHits[0]?.available).toBe(false)
  })

  it('非涨停股票的连板数按 0 计，不产生缺失数据', () => {
    const result = evaluate(
      config([{ key: 'boardCount', op: 'gte', value: 1 }]),
      built([row({ limitUp: false, boardCount: 0 })], []),
    )
    expect(result.matched).toBe(0)
    expect(result.insufficient).toBe(0)
    expect(result.conditionHits[0]?.available).toBe(true)
  })

  it('条件不存在时返回空结果而不是报错', () => {
    const result = evaluate(config([{ key: 'not-exists', op: 'gte', value: 1 }] as never), built([row()]))
    expect(result.matched).toBe(0)
    expect(result.insufficient).toBe(1)
  })
})
