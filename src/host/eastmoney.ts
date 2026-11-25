import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { dshHomePath } from '@deepseek-ai/dsh-home-paths'
import type { MarketRow } from './data.ts'
import type { ResultRow } from '../shared/types.ts'

const BASE = 'https://push2.eastmoney.com/api/qt/clist/get'
const F10_BASE = 'https://emweb.securities.eastmoney.com/PC_HSF10/CompanySurvey/PageAjax'
const TENCENT_BASE = 'https://qt.gtimg.cn/q='
const FIELDS = 'f12,f14,f100,f9,f23,f20,f21,f8'
const FS = 'm:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23,m:0+t:81+s:2048'
const PAGE_SIZE = 100
const WORKERS = 2
const PAGE_GAP_MS = 150
const F10_WORKERS = 3
const F10_GAP_MS = 60
const TEN_BATCH = 80
const TEN_WORKERS = 2
const TEN_GAP_MS = 120
const TTL = 3 * 60_000
const DISK_MAX_AGE = 24 * 60 * 60_000

export interface Profile {
  industry: string | null
  pe: number | null
  pb: number | null
  turnoverRate: number | null
  totalMv: number | null
  circMv: number | null
}

function num(value: unknown): number | null {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) && parsed !== 0 ? parsed : null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function profilePath(): string {
  return join(dshHomePath('storages', 'fangkuai-ranking'), 'profiles.json')
}

function industryPath(): string {
  return join(dshHomePath('storages', 'fangkuai-ranking'), 'industries.json')
}

const industryCache = new Map<string, string | null>()
const industryPending = new Map<string, Promise<string | null>>()
let industryDiskLoaded = false
let industryWrite: Promise<void> = Promise.resolve()

function f10Code(ticker: string): string | null {
  if (!/^\d{6}$/.test(ticker)) return null
  if (/^(60|68)/.test(ticker)) return `SH${ticker}`
  if (/^(00|30|20)/.test(ticker)) return `SZ${ticker}`
  if (/^(4|8|92)/.test(ticker)) return `BJ${ticker}`
  return null
}

async function loadIndustryDisk(): Promise<void> {
  if (industryDiskLoaded) return
  industryDiskLoaded = true
  try {
    const body = JSON.parse(await readFile(industryPath(), 'utf8')) as unknown
    if (!isRecord(body) || !isRecord(body.industries)) return
    const at = typeof body.at === 'number' ? body.at : 0
    if (Date.now() - at > DISK_MAX_AGE) return
    for (const [ticker, value] of Object.entries(body.industries)) {
      industryCache.set(ticker, typeof value === 'string' && value.trim() ? value : null)
    }
  } catch {
    // 首次运行或文件损坏时按无缓存处理。
  }
}

async function persistIndustries(): Promise<void> {
  const file = industryPath()
  await mkdir(dirname(file), { recursive: true })
  const temp = `${file}.tmp`
  const industries: Record<string, string | null> = {}
  for (const [ticker, value] of industryCache) industries[ticker] = value
  await writeFile(temp, JSON.stringify({ version: 1, at: Date.now(), industries }), 'utf8')
  await rename(temp, file)
}

async function fetchF10Industry(ticker: string): Promise<string | null> {
  if (industryCache.has(ticker)) return industryCache.get(ticker) ?? null
  const pending = industryPending.get(ticker)
  if (pending) return pending
  const work = (async () => {
    const code = f10Code(ticker)
    if (!code) return null
    const response = await fetch(`${F10_BASE}?code=${code}`, {
      headers: { 'user-agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) return null
    const body = (await response.json().catch(() => null)) as unknown
    if (!isRecord(body) || !Array.isArray(body.jbzl) || !isRecord(body.jbzl[0])) return null
    const raw = body.jbzl[0].EM2016
    if (typeof raw !== 'string') return null
    const parts = raw.split('-').map((item) => item.trim()).filter(Boolean)
    return parts.length > 0 ? parts[parts.length - 1]! : null
  })()
  industryPending.set(ticker, work)
  try {
    const value = await work
    industryCache.set(ticker, value)
    return value
  } catch {
    industryCache.set(ticker, null)
    return null
  } finally {
    industryPending.delete(ticker)
  }
}

async function loadIndustries(tickers: string[]): Promise<Map<string, string>> {
  await loadIndustryDisk()
  const unique = [...new Set(tickers)].filter((ticker) => f10Code(ticker) !== null)
  let cursor = 0
  async function worker() {
    while (cursor < unique.length) {
      const ticker = unique[cursor]
      if (!ticker) break
      cursor += 1
      if (F10_GAP_MS > 0) await new Promise((resolve) => setTimeout(resolve, F10_GAP_MS))
      await fetchF10Industry(ticker)
    }
  }
  await Promise.all(Array.from({ length: Math.min(F10_WORKERS, unique.length) }, () => worker()))
  const found = new Map<string, string>()
  for (const ticker of unique) {
    const value = industryCache.get(ticker)
    if (value) found.set(ticker, value)
  }
  if (found.size > 0) {
    industryWrite = industryWrite.then(() => persistIndustries()).catch(() => undefined)
  }
  return found
}

function parseProfile(value: unknown): Profile | null {
  if (!isRecord(value)) return null
  return {
    industry: typeof value.industry === 'string' && value.industry.trim() ? value.industry : null,
    pe: typeof value.pe === 'number' ? value.pe : null,
    pb: typeof value.pb === 'number' ? value.pb : null,
    turnoverRate: typeof value.turnoverRate === 'number' ? value.turnoverRate : null,
    totalMv: typeof value.totalMv === 'number' ? value.totalMv : null,
    circMv: typeof value.circMv === 'number' ? value.circMv : null,
  }
}

function parseDiff(value: unknown): Map<string, Profile> {
  const result = new Map<string, Profile>()
  const diff = Array.isArray(value) ? value : []
  for (const item of diff) {
    if (!isRecord(item)) continue
    const raw = item.f12
    const code = typeof raw === 'string' ? raw : typeof raw === 'number' ? String(raw).padStart(6, '0') : ''
    if (!code) continue
    const total = num(item.f20)
    result.set(code, {
      industry: typeof item.f100 === 'string' && item.f100.trim() ? item.f100.trim() : null,
      pe: num(item.f9),
      pb: num(item.f23),
      turnoverRate: num(item.f8),
      totalMv: total === null ? null : total / 1e8,
      circMv: num(item.f21) === null ? null : (num(item.f21) as number) / 1e8,
    })
  }
  return result
}

async function fetchPage(page: number): Promise<{ profiles: Map<string, Profile>; total: number }> {
  const url = `${BASE}?pn=${page}&pz=${PAGE_SIZE}&po=1&np=1&fltt=2&invt=2&fid=f3&fs=${FS}&fields=${FIELDS}`
  const response = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
      referer: 'https://quote.eastmoney.com/',
    },
    signal: AbortSignal.timeout(15_000),
  })
  if (!response.ok) throw new Error(`eastmoney ${response.status}`)
  const body = (await response.json().catch(() => null)) as unknown
  const data = isRecord(body) && isRecord(body.data) ? body.data : null
  if (!data) throw new Error('eastmoney empty')
  const total = typeof data.total === 'number' ? data.total : 0
  return { profiles: parseDiff(data.diff), total }
}

function tencentCode(ticker: string): string | null {
  if (!/^\d{6}$/.test(ticker)) return null
  if (/^(60|68)/.test(ticker)) return `sh${ticker}`
  if (/^(00|30|20)/.test(ticker)) return `sz${ticker}`
  if (/^(4|8|92)/.test(ticker)) return `bj${ticker}`
  return null
}

function parseTencent(text: string): Map<string, Profile> {
  const result = new Map<string, Profile>()
  for (const line of text.split('\n')) {
    const parts = line.split('~')
    const code = parts[2]
    if (!code || !/^\d{6}$/.test(code)) continue
    const total = num(parts[45])
    const circ = num(parts[44])
    result.set(code, {
      industry: null,
      pe: num(parts[39]),
      pb: num(parts[46]),
      turnoverRate: num(parts[38]),
      totalMv: total,
      circMv: circ,
    })
  }
  return result
}

async function fetchTencentBatch(codes: string[]): Promise<Map<string, Profile>> {
  const response = await fetch(`${TENCENT_BASE}${codes.join(',')}`, {
    headers: { 'user-agent': 'Mozilla/5.0' },
    signal: AbortSignal.timeout(15_000),
  })
  if (!response.ok) throw new Error(`tencent ${response.status}`)
  const buffer = await response.arrayBuffer()
  return parseTencent(new TextDecoder('gbk').decode(buffer))
}

/** 东方财富批量接口被限流时，用腾讯行情补齐估值字段；行业仍由 F10 接口补。 */
async function fetchTencentProfiles(tickers: string[]): Promise<Map<string, Profile>> {
  const codes = [...new Set(tickers.map((ticker) => tencentCode(ticker)).filter((code): code is string => code !== null))]
  const batches: string[][] = []
  for (let offset = 0; offset < codes.length; offset += TEN_BATCH) {
    batches.push(codes.slice(offset, offset + TEN_BATCH))
  }
  const profiles = new Map<string, Profile>()
  let cursor = 0
  async function worker() {
    while (cursor < batches.length) {
      const batch = batches[cursor]
      if (!batch) break
      cursor += 1
      if (TEN_GAP_MS > 0) await new Promise((resolve) => setTimeout(resolve, TEN_GAP_MS))
      const found = await fetchTencentBatch(batch)
      for (const [ticker, profile] of found) profiles.set(ticker, profile)
    }
  }
  await Promise.all(Array.from({ length: Math.min(TEN_WORKERS, batches.length) }, () => worker()))
  return profiles
}

let snapshot: { at: number; profiles: Map<string, Profile> } | null = null
let diskLoaded = false
let inflight: Promise<{ profiles: Map<string, Profile>; failed: boolean }> | null = null
let eastmoneyCooldownUntil = 0

async function loadDisk(): Promise<void> {
  if (diskLoaded) return
  diskLoaded = true
  try {
    const text = await readFile(profilePath(), 'utf8')
    const body = JSON.parse(text) as unknown
    if (!isRecord(body) || !isRecord(body.profiles)) return
    const at = typeof body.at === 'number' ? body.at : 0
    if (Date.now() - at > DISK_MAX_AGE) return
    const profiles = new Map<string, Profile>()
    for (const [ticker, value] of Object.entries(body.profiles)) {
      const profile = parseProfile(value)
      if (profile) profiles.set(ticker, profile)
    }
    if (profiles.size > 0) snapshot = { at, profiles }
  } catch {
    // 首次运行或文件损坏时按无缓存处理。
  }
}

async function persist(next: { at: number; profiles: Map<string, Profile> }): Promise<void> {
  const file = profilePath()
  await mkdir(dirname(file), { recursive: true })
  const temp = `${file}.tmp`
  const profiles: Record<string, Profile> = {}
  for (const [ticker, profile] of next.profiles) profiles[ticker] = profile
  await writeFile(temp, JSON.stringify({ version: 1, at: next.at, profiles }), 'utf8')
  await rename(temp, file)
}

async function refreshSnapshot(): Promise<{ profiles: Map<string, Profile>; failed: boolean }> {
  if (Date.now() < eastmoneyCooldownUntil) return { profiles: new Map(), failed: true }
  try {
    const first = await fetchPage(1)
    const profiles = new Map(first.profiles)
    const pages = Math.max(1, Math.ceil(first.total / PAGE_SIZE))
    let cursor = 2
    async function worker() {
      while (cursor <= pages) {
        const page = cursor
        cursor += 1
        if (PAGE_GAP_MS > 0) await new Promise((resolve) => setTimeout(resolve, PAGE_GAP_MS))
        const found = await fetchPage(page)
        for (const [ticker, profile] of found.profiles) profiles.set(ticker, profile)
      }
    }
    await Promise.all(Array.from({ length: Math.min(WORKERS, Math.max(1, pages - 1)) }, () => worker()))
    eastmoneyCooldownUntil = 0
    snapshot = { at: Date.now(), profiles }
    void persist(snapshot).catch(() => undefined)
    return { profiles, failed: false }
  } catch {
    eastmoneyCooldownUntil = Date.now() + 5 * 60_000
    return { profiles: snapshot?.profiles ?? new Map(), failed: true }
  }
}

async function loadSnapshot(tickers: string[]): Promise<{ profiles: Map<string, Profile>; failed: boolean }> {
  await loadDisk()
  if (!snapshot) await refreshSnapshot()
  else if (Date.now() - snapshot.at >= TTL && !inflight) {
    // 有缓存先返回，后台刷新，不让公开行情源拖慢榜单首屏。
    const task = refreshSnapshot()
    inflight = task
    void task.finally(() => { if (inflight === task) inflight = null })
  }

  const profiles = new Map(snapshot?.profiles ?? [])
  const requested = [...new Set(tickers)]
  const missing = requested.filter((ticker) => !profiles.has(ticker))
  let failed = false
  if (missing.length > 0) {
    const extra = await fetchTencentProfiles(missing)
    for (const [ticker, profile] of extra) profiles.set(ticker, profile)
    if (extra.size > 0) {
      const next = { at: Date.now(), profiles }
      snapshot = next
      void persist(next).catch(() => undefined)
    }
    failed = missing.length > extra.size
  }
  return { profiles, failed }
}

/** 用东方财富公开行情补齐行业/估值/换手；只补展示与筛选字段，不改原始行情。 */
export async function enrichRows(rows: ResultRow[]): Promise<{ rows: ResultRow[] }> {
  if (rows.length === 0) return { rows }
  const { profiles } = await loadSnapshot(rows.map((row) => row.ticker))
  const missingIndustry = rows.filter((row) => !profiles.get(row.ticker)?.industry).map((row) => row.ticker)
  const fallbackIndustry = await loadIndustries(missingIndustry)
  return {
    rows: rows.map((row) => {
      const profile = profiles.get(row.ticker)
      return {
        ...row,
        industry: profile?.industry ?? fallbackIndustry.get(row.ticker) ?? row.industry,
        pe: profile?.pe ?? row.pe,
        pb: profile?.pb ?? row.pb,
        turnoverRate: profile?.turnoverRate ?? row.turnoverRate,
        totalMv: profile?.totalMv ?? row.totalMv,
        circMv: profile?.circMv ?? row.circMv,
      }
    }),
  }
}

/** 全市场基础资料补齐（仅当榜单条件/排序用到估值类字段时调用）。 */
export async function enrichMarketRows(rows: MarketRow[]): Promise<{ rows: MarketRow[]; warning: string | null }> {
  if (rows.length === 0) return { rows, warning: null }
  const { profiles, failed } = await loadSnapshot(rows.map((row) => row.ticker))
  const missing = failed
    ? (profiles.size > 0 ? '东方财富估值资料暂时不可用，使用上次缓存' : '东方财富估值资料暂时不可用，估值条件无法参与计算')
    : null
  return {
    rows: rows.map((row) => {
      const profile = profiles.get(row.ticker)
      if (!profile) return row
      return {
        ...row,
        pe: profile.pe,
        pb: profile.pb,
        turnoverRate: profile.turnoverRate,
        totalMv: profile.totalMv,
        circMv: profile.circMv,
      }
    }),
    warning: missing,
  }
}
