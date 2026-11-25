import type { ReactNode } from 'react'
import type { ConditionClause, ConditionValue } from '../../shared/types.ts'
import type { ConditionMeta } from '../../shared/catalog.ts'
import { BoardPicker } from './BoardPicker.tsx'
import { Icon } from './icons.tsx'

function isRange(value: ConditionValue): value is { min: number; max: number } {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function numberOf(value: ConditionValue, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (isRange(value)) return value.min
  return fallback
}

export function ConditionRow({
  clause,
  meta,
  hit,
  onChange,
  onRemove,
}: {
  clause: ConditionClause
  meta: ConditionMeta
  hit?: number | undefined
  onChange: (clause: ConditionClause) => void
  onRemove: () => void
}) {
  const value = clause.value
  const unit = meta.unit ?? ''
  const numeric = numberOf(value, typeof meta.defaultValue === 'number' ? meta.defaultValue : 0)

  function changeOp(op: string) {
    if (meta.kind !== 'number') return
    if (op === 'between') {
      onChange({ ...clause, op: 'between', value: { min: numeric, max: numeric } })
    } else {
      onChange({ ...clause, op: op === 'lte' ? 'lte' : 'gte', value: numeric })
    }
  }

  function setNumber(next: number, which?: 'min' | 'max') {
    if (isRange(value) && which) {
      onChange({ ...clause, value: { ...value, [which]: next } })
    } else {
      onChange({ ...clause, value: next })
    }
  }

  let controls: ReactNode
  if (meta.kind === 'number') {
    controls = (
      <>
        <select className="dsr-cond-op" value={clause.op} onChange={(event) => changeOp(event.target.value)}>
          <option value="gte">≥</option>
          <option value="lte">≤</option>
          <option value="between">区间</option>
        </select>
        {clause.op === 'between' && isRange(value) ? (
          <>
            <input
              className="dsr-num"
              type="number"
              step={meta.step ?? 0.01}
              min={meta.min}
              max={meta.max}
              value={value.min}
              onChange={(event) => setNumber(Number(event.target.value), 'min')}
            />
            <span className="dsr-between-sep">至</span>
            <input
              className="dsr-num"
              type="number"
              step={meta.step ?? 0.01}
              min={meta.min}
              max={meta.max}
              value={value.max}
              onChange={(event) => setNumber(Number(event.target.value), 'max')}
            />
            <span className="dsr-unit">{unit}</span>
          </>
        ) : (
          <>
            <input
              className="dsr-num"
              type="number"
              step={meta.step ?? 0.01}
              min={meta.min}
              max={meta.max}
              value={numeric}
              onChange={(event) => setNumber(Number(event.target.value))}
            />
            <span className="dsr-unit">{unit}</span>
          </>
        )}
      </>
    )
  } else if (meta.kind === 'enum') {
    const selected = Array.isArray(value) ? value : []
    controls = (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {(meta.options ?? []).map((option) => {
          const on = selected.includes(option.value)
          return (
            <button
              key={option.value}
              type="button"
              className={`dsr-col-chip ${on ? 'on' : ''}`}
              onClick={() => {
                const next = on ? selected.filter((item) => item !== option.value) : [...selected, option.value]
                onChange({ ...clause, value: next })
              }}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    )
  } else if (meta.kind === 'bool') {
    controls = (
      <div className="dsr-seg">
        <button type="button" className={value === 'yes' ? 'active' : ''} onClick={() => onChange({ ...clause, value: 'yes' })}>
          是
        </button>
        <button type="button" className={value === 'no' ? 'active' : ''} onClick={() => onChange({ ...clause, value: 'no' })}>
          否
        </button>
      </div>
    )
  } else if (meta.kind === 'text') {
    controls = (
      <input
        className="dsr-input"
        style={{ height: 30, fontSize: 11 }}
        value={typeof value === 'string' ? value : ''}
        maxLength={meta.maxLength ?? 12}
        placeholder={meta.placeholder}
        onChange={(event) => onChange({ ...clause, value: event.target.value })}
      />
    )
  } else if (meta.kind === 'time') {
    controls = (
      <input
        className="dsr-num"
        style={{ width: 112 }}
        type="time"
        value={typeof value === 'string' ? value : '10:00'}
        onChange={(event) => onChange({ ...clause, value: event.target.value })}
      />
    )
  } else {
    controls = (
      <BoardPicker
        tag={meta.boardTag ?? 'industry'}
        values={Array.isArray(value) ? value : []}
        names={clause.note ? clause.note.split('、') : []}
        onChange={(codes, names) => onChange({ ...clause, value: codes, note: names.join('、') })}
      />
    )
  }

  return (
    <div className="dsr-cond-row">
      <div className="dsr-cond-label" title={meta.hint}>
        {meta.label}
        {hit != null ? <span className={`fk-cond-hit ${hit === 0 ? 'zero' : ''}`}>{hit} 只</span> : null}
      </div>
      <div className="dsr-cond-controls">{controls}</div>
      <button
        type="button"
        className={`dsr-negate ${clause.negate ? 'on' : ''}`}
        title={clause.negate ? '当前为排除，再点一下恢复' : '把这条改成排除'}
        onClick={() => onChange({ ...clause, negate: !clause.negate })}
      >
        排除
      </button>
      <button type="button" className="dsr-remove" aria-label="移除条件" title="移除条件" onClick={onRemove}>
        <Icon name="close" size={12} />
      </button>
    </div>
  )
}
