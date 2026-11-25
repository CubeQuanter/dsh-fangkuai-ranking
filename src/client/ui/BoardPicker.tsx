import { useEffect, useRef, useState } from 'react'
import { boardTagLabel } from '../../shared/catalog.ts'
import type { BoardInfo, BoardTag } from '../../shared/types.ts'
import { api, UiError } from '../api.ts'
import { Icon } from './icons.tsx'

const cache = new Map<string, BoardInfo[]>()
const inflight = new Map<string, Promise<BoardInfo[]>>()

async function loadBoards(tag: BoardTag): Promise<BoardInfo[]> {
  const cached = cache.get(tag)
  if (cached) return cached
  const running = inflight.get(tag)
  if (running) return running
  const promise = api.boards(tag).then((items) => {
    cache.set(tag, items)
    inflight.delete(tag)
    return items
  })
  inflight.set(tag, promise)
  return promise
}

export function BoardPicker({
  tag,
  values,
  names,
  onChange,
}: {
  tag: BoardTag
  values: string[]
  names: string[]
  onChange: (codes: string[], names: string[]) => void
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [boards, setBoards] = useState<BoardInfo[]>(cache.get(tag) ?? [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [open])

  useEffect(() => {
    if (!open || boards.length > 0) return
    setLoading(true)
    setError('')
    loadBoards(tag)
      .then((items) => setBoards(items))
      .catch((issue) => setError(issue instanceof UiError ? issue.message : '板块列表暂时不可用'))
      .finally(() => setLoading(false))
  }, [open, tag, boards.length])

  const selected = new Set(values)
  const filtered = query.trim()
    ? boards.filter((item) => item.name.includes(query.trim()) || item.code.includes(query.trim()))
    : boards

  function toggle(board: BoardInfo) {
    const next = new Set(selected)
    if (next.has(board.code)) next.delete(board.code)
    else if (next.size < 5) next.add(board.code)
    const nextBoards = boards.filter((item) => next.has(item.code))
    const nextNames = nextBoards.map((item) => item.name)
    onChange([...next], nextNames)
  }

  const label = names.length > 0 ? names.join('、') : `选择${boardTagLabel(tag)}`

  return (
    <div className="dsr-popover" ref={root}>
      <button
        type="button"
        className="dsr-board-trigger"
        title={label}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <Icon name="chevron" size={11} style={{ marginLeft: 4, verticalAlign: -2 }} />
      </button>
      {open ? (
        <div className="dsr-popover-panel">
          <div className="dsr-pop-search">
            <input
              className="dsr-input"
              value={query}
              autoFocus
              placeholder={`搜索${boardTagLabel(tag)}名称`}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="dsr-pop-list">
            {loading ? (
              <div style={{ padding: 14, textAlign: 'center' }} className="dsr-hint">正在读取板块…</div>
            ) : error ? (
              <div style={{ padding: 10 }} className="dsr-hint">板块列表暂时不可用</div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: 14, textAlign: 'center' }} className="dsr-hint">没有找到这个板块</div>
            ) : (
              filtered.slice(0, 200).map((board) => {
                const isSelected = selected.has(board.code)
                const disabled = !isSelected && selected.size >= 5
                return (
                  <button
                    key={board.code}
                    type="button"
                    className={`dsr-pop-item ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                    disabled={disabled}
                    onClick={() => toggle(board)}
                  >
                    <span className="dsr-check">{isSelected ? <Icon name="check" size={9} /> : null}</span>
                    <span>{board.name}</span>
                    {board.count ? <small>{board.count} 只</small> : null}
                  </button>
                )
              })
            )}
          </div>
          <div className="dsr-pop-foot">
            <span className="dsr-hint">已选 {selected.size} / 5</span>
            <button type="button" className="dsr-btn small" onClick={() => setOpen(false)}>
              完成
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
