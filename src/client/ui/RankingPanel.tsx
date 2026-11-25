import { useCallback, useEffect, useState } from 'react'
import { draftFromTemplate, baseDraft } from '../../shared/catalog.ts'
import type { TemplateMeta } from '../../shared/catalog.ts'
import type { BootstrapData, EvaluateResult, RankingConfig, RankingDraft, WallData } from '../../shared/types.ts'
import { api, UiError } from '../api.ts'
import { EditorScreen } from './EditorScreen.tsx'
import { FocusScreen } from './FocusScreen.tsx'
import { SetupScreen } from './SetupScreen.tsx'
import { SettingsScreen } from './SettingsScreen.tsx'
import { WallScreen } from './WallScreen.tsx'
import { isTodayShanghai, marketPhase } from './display.ts'
import { ErrorLine, Spinner } from './bits.tsx'
import { STYLES } from './styles.ts'

type Screen = 'wall' | 'focus' | 'settings' | 'editor'

interface EditorState {
  id?: string
  draft: RankingDraft
}

function draftOfConfig(config: RankingConfig): RankingDraft {
  return {
    name: config.name,
    note: config.note,
    accent: config.accent,
    logic: config.logic,
    conditions: config.conditions,
    sortKey: config.sortKey,
    sortDir: config.sortDir,
    limit: config.limit,
    view: config.view,
    columns: config.columns,
    groupBy: config.groupBy,
  }
}

export function RankingPanel() {
  const [boot, setBoot] = useState<BootstrapData | null>(null)
  const [bootError, setBootError] = useState('')
  const [bootLoading, setBootLoading] = useState(false)
  const [wall, setWall] = useState<WallData | null>(null)
  const [wallLoading, setWallLoading] = useState(false)
  const [wallError, setWallError] = useState('')
  const [screen, setScreen] = useState<Screen>('wall')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [focusResult, setFocusResult] = useState<EvaluateResult | null>(null)
  const [focusLoading, setFocusLoading] = useState(false)
  const [focusError, setFocusError] = useState('')
  const [editor, setEditor] = useState<EditorState | null>(null)
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (screen === 'editor') return
      if (screen === 'settings') setScreen('wall')
      else if (screen === 'focus') setScreen('wall')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [screen])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2400)
    return () => window.clearTimeout(timer)
  }, [toast])

  const loadBoot = useCallback(async (): Promise<BootstrapData | null> => {
    setBootLoading(true)
    setBootError('')
    try {
      const data = await api.bootstrap()
      setBoot(data)
      return data
    } catch (issue) {
      setBootError(issue instanceof UiError ? issue.message : '本地服务暂时不可用')
      return null
    } finally {
      setBootLoading(false)
    }
  }, [])

  const loadWall = useCallback(async (force: boolean) => {
    setWallLoading(true)
    setWallError('')
    try {
      const data = await api.wall(undefined, force)
      setWall(data)
    } catch (issue) {
      setWallError(issue instanceof UiError ? issue.message : '榜单暂时算不出来')
    } finally {
      setWallLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadBoot().then((data) => {
      if (data?.connection.configured) void loadWall(false)
    })
  }, [loadBoot, loadWall])

  async function openFocus(id: string) {
    const existing = boot?.rankings.find((item) => item.id === id)
    if (!existing) return
    setActiveId(id)
    setScreen('focus')
    const cached = wall?.entries.find((entry) => entry.id === id)?.result ?? null
    setFocusResult(cached)
    setFocusLoading(true)
    setFocusError('')
    try {
      const result = await api.evaluate(id, false)
      setFocusResult(result)
      setWall((current) =>
        current
          ? {
              ...current,
              entries: current.entries.map((entry) => (entry.id === id ? { ...entry, result } : entry)),
            }
          : current,
      )
    } catch (issue) {
      setFocusError(issue instanceof UiError ? issue.message : '这个榜单暂时算不出来')
    } finally {
      setFocusLoading(false)
    }
  }

  async function refreshFocus(force: boolean) {
    if (!activeId) return
    setFocusLoading(true)
    setFocusError('')
    try {
      const result = await api.evaluate(activeId, force)
      setFocusResult(result)
      setWall((current) =>
        current
          ? { ...current, entries: current.entries.map((entry) => (entry.id === activeId ? { ...entry, result } : entry)) }
          : current,
      )
    } catch (issue) {
      setFocusError(issue instanceof UiError ? issue.message : '这个榜单暂时算不出来')
    } finally {
      setFocusLoading(false)
    }
  }

  function startNew(template?: TemplateMeta) {
    const draft = template ? draftFromTemplate(template) : baseDraft()
    setEditor({ draft })
    setScreen('editor')
  }

  function editRanking(id: string) {
    const config = boot?.rankings.find((item) => item.id === id)
    if (!config) return
    setEditor({ id, draft: draftOfConfig(config) })
    setScreen('editor')
  }

  async function afterSaved(config: RankingConfig, created: boolean) {
    setEditor(null)
    setScreen('wall')
    setToast(created ? `已创建「${config.name}」` : '榜单已保存')
    const data = await loadBoot()
    if (data?.connection.configured) void loadWall(false)
  }

  async function removeRanking(id: string) {
    setBusy(true)
    try {
      await api.remove(id)
      setToast('榜单已删除')
      if (screen === 'focus' && activeId === id) {
        setScreen('wall')
        setActiveId(null)
      }
      const data = await loadBoot()
      if (data?.connection.configured) void loadWall(false)
    } catch (issue) {
      setToast(issue instanceof UiError ? issue.message : '删除没有成功')
    } finally {
      setBusy(false)
    }
  }

  async function duplicateRanking(id: string) {
    const config = boot?.rankings.find((item) => item.id === id)
    if (!config) return
    setBusy(true)
    try {
      const draft = draftOfConfig(config)
      const copy = await api.create({ ...draft, name: `${config.name} 副本` })
      setToast(`已复制为「${copy.name}」`)
      const data = await loadBoot()
      if (data?.connection.configured) void loadWall(false)
    } catch (issue) {
      setToast(issue instanceof UiError ? issue.message : '复制没有成功')
    } finally {
      setBusy(false)
    }
  }

  async function removeCondition(key: string) {
    const config = boot?.rankings.find((item) => item.id === activeId)
    if (!config) return
    if (config.conditions.length <= 1) {
      setToast('至少保留一个条件，要清空请在编辑里重建')
      return
    }
    try {
      const updated = await api.update(config.id, {
        conditions: config.conditions.filter((clause) => clause.key !== key),
      })
      setBoot((current) =>
        current ? { ...current, rankings: current.rankings.map((item) => (item.id === config.id ? updated : item)) } : current,
      )
      setFocusResult((current) => (current ? { ...current, ranking: updated } : current))
      setToast('已移除这个条件')
      void refreshFocus(false)
    } catch (issue) {
      setToast(issue instanceof UiError ? issue.message : '条件没有保存成功')
    }
  }

  async function onConnected(message: string) {
    setToast(message)
    setScreen('wall')
    const data = await loadBoot()
    if (data?.connection.configured) void loadWall(false)
  }

  async function onSettingsChanged(message: string) {
    setToast(message)
    const data = await loadBoot()
    if (!data?.connection.configured) {
      setScreen('wall')
      setWall(null)
    } else if (screen === 'settings') {
      setScreen('wall')
      void loadWall(false)
    }
  }

  const activeConfig = boot?.rankings.find((item) => item.id === activeId) ?? null
  const phase = marketPhase()
  const dataDate = wall?.dataDate ?? null
  const previewAt = wall?.previewAt ?? null

  useEffect(() => {
    document.querySelector('.dsr-main')?.scrollTo({ top: 0 })
    window.scrollTo({ top: 0 })
  }, [screen, activeId])

  return (
    <div className="dsr-panel" aria-label="方块榜单">
      <style>{STYLES}</style>
      {toast ? <div className="dsr-toast dsr-toast-float">{toast}</div> : null}

      <div className="dsr-main">
        {!boot ? (
          <div className="dsr-page narrow">
            {bootError ? <ErrorLine text={bootError} /> : <div style={{ padding: 60, textAlign: 'center' }}><Spinner label="正在准备榜单…" /></div>}
            {bootError ? (
              <div style={{ marginTop: 14, textAlign: 'center' }}>
                <button type="button" className="dsr-btn" onClick={() => void loadBoot()}>
                  重新加载
                </button>
              </div>
            ) : null}
          </div>
        ) : !boot.connection.configured ? (
          <SetupScreen onConnected={(message) => void onConnected(message)} writable={boot.connection.writable} />
        ) : screen === 'editor' && editor ? (
          <EditorScreen
            {...(editor.id ? { id: editor.id } : {})}
            initial={editor.draft}
            historyReady={wall?.historyReady ?? false}
            onCancel={() => {
              setEditor(null)
              setScreen('wall')
            }}
            onSaved={(config, created) => void afterSaved(config, created)}
          />
        ) : screen === 'settings' ? (
          <SettingsScreen
            connection={boot.connection}
            sources={boot.sources}
            basic={boot.basic}
            onBack={() => setScreen('wall')}
            onChanged={(message) => void onSettingsChanged(message)}
          />
        ) : screen === 'focus' && activeConfig ? (
          <FocusScreen
            config={activeConfig}
            result={focusResult}
            loading={focusLoading}
            error={focusError}
            onBack={() => setScreen('wall')}
            onEdit={() => editRanking(activeConfig.id)}
            onDuplicate={() => void duplicateRanking(activeConfig.id)}
            onDelete={() => void removeRanking(activeConfig.id)}
            onRemoveCondition={(key) => void removeCondition(key)}
            onRefresh={() => void refreshFocus(true)}
          />
        ) : (
          <WallScreen
            rankings={boot.rankings}
            wall={wall}
            loading={wallLoading || bootLoading}
            error={wallError}
            busy={busy}
            phaseLabel={phase.label}
            phaseLive={phase.live && isTodayShanghai(previewAt)}
            dataDate={dataDate}
            previewAt={previewAt}
            onFocus={(id) => void openFocus(id)}
            onEdit={editRanking}
            onDuplicate={(id) => void duplicateRanking(id)}
            onDelete={(id) => void removeRanking(id)}
            onNew={() => startNew()}
            onRefresh={() => void loadWall(true)}
            onSettings={() => setScreen('settings')}
            onTemplate={(template) => startNew(template)}
          />
        )}
      </div>
    </div>
  )
}

