import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-slots'
import type { Context } from '@deepseek-ai/cordis'
import type { ReactElement } from 'react'
import { BrandMark } from './ui/icons.tsx'
import { RankingPanel } from './ui/RankingPanel.tsx'

export const inject = ['slots']

const PANEL_ID = 'fangkuai-ranking'

/** 侧栏图标：与应用图标同源，选中态跟随主题。 */
function PanelIcon({ size }: { readonly size: number }): ReactElement {
  return (
    <span style={{ display: 'inline-flex', opacity: 1 }}>
      <BrandMark size={size} />
    </span>
  )
}

/** 浏览器半边：注册为 DSH 的全局面板，页面内容按方块量化的榜单页复刻。 */
export function apply(ctx: Context): void {
  ctx.slots.inject('sidebar.panellist', () =>
    ctx.slots.register(
      { name: 'sidebar.panellist', id: PANEL_ID, order: 20, label: '方块榜单' },
      PanelIcon,
    ),
  )
  ctx.slots.inject('main', () =>
    ctx.slots.register({ name: 'main', key: PANEL_ID }, RankingPanel),
  )
}
