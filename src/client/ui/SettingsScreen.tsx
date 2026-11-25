import { useEffect, useState } from 'react'
import type { BasicHistoryStatus, ConnectionInfo, DataSourceInfo } from '../../shared/types.ts'
import { PLUGIN_VERSION } from '../../shared/version.ts'
import { api, UiError } from '../api.ts'
import { ErrorLine } from './bits.tsx'
import { Icon } from './icons.tsx'

function sourceLabel(info: ConnectionInfo): string {
  if (info.source === 'env') return '由本机设置提供'
  if (info.source === 'file') return '保存在本机安全位置'
  return '保存在本机'
}

export function SettingsScreen({
  connection,
  sources,
  basic,
  onBack,
  onChanged,
}: {
  connection: ConnectionInfo
  sources: DataSourceInfo[]
  basic: BasicHistoryStatus
  onBack: () => void
  onChanged: (message: string) => void
}) {
  const [editing, setEditing] = useState(!connection.configured)
  const [key, setKey] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [confirmRemove, setConfirmRemove] = useState(false)
  const [basicState, setBasicState] = useState(basic)
  const [basicBusy, setBasicBusy] = useState(false)
  const [basicError, setBasicError] = useState('')

  useEffect(() => {
    setBasicState(basic)
  }, [basic])

  useEffect(() => {
    if (basicState.status !== 'running') return undefined
    const timer = setInterval(() => {
      void api.basicStatus()
        .then((next) => setBasicState(next))
        .catch(() => undefined)
    }, 2000)
    return () => clearInterval(timer)
  }, [basicState.status])

  async function startBasic() {
    if (basicBusy || basicState.status === 'running') return
    setBasicBusy(true)
    setBasicError('')
    try {
      const next = await api.initializeBasic(basicState.status === 'ready')
      setBasicState(next)
    } catch (issue) {
      setBasicError(issue instanceof UiError ? issue.message : '初始化没有启动，请稍后再试')
    } finally {
      setBasicBusy(false)
    }
  }

  const basicPercent = basicState.total > 0 ? Math.min(100, Math.round((basicState.done / basicState.total) * 100)) : 0
  const basicLabel =
    basicState.status === 'running'
      ? '初始化中'
      : basicState.status === 'ready'
        ? '已就绪'
        : basicState.status === 'error'
          ? '需要重试'
          : '待初始化'
  const effectiveSources = sources.map((source) =>
    source.key === 'basic'
      ? {
          ...source,
          status:
            basicState.status === 'ready'
              ? ('ready' as const)
              : basicState.status === 'running'
                ? ('running' as const)
                : ('pending' as const),
        }
      : source,
  )

  async function save() {
    if (busy) return
    if (key.trim().length < 8) {
      setError('请完整粘贴访问密钥')
      return
    }
    setBusy(true)
    setError('')
    try {
      await api.saveKey(key.trim())
      setKey('')
      setEditing(false)
      onChanged('访问密钥已更新')
    } catch (issue) {
      setError(issue instanceof UiError ? issue.message : '保存没有成功，请稍后再试')
    } finally {
      setBusy(false)
    }
  }

  async function remove() {
    setBusy(true)
    setError('')
    try {
      await api.removeKey()
      setConfirmRemove(false)
      onChanged('访问密钥已移除')
    } catch (issue) {
      setError(issue instanceof UiError ? issue.message : '移除没有成功，请稍后再试')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="dsr-page narrow">
      <div className="dsr-focus-head" style={{ marginBottom: 12 }}>
        <div className="fk-focus-bar">
          <button type="button" className="fk-back" aria-label="返回" title="返回" onClick={onBack}>
            <Icon name="back" size={14} />
            全部榜单
          </button>
          <h1>设置</h1>
          <span className="fk-focus-date">数据账户、计算范围和使用说明</span>
        </div>
      </div>

      <div className="dsr-settings">
        <section className="dsr-settings-block">
          <div className="dsr-settings-head">
            <Icon name="key" size={15} />
            <h2>数据账户</h2>
            <span className={`dsr-chip ${connection.configured ? '' : 'live'}`}>
              {connection.configured ? <span className="dsr-status-dot" style={{ background: '#35b37e' }} /> : null}
              {connection.configured ? '已连接' : '未连接'}
            </span>
          </div>
          <div className="dsr-settings-body">
            <div className="dsr-setting-row">
              <span className="dsr-label">当前状态</span>
              <span className="dsr-setting-value">
                {connection.configured ? `${sourceLabel(connection)}${connection.masked ? ` · ${connection.masked}` : ''}` : '还没有配置访问密钥'}
              </span>
            </div>

            {editing ? (
              <div className="dsr-key-form">
                <label className="dsr-label" htmlFor="settings-key">访问密钥</label>
                <div className="dsr-key-row">
                  <input
                    id="settings-key"
                    className="dsr-input"
                    type={show ? 'text' : 'password'}
                    value={key}
                    placeholder="粘贴新的访问密钥"
                    autoComplete="off"
                    spellCheck={false}
                    onChange={(event) => setKey(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') void save()
                    }}
                  />
                  <button
                    type="button"
                    className="dsr-eye"
                    aria-label={show ? '隐藏密钥' : '显示密钥'}
                    title={show ? '隐藏密钥' : '显示密钥'}
                    onClick={() => setShow((value) => !value)}
                  >
                    <Icon name={show ? 'eye-off' : 'eye'} size={15} />
                  </button>
                </div>
                <span className="dsr-hint">更换后会先验证，通过才保存；旧密钥随即失效。</span>
                <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
                  <button type="button" className="dsr-btn primary" onClick={() => void save()} disabled={busy || !connection.writable}>
                    {busy ? <span className="dsr-spinner" /> : null}
                    验证并保存
                  </button>
                  {connection.configured ? (
                    <button
                      type="button"
                      className="dsr-btn"
                      onClick={() => {
                        setEditing(false)
                        setKey('')
                        setError('')
                      }}
                    >
                      取消
                    </button>
                  ) : null}
                </div>
                {!connection.writable ? (
                  <span className="dsr-hint">当前环境不支持在界面里保存，请改用本机环境变量提供。</span>
                ) : null}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button type="button" className="dsr-btn" onClick={() => setEditing(true)}>
                  更换密钥
                </button>
                {confirmRemove ? (
                  <>
                    <button type="button" className="dsr-btn danger" onClick={() => void remove()} disabled={busy}>
                      确认移除
                    </button>
                    <button type="button" className="dsr-btn" onClick={() => setConfirmRemove(false)}>取消</button>
                  </>
                ) : (
                  <button type="button" className="dsr-btn quiet" onClick={() => setConfirmRemove(true)}>
                    移除密钥
                  </button>
                )}
              </div>
            )}

            {error ? <ErrorLine text={error} /> : null}
          </div>
        </section>

        <section className="dsr-settings-block">
          <div className="dsr-settings-head">
            <Icon name="list" size={15} />
            <h2>数据来源</h2>
            <span className="dsr-chip">{effectiveSources.filter((source) => source.status === 'ready').length} 路已就绪</span>
          </div>
          <div className="dsr-settings-body">
            <div className="fk-source-list">
              {effectiveSources.map((source) => (
                <div key={source.key} className="fk-source-row">
                  <span className={`fk-source-dot ${source.status}`} />
                  <div>
                    <b>{source.name}</b>
                    <span>{source.role}</span>
                  </div>
                  <span className={`fk-source-state ${source.status}`}>
                    {source.status === 'ready'
                      ? '已就绪'
                      : source.status === 'need_key'
                        ? '待填密钥'
                        : source.status === 'running'
                          ? '初始化中'
                          : '待初始化'}
                  </span>
                </div>
              ))}
            </div>
            <span className="dsr-hint">基础数据全部来自免费公开行情；扶摇密钥只用于实时快照和热榜，不需要额外数据服务。</span>
          </div>
        </section>

        <section className="dsr-settings-block">
          <div className="dsr-settings-head">
            <Icon name="bars" size={15} />
            <h2>基础数据</h2>
            <span className={`dsr-chip ${basicState.status === 'ready' ? '' : 'live'}`}>
              {basicState.status === 'ready' ? <span className="dsr-status-dot" style={{ background: '#35b37e' }} /> : null}
              {basicLabel}
            </span>
          </div>
          <div className="dsr-settings-body">
            <div className="dsr-setting-row">
              <span className="dsr-label">覆盖范围</span>
              <span className="dsr-setting-value">
                {basicState.coverage > 0
                  ? `${basicState.coverage} 只股票${basicState.failed > 0 ? `（${basicState.failed} 只没取到）` : ''} · 近 6 个月日 K`
                  : '还没有回补历史，60 日条件暂时不可用'}
              </span>
            </div>
            <div className="dsr-setting-row">
              <span className="dsr-label">数据日</span>
              <span className="dsr-setting-value">{basicState.asOf ?? '等待初始化'}</span>
            </div>
            {basicState.status === 'running' ? (
              <div className="dsr-basic-progress">
                <div className="dsr-basic-track">
                  <div className="dsr-basic-fill" style={{ width: `${basicPercent}%` }} />
                </div>
                <span>
                  {basicState.done} / {basicState.total} 只 · {basicPercent}%
                  {basicState.failed > 0 ? ` · ${basicState.failed} 只没取到` : ''}
                </span>
              </div>
            ) : null}
            {basicState.message && basicState.status !== 'running' ? (
              <span className="dsr-hint">{basicState.message}</span>
            ) : null}
            <span className="dsr-hint">
              第一次安装点一次即可。插件会用免费公开行情回补近 6 个月，统计结果只存在你自己的电脑里；以后每天点一次「重新同步最近 6 个月」，60 日窗口就会跟着走。
            </span>
            <div style={{ display: 'flex', gap: 8, marginTop: 2, flexWrap: 'wrap' }}>
              <button
                type="button"
                className="dsr-btn primary"
                onClick={() => void startBasic()}
                disabled={basicBusy || basicState.status === 'running' || !connection.configured}
              >
                {basicBusy || basicState.status === 'running' ? <span className="dsr-spinner" /> : null}
                {basicState.status === 'running'
                  ? '正在初始化'
                  : basicState.status === 'ready'
                    ? '重新同步最近 6 个月'
                    : basicState.status === 'error'
                      ? '重新初始化'
                      : '初始化基础数据'}
              </button>
            </div>
            {!connection.configured ? <span className="dsr-hint">需要先配置扶摇密钥，插件才能拿到全市场股票名单。</span> : null}
            {basicError ? <ErrorLine text={basicError} /> : null}
          </div>
        </section>

        <section className="dsr-settings-block">
          <div className="dsr-settings-head">
            <Icon name="bars" size={15} />
            <h2>计算范围</h2>
          </div>
          <div className="dsr-settings-body">
            <div className="dsr-facts">
              <div className="dsr-fact">
                <b>扶摇数据服务</b>
                <span>全市场现价、成交、涨停池和热榜，需要你自己的访问密钥。</span>
              </div>
              <div className="dsr-fact">
                <b>东方财富公开行情</b>
                <span>补充行业、市盈率、市净率、换手率和总/流通市值，不需要密钥。</span>
              </div>
              <div className="dsr-fact">
                <b>盘中预览</b>
                <span>盘中只把快照叠在最近完整交易日上，顶部会标「盘中预览」；不推进数据日，也不写入榜单历史。</span>
              </div>
              <div className="dsr-fact">
                <b>近 6 个月基础历史</b>
                <span>第一次初始化回补约 120 个交易日的公开日 K，用来算 60 日涨跌停、最高连板、RSI、KDJ、BOLL 和 CCI。</span>
              </div>
              <div className="dsr-fact">
                <b>近 10 个交易日</b>
                <span>五日、十日涨幅和量比只用这段窗口，第一次计算会多等几秒。</span>
              </div>
            </div>
          </div>
        </section>

        <section className="dsr-settings-block">
          <div className="dsr-settings-head">
            <Icon name="settings" size={15} />
            <h2>关于</h2>
            <span className="dsr-chip">版本 {PLUGIN_VERSION}</span>
          </div>
          <div className="dsr-settings-body">
            <div className="dsr-setting-row">
              <span className="dsr-label">数据来源</span>
              <span className="dsr-setting-value">扶摇（需密钥）+ 新浪、腾讯、东方财富公开行情（免密钥）</span>
            </div>
            <div className="dsr-setting-row">
              <span className="dsr-label">数据去向</span>
              <span className="dsr-setting-value">只在本机查询和计算，不上传榜单、自选或筛选条件</span>
            </div>
            <div className="dsr-setting-row">
              <span className="dsr-label">本机文件</span>
              <span className="dsr-setting-value">榜单保存在本机；移除密钥不会删除已有榜单</span>
            </div>
            <div className="dsr-danger-zone">
              <span className="dsr-muted">模型也能读写这些榜单，方便你用一句话调整条件。</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
