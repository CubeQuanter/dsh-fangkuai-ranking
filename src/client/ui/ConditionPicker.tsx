import { useMemo, useState } from 'react'
import { COMMON_CONDITION_KEYS, CONDITIONS, CONDITION_GROUPS } from '../../shared/catalog.ts'
import type { ConditionMeta } from '../../shared/catalog.ts'
import { Icon } from './icons.tsx'

function kindHint(meta: ConditionMeta): string {
  if (meta.kind === 'number') return '填数字'
  if (meta.kind === 'enum') return '多选'
  if (meta.kind === 'board') return '选板块'
  if (meta.kind === 'time') return '选时间'
  if (meta.kind === 'text') return '填文字'
  return '是或否'
}

function matches(meta: ConditionMeta, search: string): boolean {
  return !search || meta.label.includes(search) || meta.key.includes(search) || (meta.hint ?? '').includes(search)
}

function PickerItems({ items, used, onPick, onClose }: {
  items: ConditionMeta[]
  used: Set<string>
  onPick: (meta: ConditionMeta) => void
  onClose: () => void
}) {
  return (
    <div className="dsr-picker-grid">
      {items.map((meta) => {
        const disabled = used.has(meta.key)
        return (
          <button
            key={meta.key}
            type="button"
            className="dsr-picker-item"
            disabled={disabled}
            title={meta.hint}
            onClick={() => {
              onPick(meta)
              onClose()
            }}
          >
            <b>{meta.label}</b>
            <small>{disabled ? '已经加过了' : kindHint(meta)}</small>
          </button>
        )
      })}
    </div>
  )
}

export function ConditionPicker({
  used,
  onPick,
  onClose,
}: {
  used: Set<string>
  onPick: (meta: ConditionMeta) => void
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [moreOpen, setMoreOpen] = useState(false)
  const search = query.trim()

  const common = useMemo(
    () => CONDITIONS.filter((meta) => COMMON_CONDITION_KEYS.includes(meta.key) && matches(meta, search)),
    [search],
  )
  const advancedGroups = useMemo(
    () =>
      CONDITION_GROUPS.map((group) => ({
        ...group,
        items: CONDITIONS.filter(
          (meta) => !COMMON_CONDITION_KEYS.includes(meta.key) && meta.group === group.id && matches(meta, search),
        ),
      })).filter((group) => group.items.length > 0),
    [search],
  )
  const advancedCount = CONDITIONS.length - COMMON_CONDITION_KEYS.length
  const advancedMatches = advancedGroups.reduce((total, group) => total + group.items.length, 0)

  return (
    <div className="dsr-picker-modal" role="dialog" aria-modal="true" aria-label="添加条件" onClick={onClose}>
      <div className="dsr-picker" onClick={(event) => event.stopPropagation()}>
        <div className="dsr-picker-head">
          <Icon name="search" size={15} />
          <h2>添加条件</h2>
          <span className="dsr-picker-count">{CONDITIONS.length} 个可用</span>
          <button type="button" className="dsr-icon-btn" aria-label="关闭" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        <div className="dsr-picker-body">
          <div className="dsr-picker-search">
            <input
              className="dsr-input"
              autoFocus
              value={query}
              placeholder="搜索条件，如：涨停、量比、行业"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          {search ? (
            <>
              {common.length + advancedMatches === 0 ? (
                <div className="dsr-hint" style={{ padding: 20, textAlign: 'center' }}>没有找到这个条件</div>
              ) : null}
              {common.length > 0 ? (
                <section className="dsr-picker-group">
                  <h3>常用条件</h3>
                  <PickerItems items={common} used={used} onPick={onPick} onClose={onClose} />
                </section>
              ) : null}
              {advancedGroups.map((group) => (
                <section key={group.id} className="dsr-picker-group">
                  <h3>{group.label}</h3>
                  <PickerItems items={group.items} used={used} onPick={onPick} onClose={onClose} />
                </section>
              ))}
            </>
          ) : (
            <>
              <section className="dsr-picker-group">
                <h3>常用条件 · 先把最有效的这几个用起来</h3>
                <PickerItems items={common} used={used} onPick={onPick} onClose={onClose} />
              </section>
              <button
                type="button"
                className="fk-picker-more"
                onClick={() => setMoreOpen((value) => !value)}
                aria-expanded={moreOpen}
              >
                <Icon name={moreOpen ? 'chevron' : 'chevron'} size={13} />
                更多条件
                <span>{advancedCount} 个</span>
                <small>{moreOpen ? '收起' : '按需展开'}</small>
              </button>
              {moreOpen
                ? advancedGroups.map((group) => (
                    <section key={group.id} className="dsr-picker-group fk-picker-advanced">
                      <h3>{group.label}</h3>
                      <PickerItems items={group.items} used={used} onPick={onPick} onClose={onClose} />
                    </section>
                  ))
                : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
