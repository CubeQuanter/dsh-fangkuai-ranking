import { useEffect, useState } from 'react'
import { accentColor, formatCondition } from '../../shared/format.ts'
import { metricMeta } from '../../shared/catalog.ts'
import type { EvaluateResult, RankingConfig } from '../../shared/types.ts'
import { Empty, ErrorLine, Spinner } from './bits.tsx'
import { boardLabel, formatClock, isTodayShanghai, marketPhase, metricDisplay } from './display.ts'
import { Icon } from './icons.tsx'
import { viewOf } from './ResultViews.tsx'

const PAGE_SIZE = 20

function exportCsv(result: EvaluateResult, config: RankingConfig) {  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`
  const header = ['名次', '名称', '代码', '市场', ...config.columns.map((key) => metricMeta(key)?.label ?? key), '状态']
  const lines = [header.map(escape).join(',')]
  for (const row of result.rows) {
    lines.push(
      [
        String(row.rank),
        row.name,
        row.ticker,
        boardLabel(row.board),
        ...config.columns.map((key) => metricDisplay(row, key)),
        row.tags.join('、'),
      ]
        .map((item) => escape(String(item)))
        .join(','),
    )
  }
  const blob = new Blob([`\ufeff${lines.join('\n')}`], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${config.name}.csv`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1200)
}

export function FocusScreen({
  config,
  result,
  loading,
  error,
  onBack,
  onEdit,
  onDuplicate,
  onDelete,
  onRemoveCondition,
  onRefresh,
}: {
  config: RankingConfig
  result: EvaluateResult | null
  loading: boolean
  error: string
  onBack: () => void
  onEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
  onRemoveCondition: (key: string) => void
  onRefresh: () => void
}) {
  const phase = marketPhase()
  const previewLive = phase.live && isTodayShanghai(result?.previewAt ?? null)
  const [page, setPage] = useState(0)
  useEffect(() => setPage(0), [config.id])
  const totalPages = result ? Math.max(1, Math.ceil(result.rows.length / PAGE_SIZE)) : 1
  const safePage = Math.min(page, totalPages - 1)
  const start = safePage * PAGE_SIZE
  const end = Math.min(start + PAGE_SIZE, result?.rows.length ?? 0)
  const pagedResult = result ? { ...result, rows: result.rows.slice(start, end) } : null
  return (
    <div className="dsr-page fk-page fk-focus-page">
      <div className="dsr-focus-head">
        <div className="fk-focus-bar">
          <button type="button" className="fk-back" onClick={onBack}>
            <Icon name="back" size={14} />
            全部榜单
          </button>
          <span className="fk-focus-accent" style={{ background: accentColor(config.accent) }} />
          <h1>{config.name}</h1>
          {config.note ? <span className="fk-focus-note">{config.note}</span> : null}
          <span className="fk-focus-hit">
            <b className="fk-mono" style={{ color: accentColor(config.accent) }}>{result ? result.matched : '—'}</b>
            <span>只</span>
          </span>
          {result ? <span className="fk-focus-date fk-mono">数据日 {result.dataDate ?? '—'}</span> : null}
          {result?.previewAt ? (
            <span className={`fk-preview-chip ${previewLive ? 'live' : ''}`}>
              {previewLive ? '盘中预览' : '最近快照'} · {formatClock(result.previewAt)}</span>
          ) : null}
          <div className="fk-focus-actions">
            <button type="button" className="fk-btn" onClick={onRefresh} disabled={loading}>
              <Icon name="refresh" size={13} />
              刷新
            </button>
            <button type="button" className="fk-btn" onClick={onEdit}>
              <Icon name="edit" size={13} />
              编辑
            </button>
            <button type="button" className="fk-btn" onClick={onDuplicate}>
              <Icon name="copy" size={13} />
              复制
            </button>
            <button
              type="button"
              className="fk-btn"
              onClick={() => result && exportCsv(result, config)}
              disabled={!result || result.rows.length === 0}
            >
              <Icon name="download" size={13} />
              导出
            </button>
            <button type="button" className="fk-btn danger" onClick={onDelete}>
              <Icon name="trash" size={13} />
              删除
            </button>
          </div>
        </div>
        <div className="dsr-conditions">
          {config.conditions.length === 0 ? (
            <span className="dsr-cond-chip">全部股票</span>
          ) : (
            <>
              <span className={`fk-logic-chip ${config.logic === 'or' ? 'or' : ''}`}>{config.logic === 'or' ? '任一满足' : '全部满足'}</span>
              {config.conditions.map((clause, index) => (
              <span key={`${clause.key}-${index}`} className={`dsr-cond-chip ${clause.negate ? 'exclude' : ''}`}>
                {clause.negate ? <Icon name="close" size={10} /> : null}
                {formatCondition(clause)}
                <button
                  type="button"
                  className="fk-cond-remove"
                  title="移除该条件"
                  onClick={() => onRemoveCondition(clause.key)}
                >
                  <Icon name="close" size={10} />
                </button>
              </span>
            ))}
            </>
          )}
        </div>
      </div>

      {error ? (
        <div style={{ marginBottom: 10 }}>
          <ErrorLine text={error} />
        </div>
      ) : null}

      <div className="dsr-result-card">
        {loading && !result ? (
          <div style={{ padding: '48px 0', display: 'flex', justifyContent: 'center' }}>
            <Spinner label="正在读取全市场行情并计算…" />
          </div>
        ) : result && result.rows.length === 0 ? (
          <Empty title="暂时没有股票满足条件" description="盘中数据会不断变化；也可以把某个数值放宽一点，或者去掉一个条件。">
            <button type="button" className="fk-btn" onClick={onEdit}>
              <Icon name="edit" size={13} />
              调整条件
            </button>
          </Empty>
        ) : result ? (
          <>
            {result.warnings.length > 0 ? (
              <div className="dsr-hint" style={{ marginBottom: 9 }}>{result.warnings.join('；')}</div>
            ) : null}
            {pagedResult ? viewOf(config.view, pagedResult, config) : null}
            <div className="fk-result-foot">
              <span>共 {result.matched} 只入选，本页 {start + 1}-{end} 只</span>
              {totalPages > 1 ? (
                <span className="fk-pager">
                  <button type="button" className="fk-page-btn" disabled={safePage === 0} onClick={() => setPage((value) => Math.max(0, value - 1))}>
                    上一页
                  </button>
                  <span className="fk-mono">{safePage + 1} / {totalPages}</span>
                  <button type="button" className="fk-page-btn" disabled={safePage >= totalPages - 1} onClick={() => setPage((value) => Math.min(totalPages - 1, value + 1))}>
                    下一页
                  </button>
                </span>
              ) : null}
              <span className="fk-mono">数据日 {result.dataDate ?? '—'}{result.previewAt ? ` · 快照 ${formatClock(result.previewAt)}` : ''}</span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
