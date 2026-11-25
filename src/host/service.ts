import { credentialRef } from '@deepseek-ai/dsh-credentials'
import type { Context } from '@deepseek-ai/cordis'
import type { BoardInfo, BootstrapData, ConnectionInfo, EvaluateResult, RankingConfig, WallData, WallEntry } from '../shared/types.ts'
import { BASIC_METRIC_KEYS } from '../shared/catalog.ts'
import { BasicHistory } from './basic.ts'
import { MarketData } from './data.ts'
import { enrichMarketRows, enrichRows } from './eastmoney.ts'
import { AppError, MissingKeyError } from './errors.ts'
import { evaluate } from './engine.ts'
import { FuyaoClient } from './fuyao.ts'
import { RankingStore } from './store.ts'
import { normalizeDraft } from './validate.ts'

const KEY_REF = credentialRef('FUYAO_API_KEY')
const BOARD_TAGS = new Set(['industry', 'cn_concept', 'region'])
const PROFILE_FIELDS = new Set(['pe', 'pb', 'turnoverRate', 'totalMv', 'circMv'])
const PROFILE_COLUMNS = new Set(['pe', 'pb', 'turnoverRate', 'totalMv', 'circMv'])

function nowIso(): string {
  return new Date().toISOString()
}

function temporaryConfig(input: unknown): RankingConfig {
  const draft = normalizeDraft(input)
  const now = nowIso()
  return { ...draft, id: 'preview', createdAt: now, updatedAt: now }
}

/** 插件唯一的能力入口：凭据、榜单存储、实时行情和求值在这里汇合。 */
export class RankingService {
  private readonly store = new RankingStore()
  private readonly market = new MarketData()
  private readonly basic = new BasicHistory()
  readonly ctx: Context

  constructor(ctx: Context) {
    this.ctx = ctx
  }

  private async client(): Promise<FuyaoClient> {
    const resolved = await this.ctx.credentials.resolve(KEY_REF)
    const key = resolved?.value.trim()
    if (!key) throw new MissingKeyError()
    return new FuyaoClient(key)
  }

  async connection(refresh = false): Promise<ConnectionInfo> {
    const info = await this.ctx.credentials.describe(KEY_REF)
    void refresh
    return {
      configured: info.configured,
      writable: info.writable,
      ...(info.source ? { source: info.source } : {}),
      ...(info.masked ? { masked: info.masked } : {}),
    }
  }

  async bootstrap(): Promise<BootstrapData> {
    const [connection, rankings, historyReady, basic] = await Promise.all([
      this.connection(),
      this.store.list(),
      this.market.hasHistory(),
      this.basic.status(),
    ])
    const sources = [
      {
        key: 'fuyao',
        name: '扶摇数据服务',
        role: '全市场快照、涨停池、热榜、10 日行情包',
        status: connection.configured ? 'ready' as const : 'need_key' as const,
      },
      {
        key: 'basic',
        name: '基础数据（免费）',
        role: '近 6 个月日 K、60 日涨跌停/连板、RSI/KDJ/BOLL/CCI',
        status:
          basic.status === 'ready'
            ? 'ready' as const
            : basic.status === 'running'
              ? 'running' as const
              : 'pending' as const,
      },
      {
        key: 'eastmoney',
        name: '东方财富公开行情',
        role: '行业、PE/PB、换手率、总/流通市值',
        status: 'ready' as const,
      },
      {
        key: 'local',
        name: '本机计算',
        role: '交易日历、均线/量比、榜单求值',
        status: 'ready' as const,
      },
    ]
    return { connection, rankings, historyReady, basic, sources, now: nowIso() }
  }

  async basicStatus(): Promise<BootstrapData['basic']> {
    return this.basic.status()
  }

  async initializeBasic(refresh = false): Promise<BootstrapData['basic']> {
    const client = await this.client()
    const tickers = await this.market.tickers(client)
    return this.basic.start(tickers, refresh)
  }

  private async testKey(key: string): Promise<void> {
    const trimmed = key.trim()
    if (trimmed.length < 8 || trimmed.length > 256 || /\s/.test(trimmed)) {
      throw new AppError('invalid_key_format', '访问密钥格式不正确，请完整复制后再试')
    }
    try {
      await new FuyaoClient(trimmed).test()
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('invalid_key', '这个密钥暂时无法连接扶摇数据服务，请检查后重试', 401)
    }
  }

  async saveKey(key: string): Promise<ConnectionInfo> {
    await this.testKey(key)
    try {
      await this.ctx.credentials.set(KEY_REF, key.trim())
    } catch {
      throw new AppError('not_writable', '当前环境下无法保存密钥，请改用本机环境变量提供')
    }
    return this.connection()
  }

  async verifyKey(key?: string): Promise<ConnectionInfo> {
    if (key && key.trim()) {
      await this.testKey(key)
      return this.connection()
    }
    const client = await this.client()
    await client.test()
    return this.connection()
  }

  async clearKey(): Promise<ConnectionInfo> {
    await this.ctx.credentials.unset(KEY_REF)
    return this.connection()
  }

  async boards(tag: string): Promise<BoardInfo[]> {
    if (!BOARD_TAGS.has(tag)) throw new AppError('invalid_tag', '这个板块类型暂时不可用')
    const client = await this.client()
    return this.market.boardCatalog(client, tag)
  }

  async rankings(): Promise<RankingConfig[]> {
    return this.store.list()
  }

  async create(input: unknown): Promise<RankingConfig> {
    return this.store.create(input)
  }

  async update(id: string, patch: unknown): Promise<RankingConfig> {
    return this.store.update(id, patch)
  }

  async remove(id: string): Promise<void> {
    return this.store.remove(id)
  }

  async evaluateConfig(config: RankingConfig, force = false, maxRows?: number): Promise<EvaluateResult> {
    const client = await this.client()
    let built = await this.market.build(client, config, force)
    const basicNeeded = config.conditions.some((clause) => BASIC_METRIC_KEYS.has(clause.key))
    if (basicNeeded) {
      const covered = await this.basic.apply(built.rows)
      const basicStatus = await this.basic.status()
      if (basicStatus.status === 'running') {
        built.warnings = [...built.warnings, `基础历史正在初始化（${basicStatus.done} / ${basicStatus.total}），60 日条件暂时按缺少数据处理`]
      } else if (basicStatus.status !== 'ready' || covered === 0) {
        built.warnings = [...built.warnings, '基础历史还没有初始化，60 日条件会显示缺少数据；到设置页点一次「初始化基础数据」即可']
      } else if (covered < built.rows.length) {
        built.warnings = [...built.warnings, `基础历史覆盖 ${covered} / ${built.rows.length} 只，未覆盖的股票按缺少数据处理`]
      }
    }
    const needsProfile = PROFILE_FIELDS.has(config.sortKey)
      || config.conditions.some((clause) => PROFILE_FIELDS.has(clause.key))
      || config.columns.some((key) => PROFILE_COLUMNS.has(key))
    if (needsProfile) {
      const enriched = await enrichMarketRows(built.rows)
      built = { ...built, rows: enriched.rows }
      if (enriched.warning) built.warnings = [...built.warnings, enriched.warning]
    }
    const result = evaluate(config, built, maxRows === undefined ? {} : { maxRows })
    const enriched = await enrichRows(result.rows)
    return { ...result, rows: enriched.rows }
  }

  async evaluateSaved(id: string, force = false, maxRows?: number): Promise<EvaluateResult> {
    const config = await this.store.get(id)
    if (!config) throw new AppError('not_found', '这个榜单已经不存在了', 404)
    return this.evaluateConfig(config, force, maxRows)
  }

  async evaluateDraft(input: unknown, force = false, maxRows = 10): Promise<EvaluateResult> {
    const config = temporaryConfig(input)
    return this.evaluateConfig(config, force, maxRows)
  }

  async wall(ids?: string[], force = false): Promise<WallData> {
    const all = await this.store.list()
    const selected = ids && ids.length > 0 ? all.filter((item) => ids.includes(item.id)) : all
    const entries: WallEntry[] = []
    for (const ranking of selected) {
      try {
        const result = await this.evaluateConfig(ranking, force, Math.min(ranking.limit, 8))
        entries.push({ id: ranking.id, name: ranking.name, result })
      } catch (error) {
        const message = error instanceof AppError ? error.message : '这个榜单暂时算不出来，请稍后重试'
        entries.push({ id: ranking.id, name: ranking.name, error: message })
      }
    }
    const historyReady = await this.market.hasHistory()
    const first = entries.find((item) => item.result)?.result
    return {
      entries,
      historyReady,
      dataDate: first?.dataDate ?? null,
      previewAt: first?.previewAt ?? null,
    }
  }
}
