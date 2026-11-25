import { metricMeta } from '../../shared/catalog.ts'
import { accentColor } from '../../shared/format.ts'
import type { ColumnKey, EvaluateResult, RankingConfig, ResultRow } from '../../shared/types.ts'
import { Pct, Rank, StockName } from './bits.tsx'
import { groupKey, groupOrder, metricDisplay, metricOfRow, pctClass } from './display.ts'
import { Sparkline } from './Sparkline.tsx'
import { Icon } from './icons.tsx'

const signedColumns = new Set<ColumnKey>(['pct', 'pct5', 'pct10', 'gap', 'ma5dev'])

function labelOf(key: ColumnKey): string {
  return metricMeta(key)?.label ?? key
}

function MetricCell({ row, column }: { row: ResultRow; column: ColumnKey }) {
  if (signedColumns.has(column)) return <Pct value={metricOfRow(row, column)} />
  return <span>{metricDisplay(row, column)}</span>
}

export function ListView({ result, config, compact = false }: { result: EvaluateResult; config: RankingConfig; compact?: boolean }) {
  const extraColumns = config.columns.filter(
    (column) => column !== 'price' && column !== 'pct' && column !== 'boardCount',
  )
  if (compact) {
    return (
      <div className="dsr-table-wrap fk-preview-table">
        <table className="dsr-table">
          <thead>
            <tr>
              <th>#</th>
              <th>名称</th>
              <th>涨跌幅</th>
              <th>{labelOf(config.sortKey)}</th>
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row) => (
              <tr key={row.thscode}>
                <td className="fk-cell-rank">
                  <span className={`fk-rank-badge ${row.rank <= 3 ? `podium-${row.rank}` : ''}`}>{row.rank}</span>
                </td>
                <td className="fk-cell-name">
                  <span className="fk-preview-name">{row.name}</span>
                  <span className="fk-code fk-mono">{row.ticker}</span>
                </td>
                <td><Pct value={row.pct} /></td>
                <td className="fk-mono">{metricDisplay(row, config.sortKey)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <div className="dsr-table-wrap">
      <table className="dsr-table">
        <thead>
          <tr>
            <th>#</th>
            <th>代码</th>
            <th>名称</th>
            <th>行业</th>
            <th>收盘</th>
            <th>涨跌幅</th>
            <th>连板</th>
            {extraColumns.map((column) => (
              <th key={column}>{labelOf(column)}</th>
            ))}
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          {result.rows.map((row) => (
            <tr key={row.thscode}>
              <td className="fk-cell-rank">
                <span className={`fk-rank-badge ${row.rank <= 3 ? `podium-${row.rank}` : ''}`}>{row.rank}</span>
              </td>
              <td className="fk-cell-code"><span className="fk-code fk-mono">{row.ticker}</span></td>
              <td className="fk-cell-name">
                <span className="fk-name">{row.name}</span>
                {row.limitUp ? <span className="dsr-tag tag-up">涨停</span> : row.broken ? <span className="dsr-tag tag-burst">炸板</span> : null}
              </td>
              <td className="fk-cell-industry" title={row.industry ?? ''}>{row.industry ?? '—'}</td>
              <td className="fk-mono">{metricDisplay(row, 'price')}</td>
              <td><Pct value={row.pct} /></td>
              <td className="fk-mono">{row.boardCount ? `${row.boardCount}板` : '—'}</td>
              {extraColumns.map((column) => (
                <td key={column}><MetricCell row={row} column={column} /></td>
              ))}
              <td className="fk-cell-tags">
                {row.tags.length > 0
                  ? row.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="dsr-tag">
                        {tag}
                      </span>
                    ))
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function CardsView({ result, config }: { result: EvaluateResult; config: RankingConfig }) {
  return (
    <div className="dsr-cards-grid">
      {result.rows.map((row) => (
        <article key={row.thscode} className="dsr-stock-card">
          <div className="dsr-stock-card-head">
            <Rank value={row.rank} />
            <div style={{ minWidth: 0 }}>
              <b title={row.name}>{row.name}</b>
              <span className="dsr-code">{row.ticker}</span>
            </div>
            <Pct value={row.pct} />
          </div>
          <Sparkline row={row} />
          <div className="dsr-metrics">
            {config.columns.filter((column) => column !== 'pct').map((column) => (
              <span key={column} className="dsr-metric">
                {metricMeta(column)?.short ?? column}
                <strong><MetricCell row={row} column={column} /></strong>
              </span>
            ))}
          </div>
          {row.tags.length > 0 ? (
            <div className="dsr-stock-tags">
              {row.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="dsr-tag">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  )
}

export function PodiumView({ result, config }: { result: EvaluateResult; config: RankingConfig }) {
  const values = result.rows.map((row) => metricOfRow(row, config.sortKey) ?? 0)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || Math.abs(max) || 1
  const accent = accentColor(config.accent)
  const top = result.rows.slice(0, 3)

  return (
    <>
      <div className="dsr-podium">
        {top.map((row) => (
          <article key={row.thscode} className={`dsr-podium-card podium-${row.rank}`}>
            <span className="dsr-podium-rank">{row.rank}</span>
            <b title={row.name}>{row.name}</b>
            <span className="dsr-code">{row.ticker}</span>
            <Pct value={row.pct} />
            <span className="dsr-podium-value">{metricDisplay(row, config.sortKey)}</span>
          </article>
        ))}
      </div>
      <div className="dsr-bars">
        {result.rows.map((row) => {
          const value = metricOfRow(row, config.sortKey) ?? 0
          const width = Math.max(3, ((value - min) / span) * 100)
          const tone = pctClass(row.pct) === 'down' ? '#35b37e' : accent
          const fill = `color-mix(in srgb, ${tone} 82%, transparent)`
          const track = 'color-mix(in srgb, var(--dsr-text) 6%, transparent)'
          return (
            <div key={row.thscode} className="dsr-bar-row">
              <Rank value={row.rank} />
              <div className="dsr-bar-label">
                <b title={row.name}>{row.name}</b>
                <span className="dsr-code">{row.ticker}</span>
              </div>
              <div
                className="dsr-bar-track"
                style={{
                  background: `linear-gradient(90deg, ${fill} 0%, ${fill} ${width}%, ${track} ${width}%, ${track} 100%)`,
                }}
              />
              <span className="dsr-bar-value">
                {metricDisplay(row, config.sortKey)}
                {config.sortKey !== 'pct' ? (
                  <span style={{ marginLeft: 6 }}>
                    <Pct value={row.pct} />
                  </span>
                ) : null}
              </span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export function GroupsView({ result, config, compact = false }: { result: EvaluateResult; config: RankingConfig; compact?: boolean }) {
  const buckets = new Map<string, ResultRow[]>()
  for (const row of result.rows) {
    const key = groupKey(row, config.groupBy)
    const list = buckets.get(key)
    if (list) list.push(row)
    else buckets.set(key, [row])
  }
  const allKeys = [...buckets.keys()].sort((a, b) => groupOrder(a, config.groupBy) - groupOrder(b, config.groupBy))
  const keys = compact ? allKeys.slice(0, 3) : allKeys

  return (
    <div className="dsr-groups">
      {keys.map((key) => {
        const rows = (buckets.get(key) ?? []).slice(0, compact ? 3 : undefined)
        return (
          <section key={key} className="dsr-group">
            <div className="dsr-group-head">
              <Icon name="groups" size={13} />
              <h3>{key}</h3>
              <span className="dsr-muted">{rows.length} 只</span>
            </div>
            <div className="dsr-group-rows">
              {rows.map((row) => (
                <div key={row.thscode} className="dsr-group-row">
                  <Rank value={row.rank} />
                  <StockName name={row.name} ticker={row.ticker} />
                  <Pct value={row.pct} />
                  <span className="dsr-bar-value">{metricDisplay(row, config.sortKey)}</span>
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export function ChipView({ result, config }: { result: EvaluateResult; config: RankingConfig }) {
  return (
    <div className="dsr-chip-wall">
      {result.rows.map((row) => (
        <div
          key={row.thscode}
          className={`dsr-chip-stock ${pctClass(row.pct)}`}
          title={`${row.name} ${row.ticker} ${metricDisplay(row, 'pct')}`}
        >
          <span className="dsr-chip-rank">{row.rank}</span>
          <b>{row.name}</b>
          <span className="dsr-chip-code">{row.ticker}</span>
          <Pct value={row.pct} />
          {row.limitUp || row.broken || row.limitDown ? (
            <span className="dsr-chip-badge">{row.limitUp ? '涨停' : row.broken ? '炸板' : '跌停'}</span>
          ) : null}
          {config.sortKey !== 'pct' ? <span className="dsr-chip-value">{metricDisplay(row, config.sortKey)}</span> : null}
        </div>
      ))}
    </div>
  )
}

export function viewOf(value: string, result: EvaluateResult, config: RankingConfig, compact = false) {
  if (value === 'card') return <CardsView result={result} config={config} />
  if (value === 'podium') return <PodiumView result={result} config={config} />
  if (value === 'group') return <GroupsView result={result} config={config} compact={compact} />
  if (value === 'chip') return <ChipView result={result} config={config} />
  return <ListView result={result} config={config} compact={compact} />
}
