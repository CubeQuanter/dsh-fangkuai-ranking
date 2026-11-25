import { useState, type CSSProperties } from 'react'
import { TEMPLATES } from '../../shared/catalog.ts'
import { accentColor, formatCondition, formatSort, viewLabel } from '../../shared/format.ts'
import type { TemplateMeta } from '../../shared/catalog.ts'
import type { RankingConfig, WallData } from '../../shared/types.ts'
import { ErrorLine, Spinner } from './bits.tsx'
import { formatClock } from './display.ts'
import { Icon } from './icons.tsx'
import { viewOf } from './ResultViews.tsx'

const GUIDE_LINES = [
  '榜单是一组筛选条件加一个排序，盘中有新行情就自动重算。',
  '先圈范围，再定强弱；条件越少越稳，先跑出结果再加。',
  '点卡片看完整名单，点编辑改条件，改完立刻生效。',
]

export function WallScreen({
  rankings,
  wall,
  loading,
  error,
  busy,
  phaseLabel,
  phaseLive,
  dataDate,
  previewAt,
  onFocus,
  onEdit,
  onDuplicate,
  onDelete,
  onNew,
  onRefresh,
  onSettings,
  onTemplate,
}: {
  rankings: RankingConfig[]
  wall: WallData | null
  loading: boolean
  error: string
  busy: boolean
  phaseLabel: string
  phaseLive: boolean
  dataDate: string | null
  previewAt: number | null
  onFocus: (id: string) => void
  onEdit: (id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
  onNew: () => void
  onRefresh: () => void
  onSettings: () => void
  onTemplate: (template: TemplateMeta) => void
}) {
  const [pendingDelete, setPendingDelete] = useState<string | null>(null)
  const [guideOpen, setGuideOpen] = useState(false)

  return (
    <div className="dsr-page fk-page">
      <div className="fk-page-head">
        <div className="fk-page-title">
          <h1>榜单</h1>
          <button
            type="button"
            className={`fk-guide-chip ${guideOpen ? 'on' : ''}`}
            onClick={() => setGuideOpen((value) => !value)}
            aria-expanded={guideOpen}
          >
            <Icon name={guideOpen ? 'chevron' : 'search'} size={12} />
            3 句话看懂榜单
          </button>
        </div>
      </div>

      {guideOpen ? (
        <div className="fk-guide-box">
          {GUIDE_LINES.map((line, index) => (
            <p key={line}><b>{index + 1}</b>{line}</p>
          ))}
        </div>
      ) : null}

      <div className="fk-tabs" role="tablist" aria-label="榜单页签">
        <button type="button" role="tab" aria-selected="true" className="fk-tab active">榜单</button>
      </div>

      <div className="fk-toolbar">
        <span className="fk-toolbar-item">
          <Icon name="groups" size={14} />
          {rankings.length} 个榜单
        </span>
        <span className="fk-toolbar-item">
          数据日
          <b className="fk-mono">{dataDate ?? '—'}</b>
        </span>
        {previewAt ? (
          <span className={`fk-preview-chip ${phaseLive ? 'live' : ''}`}>
            {phaseLive ? '盘中预览' : '最近快照'} · <span className="fk-mono">{formatClock(previewAt)}</span>
            {phaseLive ? ' · 不入历史' : ''}
          </span>
        ) : null}
        <span className="fk-toolbar-dim">墙面模式 · 每卡预览前 8 只</span>
        <span className={`fk-market ${phaseLive ? 'live' : ''}`}>
          <span className="fk-market-dot" />
          {phaseLabel}
        </span>
        <div className="fk-toolbar-actions">
          <button type="button" className="fk-icon-btn" aria-label="设置" title="设置" onClick={onSettings}>
            <Icon name="settings" size={15} />
          </button>
          <button type="button" className="fk-btn" onClick={onRefresh} disabled={loading || busy}>
            <Icon name="refresh" size={14} />
            刷新
          </button>
          <button type="button" className="fk-btn primary" onClick={onNew}>
            <Icon name="plus" size={14} />
            添加榜单
          </button>
        </div>
      </div>

      {error ? <div style={{ marginBottom: 12 }}><ErrorLine text={error} /></div> : null}

      {rankings.length > 0 ? (
        <div className="fk-name-strip">
          {rankings.map((ranking) => {
            const total = wall?.entries.find((item) => item.id === ranking.id)?.result?.matched
            return (
              <button
                key={ranking.id}
                type="button"
                className="fk-name-tab"
                title={`聚焦「${ranking.name}」`}
                onClick={() => onFocus(ranking.id)}
              >
                <i style={{ background: accentColor(ranking.accent) }} />
                {ranking.name}
                <span className="fk-mono">{total == null ? '-' : total}</span>
              </button>
            )
          })}
        </div>
      ) : null}

      {rankings.length === 0 ? (
        <div className="fk-empty-wall">
          <div className="fk-empty-head">
            <h2>还没有榜单</h2>
            <p>榜单是你自己定的选股规则，盘中按最新行情算出名单。先从模板一键生成，或者从空白开始搭。</p>
          </div>
          <div className="fk-template-grid">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                type="button"
                className="fk-template-card"
                style={{ '--tpl-accent': accentColor(template.accent) } as CSSProperties}
                onClick={() => onTemplate(template)}
                title={template.description}
              >
                <span className="fk-template-title">
                  <i />
                  {template.name}
                </span>
                <span className="fk-template-desc">{template.description}</span>
              </button>
            ))}
          </div>
          <button type="button" className="fk-btn primary fk-empty-action" onClick={onNew}>
            <Icon name="plus" size={14} />
            从空白开始配一个
          </button>
        </div>
      ) : (
        <div className="fk-wall-grid">
          {rankings.map((ranking) => {
            const entry = wall?.entries.find((item) => item.id === ranking.id)
            const result = entry?.result
            const accent = accentColor(ranking.accent)
            const deletePending = pendingDelete === ranking.id
            const shown = result?.rows.slice(0, 8) ?? []
            const previewResult = result ? { ...result, rows: shown } : null
            const more = result ? Math.max(0, (result.matched || 0) - shown.length) : 0

            return (
              <article key={ranking.id} className="fk-card">
                <div className="fk-card-head">
                  <span className="fk-card-accent" style={{ background: accent }} />
                  <div className="fk-card-title-box">
                    <button type="button" className="fk-card-name" title={ranking.name} onClick={() => onFocus(ranking.id)}>
                      {ranking.name}
                    </button>
                    <div className="fk-card-meta">
                      <span className="fk-card-hit">
                        <b>{result ? result.matched : '-'}</b>
                        <span>只</span>
                      </span>
                      {result ? <span className="fk-mono">{result.dataDate ?? '—'}</span> : null}
                      {loading && !result ? <Spinner /> : null}
                    </div>
                  </div>
                  <div className="fk-card-actions">
                    <button type="button" className="fk-card-action" aria-label="聚焦查看" title="聚焦查看完整名单" onClick={() => onFocus(ranking.id)}>
                      <Icon name="eye" size={14} />
                    </button>
                    <button type="button" className="fk-card-action" aria-label="编辑榜单" title="编辑配置" onClick={() => onEdit(ranking.id)}>
                      <Icon name="edit" size={14} />
                    </button>
                    <button type="button" className="fk-card-action" aria-label="复制榜单" title="复制为新榜单" onClick={() => onDuplicate(ranking.id)}>
                      <Icon name="copy" size={14} />
                    </button>
                    {deletePending ? (
                      <>
                        <button
                          type="button"
                          className="fk-card-action danger-text"
                          title="确认删除"
                          onClick={() => {
                            setPendingDelete(null)
                            onDelete(ranking.id)
                          }}
                        >
                          <Icon name="check" size={14} />
                        </button>
                        <button type="button" className="fk-card-action" title="取消删除" onClick={() => setPendingDelete(null)}>
                          <Icon name="close" size={14} />
                        </button>
                      </>
                    ) : (
                      <button type="button" className="fk-card-action danger" aria-label="删除榜单" title="删除榜单" onClick={() => setPendingDelete(ranking.id)}>
                        <Icon name="trash" size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {entry?.error ? (
                  <div className="fk-card-error">
                    <ErrorLine text={entry.error} />
                    <button type="button" className="fk-btn small" onClick={onRefresh}>重新计算</button>
                  </div>
                ) : previewResult && shown.length > 0 ? (
                  <div className="fk-card-view-body">{viewOf(ranking.view, previewResult, ranking, true)}</div>
                ) : result ? (
                  <div className="fk-card-empty">
                    当前没有股票满足这组条件。可以放宽一两个数值，或者去掉一个条件。
                    <button type="button" className="fk-btn small" onClick={() => onEdit(ranking.id)}>调整条件</button>
                  </div>
                ) : (
                  <div className="fk-card-skeleton">
                    {[88, 76, 82, 64, 72, 56].map((width, index) => (
                      <div key={index} className="dsr-skeleton" style={{ width: `${width}%` }} />
                    ))}
                  </div>
                )}

                <div className="fk-card-foot">
                  <div className="fk-card-conditions">
                    {ranking.conditions.length > 0 ? (
                      <>
                        {ranking.conditions.slice(0, 4).map((clause, index) => (
                          <button
                            key={`${clause.key}-${index}`}
                            type="button"
                            className={`fk-cond ${clause.negate ? 'negate' : ''}`}
                            title={formatCondition(clause)}
                            onClick={() => onEdit(ranking.id)}
                          >
                            {formatCondition(clause)}
                          </button>
                        ))}
                        {ranking.conditions.length > 4 ? (
                          <button type="button" className="fk-cond more" onClick={() => onEdit(ranking.id)}>
                            +{ranking.conditions.length - 4}
                          </button>
                        ) : null}
                      </>
                    ) : (
                      <span className="fk-card-nocond">没有条件（等于全市场）</span>
                    )}
                  </div>
                  <div className="fk-card-sub">
                    <span>前 {ranking.limit} 只</span>
                    <span className="fk-truncate">按{formatSort(ranking.sortKey, ranking.sortDir)}</span>
                    {more > 0 ? (
                      <button type="button" className="fk-card-more" onClick={() => onFocus(ranking.id)}>
                        还有 {more} 只 ›
                      </button>
                    ) : null}
                    <span className="fk-card-view">{viewLabel(ranking.view)}</span>
                  </div>
                </div>
              </article>
            )
          })}
          <button type="button" className="fk-new-card" onClick={onNew}>
            <Icon name="plus" size={18} />
            <span>再建一个榜单</span>
          </button>
        </div>
      )}

      {busy ? <div style={{ marginTop: 12 }}><Spinner label="正在保存…" /></div> : null}
    </div>
  )
}
