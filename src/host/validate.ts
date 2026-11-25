import {
  ACCENTS,
  CONDITIONS,
  GROUPS,
  METRICS,
  VIEWS,
  conditionMeta,
  isEmptyConditionValue,
  metricMeta,
} from '../shared/catalog.ts'
import type {
  AccentKey,
  ColumnKey,
  ConditionClause,
  ConditionValue,
  GroupKind,
  LogicMode,
  MetricKey,
  RankingConfig,
  RankingDraft,
  SortDirection,
  ViewKind,
} from '../shared/types.ts'
import type { ConditionMeta } from '../shared/catalog.ts'
import { AppError } from './errors.ts'

const MAX_CONDITIONS = 20
const MAX_NAME = 20
const MAX_NOTE = 60

function fail(message: string): never {
  throw new AppError('invalid_config', message)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

function within(meta: ConditionMeta, value: number): number {
  if (meta.min !== undefined && value < meta.min) {
    fail(`条件「${meta.label}」不能小于 ${meta.min}${meta.unit ?? ''}`)
  }
  if (meta.max !== undefined && value > meta.max) {
    fail(`条件「${meta.label}」不能大于 ${meta.max}${meta.unit ?? ''}`)
  }
  return value
}

function normalizeNumberValue(meta: ConditionMeta, op: string, raw: unknown): number | { min: number; max: number } {
  if (op === 'between') {
    if (!isRecord(raw)) fail(`条件「${meta.label}」需要填写一个区间`)
    const min = readNumber(raw.min)
    const max = readNumber(raw.max)
    if (min === undefined || max === undefined) fail(`条件「${meta.label}」的区间不完整`)
    if (min > max) fail(`条件「${meta.label}」的起始值不能大于结束值`)
    within(meta, min)
    within(meta, max)
    return { min, max }
  }
  const value = readNumber(raw)
  if (value === undefined) fail(`条件「${meta.label}」需要填写数字`)
  return within(meta, value)
}

function normalizeEnumValue(meta: ConditionMeta, raw: unknown): string[] {
  const values: unknown[] = Array.isArray(raw) ? raw : typeof raw === 'string' ? [raw] : []
  const valid = values.filter((item): item is string => typeof item === 'string')
  if (valid.length === 0) {
    fail(meta.key === 'board' ? '请至少选择一个市场' : `请选择「${meta.label}」`)
  }
  if (meta.options) {
    const allowed = new Set(meta.options.map((item) => item.value))
    const unknown = valid.find((item) => !allowed.has(item))
    if (unknown) fail(`「${meta.label}」的选项不可用`)
  }
  if (meta.kind === 'board') {
    if (valid.length > 5) fail(`「${meta.label}」最多同时选择 5 个板块`)
    return [...new Set(valid)]
  }
  return [...new Set(valid)]
}

function normalizeTextValue(meta: ConditionMeta, raw: unknown): string {
  const text = typeof raw === 'string' ? raw.trim() : ''
  if (text.length === 0) fail(`请填写「${meta.label}」`)
  if (text.length > (meta.maxLength ?? 12)) fail(`「${meta.label}」最多 ${meta.maxLength ?? 12} 个字`)
  return text
}

function normalizeTimeValue(raw: unknown): string {
  const text = typeof raw === 'string' ? raw.trim() : ''
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(text)
  if (!match) fail('封板时间需要写成 09:30 这样的格式')
  return text
}

function normalizeCondition(raw: unknown): ConditionClause {
  if (!isRecord(raw)) fail('条件格式不正确')
  const key = typeof raw.key === 'string' ? raw.key : ''
  const meta = conditionMeta(key)
  if (!meta) fail(`不支持的条件：${key || '空'}`)
  const op = typeof raw.op === 'string' ? raw.op : meta.defaultOp
  if (!meta.ops.includes(op as never)) fail(`条件「${meta.label}」不支持这种比较方式`)
  let value: ConditionValue
  switch (meta.kind) {
    case 'number':
      value = normalizeNumberValue(meta, op, raw.value)
      break
    case 'enum':
    case 'board':
      value = normalizeEnumValue(meta, raw.value)
      break
    case 'bool': {
      if (raw.value !== 'yes' && raw.value !== 'no') fail(`「${meta.label}」只能选择是或否`)
      value = raw.value
      break
    }
    case 'text':
      value = normalizeTextValue(meta, raw.value)
      break
    case 'time':
      value = normalizeTimeValue(raw.value)
      break
    default:
      fail(`条件「${meta.label}」暂时不可用`)
  }
  if (isEmptyConditionValue(value)) fail(`「${meta.label}」还没有填写完整`)
  const clause: ConditionClause = { key, op: op as ConditionClause['op'], value }
  if (raw.negate === true) clause.negate = true
  if (meta.kind === 'board' && typeof raw.note === 'string' && raw.note.trim()) {
    clause.note = raw.note.trim().slice(0, 40)
  }
  return clause
}

function normalizeConditions(raw: unknown): ConditionClause[] {
  if (!Array.isArray(raw)) fail('筛选条件格式不正确')
  if (raw.length === 0) fail('请至少添加一个筛选条件')
  if (raw.length > MAX_CONDITIONS) fail(`最多设置 ${MAX_CONDITIONS} 个条件`)
  const seen = new Set<string>()
  const result: ConditionClause[] = []
  for (const item of raw) {
    const clause = normalizeCondition(item)
    if (seen.has(clause.key)) fail(`条件「${conditionMeta(clause.key)?.label ?? clause.key}」只能出现一次`)
    seen.add(clause.key)
    result.push(clause)
  }
  return result
}

function normalizeName(raw: unknown, fallback?: string): string {
  const text = typeof raw === 'string' ? raw.trim() : ''
  if (!text) fail('请给榜单起一个名字')
  if (text.length > MAX_NAME) fail(`榜单名称最多 ${MAX_NAME} 个字`)
  return text || (fallback ?? '')
}

function normalizeNote(raw: unknown, fallback = ''): string {
  if (raw === undefined) return fallback
  const text = typeof raw === 'string' ? raw.trim() : ''
  if (text.length > MAX_NOTE) fail(`榜单备注最多 ${MAX_NOTE} 个字`)
  return text
}

const LEGACY_ACCENTS: Record<string, AccentKey> = {
  cinnabar: 'rose',
}

function normalizeAccent(raw: unknown, fallback: AccentKey): AccentKey {
  if (typeof raw !== 'string') return fallback
  const key = LEGACY_ACCENTS[raw] ?? raw
  return ACCENTS.some((item) => item.key === key) ? (key as AccentKey) : fallback
}

function normalizeLogic(raw: unknown, fallback: LogicMode): LogicMode {
  return raw === 'or' || raw === 'and' ? raw : fallback
}

function normalizeColumns(raw: unknown): ColumnKey[] {
  if (!Array.isArray(raw)) fail('展示列格式不正确')
  const keys = raw.filter((item): item is ColumnKey => typeof item === 'string' && metricMeta(item) !== undefined)
  if (keys.length === 0) fail('请至少选择一列展示数据')
  const unique = [...new Set(keys)]
  return unique
}

function normalizeSortKey(raw: unknown, fallback: MetricKey): MetricKey {
  if (typeof raw === 'string') {
    const meta = metricMeta(raw)
    if (meta?.sortable) return raw as MetricKey
  }
  return fallback
}

function normalizeSortDir(raw: unknown, fallback: SortDirection): SortDirection {
  return raw === 'asc' || raw === 'desc' ? raw : fallback
}

function normalizeLimit(raw: unknown, fallback: number): number {
  const value = readNumber(raw)
  if (value === undefined) return fallback
  if (!Number.isInteger(value) || value < 10 || value > 200) fail('榜单条数需要在 10 到 200 之间')
  return value
}

const LEGACY_VIEWS: Record<string, ViewKind> = {
  cards: 'card',
  bars: 'podium',
  groups: 'group',
}
const LEGACY_GROUPS: Record<string, GroupKind> = {
  board: 'industry',
  limitState: 'limit_times',
  boardCount: 'limit_times',
  isST: 'pct_band',
}

function normalizeView(raw: unknown, fallback: ViewKind): ViewKind {
  if (typeof raw !== 'string') return fallback
  const key = LEGACY_VIEWS[raw] ?? raw
  return VIEWS.some((item) => item.key === key) ? (key as ViewKind) : fallback
}

function normalizeGroup(raw: unknown, fallback: GroupKind): GroupKind {
  if (typeof raw !== 'string') return fallback
  const key = LEGACY_GROUPS[raw] ?? raw
  return GROUPS.some((item) => item.key === key) ? (key as GroupKind) : fallback
}

/** 把外部输入（界面、模型工具、磁盘旧数据）归一化成一份安全可用的榜单草稿。 */
export function normalizeDraft(input: unknown, base?: RankingDraft): RankingDraft {
  if (!isRecord(input)) fail('榜单内容格式不正确')
  const fallback = base ?? {
    name: '',
    note: '',
    accent: 'indigo' as AccentKey,
    logic: 'and' as LogicMode,
    conditions: [],
    sortKey: 'pct' as MetricKey,
    sortDir: 'desc' as SortDirection,
    limit: 50,
    view: 'list' as ViewKind,
    columns: ['pct', 'amount', 'pct5', 'hotRank'] as ColumnKey[],
    groupBy: 'industry' as GroupKind,
  }
  const merged = {
    name: input.name !== undefined ? input.name : fallback.name,
    note: input.note !== undefined ? input.note : fallback.note,
    accent: input.accent !== undefined ? input.accent : fallback.accent,
    logic: input.logic !== undefined ? input.logic : fallback.logic,
    conditions: input.conditions !== undefined ? input.conditions : fallback.conditions,
    sortKey: input.sortKey !== undefined ? input.sortKey : fallback.sortKey,
    sortDir: input.sortDir !== undefined ? input.sortDir : fallback.sortDir,
    limit: input.limit !== undefined ? input.limit : fallback.limit,
    view: input.view !== undefined ? input.view : fallback.view,
    columns: input.columns !== undefined ? input.columns : fallback.columns,
    groupBy: input.groupBy !== undefined ? input.groupBy : fallback.groupBy,
  }
  return {
    name: normalizeName(merged.name, fallback.name),
    note: normalizeNote(merged.note, fallback.note),
    accent: normalizeAccent(merged.accent, fallback.accent),
    logic: normalizeLogic(merged.logic, fallback.logic),
    conditions: normalizeConditions(merged.conditions),
    sortKey: normalizeSortKey(merged.sortKey, fallback.sortKey),
    sortDir: normalizeSortDir(merged.sortDir, fallback.sortDir),
    limit: normalizeLimit(merged.limit, fallback.limit),
    view: normalizeView(merged.view, fallback.view),
    columns: normalizeColumns(merged.columns),
    groupBy: normalizeGroup(merged.groupBy, fallback.groupBy),
  }
}

/** 从磁盘记录恢复时保留标识与时间；内容仍走同一套校验。 */
export function normalizeStoredConfig(input: unknown): RankingConfig | null {
  if (!isRecord(input)) return null
  const id = typeof input.id === 'string' ? input.id : ''
  if (!id) return null
  try {
    const draft = normalizeDraft(input)
    return {
      ...draft,
      id,
      createdAt: typeof input.createdAt === 'string' ? input.createdAt : new Date().toISOString(),
      updatedAt: typeof input.updatedAt === 'string' ? input.updatedAt : new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export function settingsCatalog(): {
  conditions: ConditionMeta[]
  metrics: typeof METRICS
  accents: typeof ACCENTS
  views: typeof VIEWS
  groups: typeof GROUPS
  conditionCount: number
} {
  return {
    conditions: CONDITIONS,
    metrics: METRICS,
    accents: ACCENTS,
    views: VIEWS,
    groups: GROUPS,
    conditionCount: CONDITIONS.length,
  }
}
