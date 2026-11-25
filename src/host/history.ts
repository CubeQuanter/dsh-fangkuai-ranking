import { mkdir, readdir, rename, stat, unlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { dshHomePath } from '@deepseek-ai/dsh-home-paths'
import { asyncBufferFromFile, parquetReadObjects } from 'hyparquet'
import { compressors } from 'hyparquet-compressors'
import { DataUnavailableError } from './errors.ts'
import type { FuyaoClient } from './fuyao.ts'

export interface Bar {
  dateMs: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface HistoryCache {
  date: string
  bars: Map<string, Bar[]>
}

function shanghaiDate(now = new Date()): string {
  const shifted = new Date(now.getTime() + 8 * 60 * 60 * 1000)
  return shifted.toISOString().slice(0, 10)
}

function dayStartMs(date: string): number {
  return new Date(`${date}T00:00:00+08:00`).getTime()
}

function asNumber(value: unknown): number {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export class HistoryStore {
  private cache: HistoryCache | null = null
  private inflight: Promise<HistoryCache> | null = null

  private dir(): string {
    return dshHomePath('cache', 'fangkuai-ranking')
  }

  private file(date: string): string {
    return join(this.dir(), `daily-10d-${date}.parquet`)
  }

  async hasToday(): Promise<boolean> {
    try {
      const info = await stat(this.file(shanghaiDate()))
      return info.size > 1024
    } catch {
      return false
    }
  }

  /** 最近一个完整交易日（缓存内最大 date_ms）。没有加载过历史时返回 null。 */
  latestDate(): string | null {
    if (!this.cache) return null
    let max = 0
    for (const bars of this.cache.bars.values()) {
      const last = bars[bars.length - 1]
      if (last && last.dateMs > max) max = last.dateMs
    }
    if (max <= 0) return null
    return new Date(max + 8 * 60 * 60 * 1000).toISOString().slice(0, 10)
  }

  async load(client: FuyaoClient): Promise<Map<string, Bar[]>> {
    const date = shanghaiDate()
    if (this.cache?.date === date) return this.cache.bars
    if (this.inflight) return (await this.inflight).bars
    this.inflight = this.loadFresh(client, date).finally(() => {
      this.inflight = null
    })
    return (await this.inflight).bars
  }

  private async loadFresh(client: FuyaoClient, date: string): Promise<HistoryCache> {
    const path = this.file(date)
    let exists = false
    try {
      const info = await stat(path)
      exists = info.size > 1024
    } catch {
      exists = false
    }
    if (!exists) {
      await mkdir(this.dir(), { recursive: true })
      const url = await client.fetchDumpUrl()
      const bytes = await client.downloadDump(url)
      if (bytes.byteLength < 1024) throw new DataUnavailableError('近10日行情文件为空，请稍后再试', 'history')
      const temp = `${path}.tmp`
      await writeFile(temp, Buffer.from(bytes))
      await rename(temp, path)
      await this.cleanup(date)
    }
    const bars = await this.read(path, date)
    if (bars.size < 500) throw new DataUnavailableError('近10日行情数据不完整，请稍后再试', 'history')
    this.cache = { date, bars }
    return this.cache
  }

  private async read(path: string, date: string): Promise<Map<string, Bar[]>> {
    let rows: Record<string, unknown>[]
    try {
      const file = await asyncBufferFromFile(path)
      rows = (await parquetReadObjects({
        file,
        compressors,
        columns: ['thscode', 'date_ms', 'open_price', 'high_price', 'low_price', 'close_price', 'volume'],
      })) as Record<string, unknown>[]
    } catch {
      try {
        await unlink(path)
      } catch {
        // 删除失败不影响本次报错。下次会重新下载。
      }
      throw new DataUnavailableError('近10日行情读取失败，请稍后再试', 'history')
    }
    const todayMs = dayStartMs(date)
    const bars = new Map<string, Bar[]>()
    for (const row of rows) {
      if (!isRecord(row)) continue
      const code = typeof row.thscode === 'string' ? row.thscode : ''
      const dateMs = asNumber(row.date_ms)
      if (!code || dateMs <= 0 || dateMs >= todayMs) continue
      const bar: Bar = {
        dateMs,
        open: asNumber(row.open_price),
        high: asNumber(row.high_price),
        low: asNumber(row.low_price),
        close: asNumber(row.close_price),
        volume: asNumber(row.volume),
      }
      if (bar.close <= 0) continue
      const list = bars.get(code)
      if (list) list.push(bar)
      else bars.set(code, [bar])
    }
    for (const [code, list] of bars) {
      list.sort((a, b) => a.dateMs - b.dateMs)
      if (list.length > 15) bars.set(code, list.slice(-15))
    }
    return bars
  }

  private async cleanup(date: string): Promise<void> {
    try {
      const files = await readdir(this.dir())
      for (const name of files) {
        const match = /^daily-10d-(\d{4}-\d{2}-\d{2})\.parquet$/.exec(name)
        if (!match || match[1] === date) continue
        await unlink(join(this.dir(), name)).catch(() => undefined)
      }
    } catch {
      // 清理是尽力而为，不影响主流程。
    }
  }
}

