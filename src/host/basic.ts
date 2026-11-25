import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { dshHomePath } from '@deepseek-ai/dsh-home-paths'
import type { TickerItem } from './fuyao.ts'

/**
 * 基础数据：只使用公开、免费行情，回补近 6 个月日 K，
 * 在本机算出 60 日窗口和技术指标。
 */

export interface BasicBar {
  date: string
  close: number
  high: number
  low: number
  pct: number
}

export interface BasicMetrics {
  from: string
  to: string
  bars: number
  pct60: number | null
  ma60dev: number | null
  aboveMa60: boolean | null
  limitUpCnt60: number
  limitDownCnt60: number
  brokenCnt60: number
  maxStep60: number
  rsi24: number | null
  kdjJ: number | null
  bollPct: number | null
  cci: number | null
}

export type BasicPhase = 'idle' | 'running' | 'ready' | 'error'

export interface BasicHistoryStatus {
  status: BasicPhase
  done: number
  total: number
  failed: number
  coverage: number
  asOf: string | null
  updatedAt: string | null
  message?: string
}

interface BasicFile {
  version: 1
  metrics: Record<string, BasicMetrics>
}

interface BasicRow {
  thscode: string
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
}

const KLINE_URL = 'https://push2his.eastmoney.com/api/qt/stock/kline/get'
const KLINE_UT = 'fa5fd1943c7b386f172d6893dbfba10b'
const WORKERS = 8
const GAP_MS = 10
const SAVE_EVERY = 500

function shanghaiDate(offsetDays = 0): string {
  const shifted = new Date(Date.now() + 8 * 60 * 60 * 1000 + offsetDays * 24 * 60 * 60 * 1000)
  return shifted.toISOString().slice(0, 10).replaceAll('-', '')
}

function shanghaiMinutes(): number {
  const shifted = new Date(Date.now() + 8 * 60 * 60 * 1000)
  return shifted.getUTCHours() * 60 + shifted.getUTCMinutes()
}

function isWeekday(): boolean {
  const shifted = new Date(Date.now() + 8 * 60 * 60 * 1000)
  const day = shifted.getUTCDay()
  return day >= 1 && day <= 5
}

function boardOf(code: string): string {
  if (/^(688|689)/.test(code)) return 'kechuang'
  if (/^(300|301)/.test(code)) return 'chinext'
  if (/^(4|8|920)/.test(code)) return 'beijing'
  return 'main'
}

function limitPercent(board: string, isST: boolean): number {
  if (board === 'beijing') return 30
  if (board === 'chinext' || board === 'kechuang') return 20
  return isST ? 5 : 10
}

function secidOf(ticker: TickerItem): string | null {
  const code = ticker.ticker
  if (!/^\d{6}$/.test(code)) return null
  const suffix = ticker.thscode.split('.')[1]
  const exchange = suffix ?? ticker.exchange ?? ''
  return `${exchange === 'SH' ? '1' : '0'}.${code}`
}

function tencentSymbol(ticker: TickerItem): string | null {
  const code = ticker.ticker
  if (!/^\d{6}$/.test(code)) return null
  const suffix = ticker.thscode.split('.')[1] ?? ticker.exchange ?? ''
  const prefix = suffix === 'SH' ? 'sh' : suffix === 'BJ' ? 'bj' : 'sz'
  return `${prefix}${code}`
}

function trimToday(bars: BasicBar[]): BasicBar[] {
  const last = bars.at(-1)
  if (!last) return bars
  // 盘中日 K 只有半截，不能算进“完整交易日”的统计。
  if (isWeekday() && shanghaiMinutes() < 15 * 60 + 5 && last.date === `${shanghaiDate().slice(0, 4)}-${shanghaiDate().slice(4, 6)}-${shanghaiDate().slice(6, 8)}`) {
    return bars.slice(0, -1)
  }
  return bars
}

function parseBars(klines: unknown): BasicBar[] {
  if (!Array.isArray(klines)) return []
  const bars: BasicBar[] = []
  for (const raw of klines) {
    if (typeof raw !== 'string') continue
    const parts = raw.split(',')
    if (parts.length < 9) continue
    const date = parts[0] ?? ''
    const close = Number(parts[2])
    const high = Number(parts[3])
    const low = Number(parts[4])
    const pct = Number(parts[8])
    if (!date || !Number.isFinite(close) || !Number.isFinite(pct)) continue
    bars.push({ date, close, high: Number.isFinite(high) ? high : close, low: Number.isFinite(low) ? low : close, pct })
  }
  return bars
}

function mean(values: number[]): number {
  return values.reduce((total, value) => total + value, 0) / values.length
}

function latestRsi(closes: number[], period: number): number | null {
  if (closes.length < period + 1) return null
  let gain = 0
  let loss = 0
  const start = closes.length - period
  for (let index = Math.max(1, start); index < closes.length; index += 1) {
    const change = (closes[index] ?? 0) - (closes[index - 1] ?? 0)
    if (change >= 0) gain += change
    else loss -= change
  }
  if (gain === 0 && loss === 0) return 50
  if (loss === 0) return 100
  if (gain === 0) return 0
  const rs = gain / loss
  return 100 - 100 / (1 + rs)
}

function latestKdj(bars: BasicBar[]): number | null {
  if (bars.length < 9) return null
  let k = 50
  let d = 50
  for (let index = 8; index < bars.length; index += 1) {
    const window = bars.slice(index - 8, index + 1)
    const high = Math.max(...window.map((bar) => bar.high))
    const low = Math.min(...window.map((bar) => bar.low))
    const close = bars[index]?.close ?? low
    const rsv = high === low ? 50 : ((close - low) / (high - low)) * 100
    k = (2 / 3) * k + (1 / 3) * rsv
    d = (2 / 3) * d + (1 / 3) * k
  }
  return 3 * k - 2 * d
}

function latestBollPct(closes: number[]): number | null {
  if (closes.length < 20) return null
  const window = closes.slice(-20)
  const mid = mean(window)
  const variance = mean(window.map((value) => (value - mid) ** 2))
  const std = Math.sqrt(variance)
  if (std === 0) return 50
  const upper = mid + 2 * std
  const lower = mid - 2 * std
  return ((closes.at(-1) ?? mid) - lower) / (upper - lower) * 100
}

function latestCci(bars: BasicBar[]): number | null {
  if (bars.length < 14) return null
  const window = bars.slice(-14)
  const typical = window.map((bar) => (bar.high + bar.low + bar.close) / 3)
  const average = mean(typical)
  const deviation = mean(typical.map((value) => Math.abs(value - average)))
  if (deviation === 0) return 0
  return ((typical.at(-1) ?? average) - average) / (0.015 * deviation)
}

/** 纯函数：给定日 K，算 60 日窗口和技术指标，供单测与真实初始化共用。 */
export function computeBasicMetrics(input: BasicBar[], board: string, isST: boolean): BasicMetrics | null {
  const bars = trimToday(input)
  if (bars.length < 2) return null
  const limitPct = limitPercent(board, isST)
  const windowStart = Math.max(1, bars.length - 60)
  let limitUpCnt60 = 0
  let limitDownCnt60 = 0
  let brokenCnt60 = 0
  let maxStep60 = 0
  let step = 0

  for (let index = 1; index < bars.length; index += 1) {
    const bar = bars[index]
    const prev = bars[index - 1]
    if (!bar || !prev) continue
    const pct = bar.pct
    const inWindow = index >= windowStart
    const limitUp = pct >= limitPct - 0.35 && bar.close >= bar.high - 0.01
    const limitDown = pct <= -(limitPct - 0.35) && bar.close <= bar.low + 0.01
    const touchedUp = bar.high >= prev.close * (1 + limitPct / 100) - 0.01
    const touchedDown = bar.low <= prev.close * (1 - limitPct / 100) + 0.01
    if (limitUp) step += 1
    else step = 0
    if (inWindow) {
      if (limitUp) limitUpCnt60 += 1
      if (limitDown) limitDownCnt60 += 1
      if ((touchedUp && !limitUp) || (touchedDown && !limitDown)) brokenCnt60 += 1
      maxStep60 = Math.max(maxStep60, step)
    }
  }

  const closes = bars.map((bar) => bar.close)
  const last = bars.at(-1)?.close ?? null
  const base = bars.length >= 61 ? bars[bars.length - 61]?.close : bars[0]?.close
  const pct60 = last !== null && base !== undefined && base > 0 ? (last / base - 1) * 100 : null
  const ma60 = bars.length >= 60 ? mean(closes.slice(-60)) : null
  const ma60dev = last !== null && ma60 !== null && ma60 > 0 ? (last / ma60 - 1) * 100 : null
  const aboveMa60 = last !== null && ma60 !== null ? last >= ma60 : null

  return {
    from: bars[0]?.date ?? '',
    to: bars.at(-1)?.date ?? '',
    bars: bars.length,
    pct60,
    ma60dev,
    aboveMa60,
    limitUpCnt60,
    limitDownCnt60,
    brokenCnt60,
    maxStep60,
    rsi24: latestRsi(closes, 24),
    kdjJ: latestKdj(bars),
    bollPct: latestBollPct(closes),
    cci: latestCci(bars),
  }
}

async function fetchEastmoney(secid: string): Promise<BasicBar[] | null> {
  const beg = shanghaiDate(-210)
  const end = shanghaiDate()
  const params = new URLSearchParams({
    ut: KLINE_UT,
    fields1: 'f1,f2,f3,f4,f5,f6',
    fields2: 'f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61',
    klt: '101',
    fqt: '1',
    beg,
    end,
    lmt: '200',
    secid,
  })
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(`${KLINE_URL}?${params.toString()}`, {
        headers: { accept: 'application/json', 'user-agent': 'Mozilla/5.0', referer: 'https://quote.eastmoney.com/' },
        signal: AbortSignal.timeout(15_000),
      })
      if (!response.ok) continue
      const body = (await response.json()) as { data?: { klines?: unknown } }
      const parsed = parseBars(body.data?.klines)
      if (parsed.length > 0) return parsed
    } catch {
      if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 300))
    }
  }
  return null
}

function parseTencentBars(rows: unknown): BasicBar[] {
  if (!Array.isArray(rows)) return []
  const bars: BasicBar[] = []
  let prevClose: number | null = null
  for (const raw of rows) {
    if (!Array.isArray(raw) || raw.length < 5) continue
    const date = String(raw[0] ?? '')
    const close = Number(raw[2])
    const high = Number(raw[3])
    const low = Number(raw[4])
    if (!date || !Number.isFinite(close)) continue
    const pct = prevClose !== null && prevClose > 0 ? (close / prevClose - 1) * 100 : 0
    bars.push({
      date,
      close,
      high: Number.isFinite(high) ? high : close,
      low: Number.isFinite(low) ? low : close,
      pct,
    })
    prevClose = close
  }
  return bars
}

async function fetchTencent(ticker: TickerItem): Promise<BasicBar[] | null> {  const symbol = tencentSymbol(ticker)
  if (!symbol) return null
  const beg = `${shanghaiDate(-210).slice(0, 4)}-${shanghaiDate(-210).slice(4, 6)}-${shanghaiDate(-210).slice(6, 8)}`
  const end = `${shanghaiDate().slice(0, 4)}-${shanghaiDate().slice(4, 6)}-${shanghaiDate().slice(6, 8)}`
  const url = `https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=${symbol},day,${beg},${end},200,qfq`
  try {
    const response = await fetch(url, {
      headers: { accept: 'application/json', 'user-agent': 'Mozilla/5.0', referer: 'https://gu.qq.com/' },
      signal: AbortSignal.timeout(15_000),
    })
    if (!response.ok) return null
    const body = (await response.json()) as { data?: Record<string, { qfqday?: unknown; day?: unknown }> }
    return parseTencentBars(body.data?.[symbol]?.qfqday ?? body.data?.[symbol]?.day)
  } catch {
    return null
  }
}

async function fetchSina(ticker: TickerItem): Promise<BasicBar[] | null> {
  const symbol = tencentSymbol(ticker)
  if (!symbol) return null
  const url = `https://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol=${symbol}&scale=240&ma=no&datalen=200`
  try {
    const response = await fetch(url, {
      headers: { accept: 'application/json', 'user-agent': 'Mozilla/5.0', referer: 'https://finance.sina.com.cn/' },
      signal: AbortSignal.timeout(15_000),
    })
    if (!response.ok) return null
    const rows = (await response.json()) as unknown
    if (!Array.isArray(rows)) return null
    let prevClose: number | null = null
    const bars: BasicBar[] = []
    for (const raw of rows) {
      if (!raw || typeof raw !== 'object') continue
      const item = raw as { day?: unknown; close?: unknown; high?: unknown; low?: unknown }
      const date = String(item.day ?? '')
      const close = Number(item.close)
      const high = Number(item.high)
      const low = Number(item.low)
      if (!date || !Number.isFinite(close)) continue
      const pct = prevClose !== null && prevClose > 0 ? (close / prevClose - 1) * 100 : 0
      bars.push({
        date,
        close,
        high: Number.isFinite(high) ? high : close,
        low: Number.isFinite(low) ? low : close,
        pct,
      })
      prevClose = close
    }
    return bars
  } catch {
    return null
  }
}

async function fetchKline(ticker: TickerItem): Promise<BasicBar[] | null> {
  // 新浪日 K 单只查询最稳、速度也够；腾讯和东财只在它拿不到时兜底。
  const sina = await fetchSina(ticker)
  if (sina && sina.length > 0) return sina
  const tencent = await fetchTencent(ticker)
  if (tencent && tencent.length > 0) return tencent
  const secid = secidOf(ticker)
  if (secid) {
    const eastmoney = await fetchEastmoney(secid)
    if (eastmoney && eastmoney.length > 0) return eastmoney
  }
  return null
}

async function atomicWrite(file: string, text: string): Promise<void> {
  await mkdir(dirname(file), { recursive: true })
  const temp = `${file}.${Math.random().toString(36).slice(2, 8)}.tmp`
  await writeFile(temp, text, 'utf8')
  await rename(temp, file)
}

/**
 * 所有用户共享同一套逻辑：第一次安装点一次初始化，插件自己回补 6 个月；
 * 数据只落在当前用户的 DSH 目录，不读主项目数据库。
 */
export class BasicHistory {
  private readonly file: string
  private readonly statusFile: string
  private metrics: Map<string, BasicMetrics> | null = null
  private statusState: BasicHistoryStatus | null = null
  private loading: Promise<void> | null = null
  private running = false
  private refreshMode = false

  constructor(file?: string, statusFile?: string) {
    const dir = join(dshHomePath('storages', 'fangkuai-ranking'), 'basic')
    this.file = file ?? join(dir, 'metrics.json')
    this.statusFile = statusFile ?? join(dir, 'status.json')
  }

  private async ensureLoaded(): Promise<void> {
    if (this.metrics !== null && this.statusState !== null) return
    this.loading ??= (async () => {
      try {
        const raw = await readFile(this.file, 'utf8')
        const parsed = JSON.parse(raw) as BasicFile
        this.metrics = new Map(Object.entries(parsed.metrics ?? {}))
      } catch {
        this.metrics = new Map()
      }
      try {
        const raw = await readFile(this.statusFile, 'utf8')
        const parsed = JSON.parse(raw) as BasicHistoryStatus
        if (parsed.status === 'running' && !this.running) {
          this.statusState = { ...parsed, status: 'idle', message: '上次初始化中断，可以继续' }
        } else {
          this.statusState = parsed
        }
      } catch {
        this.statusState = { status: 'idle', done: 0, total: 0, failed: 0, coverage: 0, asOf: null, updatedAt: null }
      }
    })()
    await this.loading
  }

  async status(): Promise<BasicHistoryStatus> {
    await this.ensureLoaded()
    return { ...(this.statusState ?? { status: 'idle', done: 0, total: 0, failed: 0, coverage: 0, asOf: null, updatedAt: null }) }
  }

  /** 能否为某只股票补上 60 日条件；返回已覆盖行数，用于提示数据缺口。 */
  async apply(rows: BasicRow[]): Promise<number> {
    await this.ensureLoaded()
    let covered = 0
    for (const row of rows) {
      const metric = this.metrics?.get(row.thscode)
      if (!metric) {
        row.pct60 = row.pct60 ?? null
        row.ma60dev = row.ma60dev ?? null
        row.aboveMa60 = row.aboveMa60 ?? null
        row.limitUpCnt60 = row.limitUpCnt60 ?? null
        row.limitDownCnt60 = row.limitDownCnt60 ?? null
        row.brokenCnt60 = row.brokenCnt60 ?? null
        row.maxStep60 = row.maxStep60 ?? null
        row.rsi24 = row.rsi24 ?? null
        row.kdjJ = row.kdjJ ?? null
        row.bollPct = row.bollPct ?? null
        row.cci = row.cci ?? null
        continue
      }
      covered += 1
      row.pct60 = metric.pct60
      row.ma60dev = metric.ma60dev
      row.aboveMa60 = metric.aboveMa60
      row.limitUpCnt60 = metric.limitUpCnt60
      row.limitDownCnt60 = metric.limitDownCnt60
      row.brokenCnt60 = metric.brokenCnt60
      row.maxStep60 = metric.maxStep60
      row.rsi24 = metric.rsi24
      row.kdjJ = metric.kdjJ
      row.bollPct = metric.bollPct
      row.cci = metric.cci
    }
    return covered
  }

  private async saveMetrics(): Promise<void> {
    const metrics = Object.fromEntries(this.metrics ?? new Map())
    await atomicWrite(this.file, JSON.stringify({ version: 1, metrics }))
  }

  private async saveStatus(): Promise<void> {
    if (!this.statusState) return
    await atomicWrite(this.statusFile, JSON.stringify(this.statusState))
  }

  async start(tickers: TickerItem[], refresh = false): Promise<BasicHistoryStatus> {
    await this.ensureLoaded()
    if (this.running) return this.status()
    if (this.statusState?.status === 'ready' && !refresh) return this.status()

    const normalized = tickers.filter((ticker) => /^\d{6}\.(SH|SZ|BJ)$/.test(ticker.thscode))
    if (normalized.length === 0) {
      throw new Error('没有可初始化的 A 股标的')
    }
    this.refreshMode = refresh
    this.running = true
    this.statusState = {
      status: 'running',
      done: refresh ? 0 : (this.metrics?.size ?? 0),
      total: normalized.length,
      failed: 0,
      coverage: this.metrics?.size ?? 0,
      asOf: null,
      updatedAt: new Date().toISOString(),
      message: '正在回补近 6 个月公开行情',
    }
    await this.saveStatus()
    void this.run(normalized).catch(async (error) => {
      this.running = false
      this.refreshMode = false
      this.statusState = {
        ...(this.statusState ?? { done: 0, total: normalized.length, failed: 0, coverage: 0, asOf: null }),
        status: 'error',
        updatedAt: new Date().toISOString(),
        message: error instanceof Error ? error.message : '初始化没有完成',
      }
      await this.saveStatus()
    })
    return this.status()
  }

  private async run(tickers: TickerItem[]): Promise<void> {
    const total = tickers.length
    let done = this.refreshMode ? 0 : (this.metrics?.size ?? 0)
    let failed = 0
    let cursor = 0
    const started = Date.now()

    const worker = async (): Promise<void> => {
      while (cursor < tickers.length) {
        const ticker = tickers[cursor]
        cursor += 1
        if (!ticker) continue
        if (this.metrics?.has(ticker.thscode) && !this.refreshMode) {
          done += 1
          continue
        }
        const bars = await fetchKline(ticker)
        if (bars && bars.length > 0) {
          const metric = computeBasicMetrics(bars, boardOf(ticker.ticker), /ST/i.test(ticker.name))
          if (metric) this.metrics?.set(ticker.thscode, metric)
          else failed += 1
        } else {
          failed += 1
        }
        done += 1
        if (done % 25 === 0 || done === total) {
          this.statusState = {
            status: 'running',
            done,
            total,
            failed,
            coverage: this.metrics?.size ?? 0,
            asOf: null,
            updatedAt: new Date().toISOString(),
            message: `已处理 ${done} / ${total} 只`,
          }
          await this.saveStatus()
        }
        if (done % SAVE_EVERY === 0) await this.saveMetrics()
        if (GAP_MS > 0) await new Promise((resolve) => setTimeout(resolve, GAP_MS))
      }
    }

    await Promise.all(Array.from({ length: WORKERS }, () => worker()))
    await this.saveMetrics()
    this.running = false
    this.refreshMode = false
    const coverage = this.metrics?.size ?? 0
    const asOf = [...(this.metrics?.values() ?? [])].reduce<string | null>((latest, metric) => {
      if (!metric.to) return latest
      return latest === null || metric.to > latest ? metric.to : latest
    }, null)
    this.statusState = {
      status: coverage > 0 ? 'ready' : 'error',
      done,
      total,
      failed,
      coverage,
      asOf,
      updatedAt: new Date().toISOString(),
      message:
        coverage > 0
          ? `基础数据已覆盖 ${coverage} 只${failed > 0 ? `，${failed} 只没取到` : ''}，用时 ${Math.round((Date.now() - started) / 1000)} 秒`
          : '没有取到任何历史行情',
    }
    await this.saveStatus()
  }
}
