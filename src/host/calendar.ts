/** 最近一个完整交易日：不拿今天当数据日，收盘后也等次日再推进。 */
const holidayCache = new Map<number, { at: number; dates: Set<string> }>()
const TTL = 12 * 60 * 60 * 1000

function shanghaiDate(now: Date): string {
  return new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

function addDays(date: string, days: number): string {
  return new Date(Date.parse(`${date}T00:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10)
}

function weekday(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay()
}

async function holidaysOf(year: number): Promise<Set<string>> {
  const now = Date.now()
  const hit = holidayCache.get(year)
  if (hit && now - hit.at < TTL) return hit.dates
  const dates = new Set<string>()
  try {
    const response = await fetch(`https://timor.tech/api/holiday/year/${year}`, { signal: AbortSignal.timeout(8_000) })
    if (response.ok) {
      const body = (await response.json().catch(() => null)) as unknown
      const map = body && typeof body === 'object' && 'holiday' in body
        ? (body as { holiday?: Record<string, { holiday?: boolean; date?: string }> }).holiday
        : undefined
      for (const item of Object.values(map ?? {})) {
        if (item?.holiday === true && typeof item.date === 'string') dates.add(item.date)
      }
    }
  } catch {
    // 公共节假日接口不可用时只按周末回退，不阻断行情。
  }
  holidayCache.set(year, { at: now, dates })
  return dates
}

export async function latestTradeDate(now = new Date()): Promise<string | null> {
  const today = shanghaiDate(now)
  const years = new Set<number>()
  for (let i = 1; i <= 14; i += 1) years.add(Number(addDays(today, -i).slice(0, 4)))
  const maps = await Promise.all([...years].map((year) => holidaysOf(year)))
  const all = new Set<string>()
  for (const dates of maps) for (const date of dates) all.add(date)
  for (let i = 1; i <= 14; i += 1) {
    const day = addDays(today, -i)
    const week = weekday(day)
    if (week === 0 || week === 6) continue
    if (all.has(day)) continue
    return day
  }
  return null
}
