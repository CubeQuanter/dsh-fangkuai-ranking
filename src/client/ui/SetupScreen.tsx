import { useState } from 'react'
import { COMMON_CONDITION_KEYS, CONDITIONS } from '../../shared/catalog.ts'
import { api, UiError } from '../api.ts'
import { ErrorLine } from './bits.tsx'
import { Icon, BrandMark } from './icons.tsx'

export function SetupScreen({
  onConnected,
  writable,
}: {
  onConnected: (message: string) => void
  writable: boolean
}) {
  const [key, setKey] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit() {
    if (busy) return
    if (key.trim().length < 8) {
      setError('请完整粘贴扶摇访问密钥')
      return
    }
    setBusy(true)
    setError('')
    try {
      await api.saveKey(key.trim())
      onConnected('已连接扶摇数据')
    } catch (issue) {
      setError(issue instanceof UiError ? issue.message : '连接没有成功，请稍后再试')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="dsr-setup">
      <div className="dsr-setup-card">
        <div className="dsr-setup-visual">
          <div className="dsr-setup-kicker">方块榜单 · 盘中实时</div>
          <h1 className="dsr-setup-title">把你的选股逻辑，变成一块实时榜单</h1>
          <p className="dsr-setup-desc">
            不用写公式，不用导数据。选好条件，榜单就在盘中自己跑起来；想看更细，点开任意一只股票就行。
          </p>
          <div className="dsr-setup-points">
            <div className="dsr-point">
              <span className="dsr-point-dot">
                <Icon name="bars" size={13} />
              </span>
              <span>{CONDITIONS.length} 个可用条件，常用的 {COMMON_CONDITION_KEYS.length} 个直接可选，其余按需展开</span>
            </div>
            <div className="dsr-point">
              <span className="dsr-point-dot">
                <Icon name="cards" size={13} />
              </span>
              <span>列表、卡片墙、排行榜、分组、芯片墙五种看法，随时切换</span>
            </div>
            <div className="dsr-point">
              <span className="dsr-point-dot">
                <Icon name="key" size={13} />
              </span>
              <span>扶摇密钥由你掌握，东方财富公开行情免密钥；榜单和条件只留在本机</span>
            </div>
          </div>
          <div className="dsr-setup-bars" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="dsr-setup-form">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, color: 'var(--dsr-text-3)' }}>
            <BrandMark size={22} />
            <span style={{ fontSize: 11, letterSpacing: '.08em' }}>连接数据账户</span>
          </div>
          <h2 className="dsr-form-title">填一个访问密钥，就能开始</h2>
          <p className="dsr-form-sub">在扶摇数据服务控制台创建访问密钥后，粘贴到这里。只需要一次。</p>

          <div className="dsr-field">
            <label className="dsr-label" htmlFor="fuyao-key">
              访问密钥
            </label>
            <div className="dsr-key-row">
              <input
                id="fuyao-key"
                className="dsr-input"
                type={show ? 'text' : 'password'}
                value={key}
                placeholder="粘贴访问密钥"
                autoComplete="off"
                spellCheck={false}
                onChange={(event) => setKey(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') void submit()
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
            <span className="dsr-hint">密钥只用于在本机查询行情，不会出现在对话内容里。</span>
          </div>

          <div className="dsr-privacy">
            榜单、筛选条件和密钥都只保存在这台电脑上。扶摇数据服务只看到行情查询，不会看到你的榜单。
          </div>

          {error ? (
            <div style={{ marginTop: 12 }}>
              <ErrorLine text={error} />
            </div>
          ) : null}

          {!writable ? (
            <div style={{ marginTop: 12 }} className="dsr-hint">
              当前环境不支持在界面里保存密钥，请改用本机环境变量提供。
            </div>
          ) : null}

          <div className="dsr-setup-actions">
            <button type="button" className="dsr-btn primary" onClick={() => void submit()} disabled={busy || !writable}>
              {busy ? (
                <>
                  <span className="dsr-spinner" />
                  正在验证
                </>
              ) : (
                <>
                  验证并开始
                  <Icon name="arrow-right" size={14} />
                </>
              )}
            </button>
            {busy ? <span className="dsr-hint">通常一两秒就好</span> : null}
          </div>

          <div className="dsr-setup-note">
            还没有密钥？在扶摇数据服务控制台创建一个即可。榜单如果用到五日、十日窗口，账户需要能取到近 10 个交易日行情包。
          </div>
        </div>
      </div>
    </div>
  )
}

