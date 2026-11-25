import { describe, expect, it } from 'vitest'
import { computeBasicMetrics, type BasicBar } from '../src/host/basic.ts'

function bar(date: string, close: number, high = close, low = close, pct = 0): BasicBar {
  return { date, close, high, low, pct }
}

function series(count: number, close: number, pct = 0): BasicBar[] {
  return Array.from({ length: count }, (_, index) => {
    const day = String(index + 1).padStart(2, '0')
    return bar(`2026-01-${day}`, close, close, close, pct)
  })
}

describe('基础历史指标', () => {
  it('主板 10% 连板能算出次数和最高连板', () => {
    const bars = series(65, 10)
    bars[62] = bar('2026-03-01', 11, 11, 10, 10)
    bars[63] = bar('2026-03-02', 12.1, 12.1, 11, 10)
    bars[64] = bar('2026-03-03', 13.31, 13.31, 12.1, 10)
    const metrics = computeBasicMetrics(bars, 'main', false)
    expect(metrics?.limitUpCnt60).toBe(3)
    expect(metrics?.maxStep60).toBe(3)
    expect(metrics?.limitDownCnt60).toBe(0)
  })

  it('创业板 20cm 的 10% 上涨不算涨停', () => {
    const bars = series(65, 10)
    bars[64] = bar('2026-03-03', 11, 11, 10, 10)
    const metrics = computeBasicMetrics(bars, 'chinext', false)
    expect(metrics?.limitUpCnt60).toBe(0)
    expect(metrics?.maxStep60).toBe(0)
  })

  it('触及涨停但收盘没封住算炸板', () => {
    const bars = series(65, 10)
    bars[64] = bar('2026-03-03', 10.7, 11, 10, 7)
    const metrics = computeBasicMetrics(bars, 'main', false)
    expect(metrics?.brokenCnt60).toBe(1)
    expect(metrics?.limitUpCnt60).toBe(0)
  })

  it('60 日涨跌幅按 60 个交易日前收盘算', () => {
    const bars = series(61, 10)
    bars[60] = bar('2026-03-03', 20, 20, 20, 100)
    const metrics = computeBasicMetrics(bars, 'main', false)
    expect(metrics?.pct60).toBeCloseTo(100, 6)
    expect(metrics?.ma60dev).not.toBeNull()
  })

  it('RSI 在单边上涨时为 100', () => {
    const bars = Array.from({ length: 30 }, (_, index) =>
      bar(`2026-01-${String(index + 1).padStart(2, '0')}`, 10 + index, 10 + index, 10 + index, 1),
    )
    const metrics = computeBasicMetrics(bars, 'main', false)
    expect(metrics?.rsi24).toBe(100)
  })

  it('布林带和 KDJ 在横盘时给出中性值', () => {
    const bars = series(40, 10)
    const metrics = computeBasicMetrics(bars, 'main', false)
    expect(metrics?.bollPct).toBe(50)
    expect(metrics?.kdjJ).toBeCloseTo(50, 6)
    expect(metrics?.cci).toBe(0)
  })
})
