import type { Context } from '@deepseek-ai/cordis'
import { registerWebRoutes } from './host/server.ts'
import { RankingService } from './host/service.ts'
import { registerTools } from './host/tools.ts'

export const name = 'fangkuai-ranking'
export const inject = ['tools', 'credentials', 'webServer', 'connection']

/** 插件宿主半：注册模型工具 + 浏览器工作台所需的同源接口。 */
export function apply(ctx: Context): void {
  const service = new RankingService(ctx)
  ctx.effect(() => registerTools(ctx, service))
  ctx.effect(() => registerWebRoutes(ctx, service))
}

