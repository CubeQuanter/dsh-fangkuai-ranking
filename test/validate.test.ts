import { describe, expect, it } from 'vitest'
import { baseDraft, CONDITIONS, seedDrafts, TEMPLATES, VIEWS } from '../src/shared/catalog.ts'
import { normalizeDraft, normalizeStoredConfig } from '../src/host/validate.ts'

const ONE_CONDITION = [{ key: 'pct', op: 'gte', value: 1 }]

function draft(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return { ...baseDraft(), name: '测试榜单', conditions: ONE_CONDITION, ...overrides }
}

describe('normalizeDraft', () => {
  it('能力和模板数量与产品口径一致', () => {
    expect(CONDITIONS).toHaveLength(53)
    expect(TEMPLATES).toHaveLength(7)
    expect(VIEWS).toHaveLength(5)
    expect(seedDrafts()).toHaveLength(3)
  })

  it('补全默认值并保留合法的板块备注', () => {
    const result = normalizeDraft(
      draft({
        conditions: [{ key: 'industry', op: 'in', value: ['881101'], note: '半导体' }],
        accent: 'unknown',
        view: 'unknown',
        groupBy: 'unknown',
      }),
    )
    expect(result.accent).toBe('indigo')
    expect(result.view).toBe('list')
    expect(result.groupBy).toBe('industry')
    expect(result.conditions[0]?.note).toBe('半导体')
  })

  it('拒绝重复条件', () => {
    expect(() =>
      normalizeDraft(
        draft({
          conditions: [
            { key: 'pct', op: 'gte', value: 1 },
            { key: 'pct', op: 'lte', value: 5 },
          ],
        }),
      ),
    ).toThrow(/只能出现一次/)
  })

  it('拒绝不存在的条件、错误区间和空值', () => {
    expect(() => normalizeDraft(draft({ conditions: [{ key: 'nope', op: 'gte', value: 1 }] }))).toThrow(/不支持的条件/)
    expect(() =>
      normalizeDraft(draft({ conditions: [{ key: 'pct', op: 'between', value: { min: 5, max: 1 } }] }))
    ).toThrow(/起始值不能大于结束值/)
    expect(() => normalizeDraft(draft({ conditions: [{ key: 'board', op: 'in', value: [] }] }))).toThrow(/至少选择一个市场/)
    expect(() => normalizeDraft(draft({ conditions: [] }))).toThrow(/至少添加一个筛选条件/)
  })

  it('展示列去重且不再限制列数', () => {
    expect(() => normalizeDraft(draft({ columns: [] }))).toThrow(/至少选择一列/)
    const seven = ['pct', 'price', 'amount', 'volume', 'pct5', 'pct10', 'hotRank']
    expect(normalizeDraft(draft({ columns: seven })).columns).toEqual(seven)
    const result = normalizeDraft(draft({ columns: ['pct', 'pct', 'amount'] }))
    expect(result.columns).toEqual(['pct', 'amount'])
  })

  it('限制榜单条数并让不可排序指标回退', () => {
    expect(() => normalizeDraft(draft({ limit: 5 }))).toThrow(/10 到 200/)
    expect(() => normalizeDraft(draft({ limit: 201 }))).toThrow(/10 到 200/)
    const result = normalizeDraft(draft({ sortKey: 'limitTime' }))
    expect(result.sortKey).toBe('pct')
  })

  it('从磁盘恢复时丢掉损坏记录', () => {
    expect(normalizeStoredConfig({ id: '', name: '坏榜单' })).toBeNull()
    expect(normalizeStoredConfig({ id: 'r1', name: '', conditions: [] })).toBeNull()
    const valid = normalizeStoredConfig({ ...seedDrafts()[0], id: 'r1' })
    expect(valid?.id).toBe('r1')
    expect(valid?.name).toBe('今日涨停梯队')
  })
})
