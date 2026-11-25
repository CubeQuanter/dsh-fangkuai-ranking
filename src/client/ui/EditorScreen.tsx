import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import {
  ACCENTS,
  CONDITIONS,
  GROUPS,
  TEMPLATES,
  VIEWS,
  columnOptions,
  conditionMeta,
  draftFromTemplate,
  sortOptions,
} from '../../shared/catalog.ts'
import type { ConditionMeta } from '../../shared/catalog.ts'
import type {
  ConditionClause,
  ConditionValue,
  EvaluateResult,
  GroupKind,
  MetricKey,
  RankingConfig,
  RankingDraft,
  ViewKind,
} from '../../shared/types.ts'
import { api, UiError } from '../api.ts'
import { ConditionPicker } from './ConditionPicker.tsx'
import { ConditionRow } from './ConditionRow.tsx'
import { ErrorLine } from './bits.tsx'
import { Icon, type IconName } from './icons.tsx'
import { formatClock, marketPhase } from './display.ts'

const HISTORY_COLUMNS = new Set(['pct5', 'pct10', 'volRatio5', 'ma5dev'])
const LIMITS = [20, 30, 40, 50, 100, 200]
const MAX_CONDITIONS = 20
const VIEW_ICON: Record<ViewKind, IconName> = {
  list: 'list',
  card: 'cards',
  podium: 'bars',
  group: 'groups',
  chip: 'list',
}

function cloneValue(value: ConditionValue): ConditionValue {
  if (Array.isArray(value)) return [...value]
  if (typeof value === 'object' && value !== null) return { ...value }
  return value
}

function defaultClause(meta: ConditionMeta): ConditionClause {
  const clause: ConditionClause = {
    key: meta.key,
    op: meta.defaultOp,
    value: cloneValue(meta.defaultValue),
  }
  if (meta.kind === 'board') clause.note = ''
  return clause
}

function historyNeeded(draft: RankingDraft): boolean {
  if (draft.conditions.some((clause) => conditionMeta(clause.key)?.source === 'history')) return true
  if (HISTORY_COLUMNS.has(draft.sortKey)) return true
  return draft.columns.some((column) => HISTORY_COLUMNS.has(column))
}

export function EditorScreen({
  id,
  initial,
  historyReady,
  onCancel,
  onSaved,
}: {
  id?: string
  initial: RankingDraft
  historyReady: boolean
  onCancel: () => void
  onSaved: (config: RankingConfig, created: boolean) => void
}) {
  const [draft, setDraft] = useState<RankingDraft>(initial)
  const [picker, setPicker] = useState(false)
  const [preview, setPreview] = useState<EvaluateResult | null>(null)
  const [previewing, setPreviewing] = useState(false)
  const [previewError, setPreviewError] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [dirty, setDirty] = useState(false)
  const previewSeq = useRef(0)

  const initialJson = useMemo(() => JSON.stringify(initial), [initial])
  const needsHistory = historyNeeded(draft)
  const slowHint = needsHistory && !historyReady

  function clearPreview() {
    setPreview(null)
    setPreviewError('')
  }

  function update(patch: Partial<RankingDraft>) {
    setDraft((current) => ({ ...current, ...patch }))
    setDirty(true)
    clearPreview()
    setError('')
  }

  function updateClause(index: number, clause: ConditionClause) {
    const conditions = draft.conditions.map((item, itemIndex) => (itemIndex === index ? clause : item))
    update({ conditions })
  }

  function removeClause(index: number) {
    update({ conditions: draft.conditions.filter((_, itemIndex) => itemIndex !== index) })
  }

  function addClause(meta: ConditionMeta) {
    if (draft.conditions.length >= MAX_CONDITIONS) return
    update({ conditions: [...draft.conditions, defaultClause(meta)] })
  }

  function applyDraft(next: RankingDraft) {
    setDraft(next)
    setDirty(true)
    clearPreview()
    setError('')
  }

  function validateForSave(): string {
    if (!draft.name.trim()) return '请给榜单起一个名字'
    if (draft.name.trim().length > 20) return '榜单名称最多 20 个字'
    if (draft.note.trim().length > 60) return '备注最多 60 个字'
    if (draft.conditions.length === 0) return '请至少添加一个筛选条件'
    if (draft.conditions.length > MAX_CONDITIONS) return `最多设置 ${MAX_CONDITIONS} 个条件`
    const emptyBoard = draft.conditions.find(
      (clause) => conditionMeta(clause.key)?.kind === 'board' && Array.isArray(clause.value) && clause.value.length === 0,
    )
    if (emptyBoard) return `请在「${conditionMeta(emptyBoard.key)?.label ?? '板块'}」里选择至少一个板块`
    if (draft.columns.length === 0) return '请至少选择一列展示数据'
    return ''
  }

  async function runPreview() {
    if (draft.conditions.length === 0) {
      clearPreview()
      return
    }
    const seq = ++previewSeq.current
    setPreviewing(true)
    setPreviewError('')
    try {
      const result = await api.preview(draft, 10)
      if (previewSeq.current !== seq) return
      setPreview(result)
    } catch (issue) {
      if (previewSeq.current !== seq) return
      setPreviewError(issue instanceof UiError ? issue.message : '试算没有成功，请稍后再试')
    } finally {
      if (previewSeq.current === seq) setPreviewing(false)
    }
  }

  async function save() {
    if (saving) return
    const invalid = validateForSave()
    if (invalid) {
      setError(invalid)
      return
    }
    setSaving(true)
    setError('')
    try {
      const body = {
        ...draft,
        name: draft.name.trim(),
        note: draft.note.trim(),
      }
      const config = id ? await api.update(id, body) : await api.create(body)
      onSaved(config, !id)
    } catch (issue) {
      setError(issue instanceof UiError ? issue.message : '保存没有成功，请稍后再试')
    } finally {
      setSaving(false)
    }
  }

  function cancel() {
    const currentJson = JSON.stringify(draft)
    if (dirty && currentJson !== initialJson && !window.confirm('还有没保存的修改，确定离开吗？')) return
    onCancel()
  }

  useEffect(() => {
    const timer = window.setTimeout(() => void runPreview(), 600)
    return () => window.clearTimeout(timer)
    // 条件或排序/列变化都重算；名称和备注不影响结果。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft.conditions, draft.sortKey, draft.sortDir, draft.limit, draft.logic, draft.columns, draft.view, draft.groupBy])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault()
        void save()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  const used = new Set(draft.conditions.map((clause) => clause.key))
  const phase = marketPhase()
  const hitOf = (key: string) => preview?.conditionHits.find((item) => item.key === key)?.hits

  if (picker) {
    return (
      <div className="dsr-editor-backdrop">
        <ConditionPicker used={used} onPick={addClause} onClose={() => setPicker(false)} />
      </div>
    )
  }

  return (
    <div className="dsr-editor-backdrop">
      <div className="fk-editor-modal">
        <div className="fk-editor-head">
          <span className="fk-editor-mark"><Icon name="cards" size={16} /></span>
          <div>
            <h1>{id ? `编辑「${draft.name}」` : '新建榜单'}</h1>
            <span className="dsr-muted">{CONDITIONS.length} 个预设条件 · {columnOptions().length} 个字段</span>
          </div>
          <button type="button" className="dsr-icon-btn" aria-label="关闭" title="关闭（Esc）" onClick={cancel}>
            <Icon name="close" />
          </button>
        </div>

        <div className="fk-editor-scroll">
          <section className="fk-editor-section">
            <div className="fk-editor-label">① 基本信息</div>
            <div className="fk-basic-row">
              <label className="fk-basic-name">
                <span className="dsr-label">名称</span>
                <input
                  id="ranking-name"
                  className="dsr-input dsr-name-input"
                  value={draft.name}
                  maxLength={20}
                  placeholder="例如：打板接力"
                  autoFocus
                  onChange={(event) => update({ name: event.target.value })}
                />
              </label>
              <label className="fk-basic-note">
                <span className="dsr-label">备注</span>
                <input
                  className="dsr-input"
                  value={draft.note}
                  maxLength={60}
                  placeholder="这个榜单用来盯什么（可空）"
                  onChange={(event) => update({ note: event.target.value })}
                />
              </label>
              <div className="fk-basic-accent">
                <span className="dsr-label">辨识色</span>
                <div className="dsr-accent-row">
                  {ACCENTS.map((accent) => (
                    <button
                      key={accent.key}
                      type="button"
                      className={`dsr-swatch ${draft.accent === accent.key ? 'on' : ''}`}
                      style={{ '--swatch': accent.color } as CSSProperties}
                      aria-label={accent.label}
                      title={accent.label}
                      onClick={() => update({ accent: accent.key })}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="fk-editor-section">
            <div className="fk-editor-label-row">
              <div className="fk-editor-label">② 筛选条件</div>
              <span className="dsr-muted">{draft.conditions.length} / {MAX_CONDITIONS}</span>
            </div>

            <div className="dsr-templates fk-template-row">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  className="dsr-template-chip"
                  title={template.description}
                  onClick={() => {
                    const next = draftFromTemplate(template)
                    applyDraft({ ...next, name: draft.name.trim() || next.name, note: draft.note.trim() || next.note })
                  }}
                >
                  {template.name}
                </button>
              ))}
            </div>

            <div className="fk-cond-toolbar">
              <span className="dsr-muted">默认全部满足；可切「任一满足」，单条可切「排除」。</span>
              <div className="dsr-seg">
                <button
                  type="button"
                  className={draft.logic === 'and' ? 'active' : ''}
                  onClick={() => update({ logic: 'and' })}
                >
                  全部满足
                </button>
                <button
                  type="button"
                  className={draft.logic === 'or' ? 'active' : ''}
                  onClick={() => update({ logic: 'or' })}
                >
                  任一满足
                </button>
              </div>
            </div>

            {draft.conditions.length === 0 ? (
              <div className="dsr-cond-empty">
                还没有条件。至少加一条，榜单才有筛选意义；现在只会按「{sortOptions().find((item) => item.key === draft.sortKey)?.label}」排队。
              </div>
            ) : (
              <div className="dsr-cond-list">
                {draft.conditions.map((clause, index) => {
                  const meta = conditionMeta(clause.key)
                  if (!meta) return null
                  return (
                    <ConditionRow
                      key={`${clause.key}-${index}`}
                      clause={clause}
                      meta={meta}
                      hit={hitOf(clause.key)}
                      onChange={(next) => updateClause(index, next)}
                      onRemove={() => removeClause(index)}
                    />
                  )
                })}
              </div>
            )}
            <button
              type="button"
              className="dsr-add-cond"
              onClick={() => setPicker(true)}
              disabled={draft.conditions.length >= MAX_CONDITIONS}
            >
              <Icon name="plus" size={13} />
              {draft.conditions.length >= MAX_CONDITIONS ? `最多 ${MAX_CONDITIONS} 个条件` : '添加条件'}
            </button>
            {slowHint ? (
              <div className="dsr-hint">这组条件要用近 10 日行情，第一次试算会多等几秒，当天会复用这份行情。</div>
            ) : null}
          </section>

          <section className="fk-editor-section">
            <div className="fk-editor-label">③ 呈现方式</div>
            <div className="fk-display-row">
              <label className="fk-display-field">
                <span className="dsr-label">排序依据</span>
                <select
                  className="dsr-select"
                  value={draft.sortKey}
                  onChange={(event) => {
                    const key = event.target.value as MetricKey
                    const meta = sortOptions().find((item) => item.key === key)
                    update({ sortKey: key, sortDir: meta?.defaultDir ?? 'desc' })
                  }}
                >
                  {sortOptions().map((item) => (
                    <option key={item.key} value={item.key}>{item.label}</option>
                  ))}
                </select>
              </label>
              <div className="fk-display-field">
                <span className="dsr-label">方向</span>
                <div className="dsr-seg">
                  <button type="button" className={draft.sortDir === 'desc' ? 'active' : ''} onClick={() => update({ sortDir: 'desc' })}>
                    从大到小
                  </button>
                  <button type="button" className={draft.sortDir === 'asc' ? 'active' : ''} onClick={() => update({ sortDir: 'asc' })}>
                    从小到大
                  </button>
                </div>
              </div>
              <label className="fk-display-field">
                <span className="dsr-label">显示长度</span>
                <select
                  className="dsr-select"
                  value={draft.limit}
                  onChange={(event) => update({ limit: Number(event.target.value) })}
                >
                  {LIMITS.map((value) => (
                    <option key={value} value={value}>{value} 只</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="fk-view-grid">
              {VIEWS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  title={item.hint}
                  className={`fk-view-option ${draft.view === item.key ? 'on' : ''}`}
                  onClick={() => update({ view: item.key })}
                >
                  <Icon name={VIEW_ICON[item.key]} size={16} />
                  <b>{item.label}</b>
                </button>
              ))}
            </div>

            {draft.view === 'group' ? (
              <div className="fk-group-row">
                <span className="dsr-label">分组依据</span>
                <select
                  className="dsr-select"
                  value={draft.groupBy}
                  onChange={(event) => update({ groupBy: event.target.value as GroupKind })}
                >
                  {GROUPS.map((item) => (
                    <option key={item.key} value={item.key}>{item.label}</option>
                  ))}
                </select>
                {draft.groupBy === 'concept' && !draft.conditions.some((clause) => clause.key === 'concept' && !clause.negate) ? (
                  <span className="dsr-hint">按题材分组需要先加一条正向的「所属题材」条件。</span>
                ) : null}
              </div>
            ) : null}

            <div className="dsr-field fk-columns-field">
              <span className="dsr-label">展示哪些数据</span>
              <div className="dsr-columns">
                {columnOptions().map((item) => {
                  const on = draft.columns.includes(item.key)
                  return (
                    <button
                      key={item.key}
                      type="button"
                      className={`dsr-col-chip ${on ? 'on' : ''}`}
                      onClick={() => {
                        if (on) {
                          if (draft.columns.length === 1) return
                          update({ columns: draft.columns.filter((key) => key !== item.key) })
                        } else {
                          update({ columns: [...draft.columns, item.key] })
                        }
                      }}
                    >
                      {item.label}
                    </button>
                  )
                })}
                <span className="dsr-hint">{draft.columns.length} 列</span>
              </div>
              <div className="dsr-hint">附加列只在「列表」看法里显示；卡片墙、排行榜、分组和芯片墙会挑重点展示。</div>
            </div>
          </section>
        </div>

        <div className="fk-editor-previewbar">
          {previewError ? <ErrorLine text={previewError} /> : previewing ? (
            <span className="fk-preview-loading"><span className="dsr-spinner" />按当前条件试算…</span>
          ) : preview ? (
            <div className="fk-preview-content">
              <span className="fk-preview-count"><b>{preview.matched}</b> 只入选</span>
              <span className="fk-preview-names">
                {preview.rows.slice(0, 4).map((row) => row.name).join('、') || '没有股票满足'}
              </span>
              <span className="fk-preview-meta">
                数据日 {preview.dataDate ?? '—'}
                {preview.previewAt ? ` · ${phase.live ? '盘中预览' : '快照'} ${formatClock(preview.previewAt)}` : ''}
              </span>
            </div>
          ) : (
            <span className="fk-preview-empty">加条件后自动试算，这里会显示前几只。</span>
          )}
        </div>

        <div className="fk-editor-footer">
          {error ? <ErrorLine text={error} /> : <span className="dsr-spacer" />}
          <span className="fk-editor-shortcut">Ctrl + Enter 保存</span>
          <button type="button" className="dsr-btn" onClick={cancel}>取消</button>
          <button type="button" className="dsr-btn primary" onClick={() => void save()} disabled={saving}>
            {saving ? <span className="dsr-spinner" /> : null}
            {id ? '保存修改' : '保存榜单'}
          </button>
        </div>
      </div>
    </div>
  )
}
