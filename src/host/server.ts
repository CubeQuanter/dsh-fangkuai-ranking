import type { IncomingMessage, ServerResponse } from 'node:http'
import type {} from '@deepseek-ai/dsh-client-connection'
import type {} from '@deepseek-ai/dsh-host-webserver'
import type { Context } from '@deepseek-ai/cordis'
import type { ApiEnvelope, ApiErrorBody } from '../shared/types.ts'
import { AppError } from './errors.ts'
import type { RankingService } from './service.ts'

const BASE = '/fangkuai-ranking'
const MAX_BODY = 1024 * 1024

function send(res: ServerResponse, status: number, body: ApiEnvelope<unknown> | ApiErrorBody): void {
  const text = JSON.stringify(body)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(text),
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  })
  res.end(text)
}

function ok<T>(res: ServerResponse, data: T): void {
  send(res, 200, { ok: true, data })
}

function fail(res: ServerResponse, status: number, code: string, message: string): void {
  send(res, status, { ok: false, error: { code, message } })
}

function headersOf(req: IncomingMessage): Record<string, string | undefined> {
  const result: Record<string, string | undefined> = {}
  for (const [name, value] of Object.entries(req.headers)) {
    result[name] = Array.isArray(value) ? value.join(', ') : value
  }
  return result
}

async function readJson(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += buffer.length
    if (size > MAX_BODY) throw new AppError('body_too_large', '请求内容过大')
    chunks.push(buffer)
  }
  if (chunks.length === 0) return {}
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown
  } catch {
    throw new AppError('bad_json', '请求内容格式不正确')
  }
}

function recordOf(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : {}
}

function idOf(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

/** 只注册一个前缀路由，内部用路径分发；所有请求先过 DSH 的连接信任检查。 */
export function registerWebRoutes(ctx: Context, service: RankingService): () => void {
  return ctx.webServer.register({
    kind: 'prefix',
    path: BASE,
    handler: async (req: IncomingMessage, res: ServerResponse) => {
      try {
        const rejection = ctx.connection.requestRejection({ headers: headersOf(req) })
        if (rejection) {
          fail(res, rejection, 'unauthorized', '这个页面需要从 DeepSeek Harness 内打开')
          return
        }
        const url = new URL(req.url ?? '/', 'http://fangkuai-ranking.local')
        let path = url.pathname
        if (path === BASE || path === `${BASE}/`) path = '/'
        else if (path.startsWith(`${BASE}/`)) path = path.slice(BASE.length)
        const method = (req.method ?? 'GET').toUpperCase()
        await route(ctx, service, req, res, path, url, method)
      } catch (error) {
        if (res.headersSent) return
        if (error instanceof AppError) {
          fail(res, error.status, error.code, error.message)
          return
        }
        const message = error instanceof Error ? error.message : String(error)
        console.error(`[fangkuai-ranking] ${message}`)
        fail(res, 500, 'internal', '服务暂时不可用，请稍后重试')
      }
    },
  })
}

async function route(
  _ctx: Context,
  service: RankingService,
  req: IncomingMessage,
  res: ServerResponse,
  path: string,
  url: URL,
  method: string,
): Promise<void> {
  if (path === '/api/bootstrap' && method === 'GET') {
    ok(res, await service.bootstrap())
    return
  }

  if (path === '/api/basic' && method === 'GET') {
    ok(res, await service.basicStatus())
    return
  }

  if (path === '/api/basic/init' && method === 'POST') {
    const body = recordOf(await readJson(req))
    ok(res, await service.initializeBasic(body.refresh === true))
    return
  }

  if (path === '/api/rankings') {
    if (method === 'GET') {
      ok(res, await service.rankings())
      return
    }
    if (method === 'POST') {
      const body = recordOf(await readJson(req))
      ok(res, await service.create(body.config ?? body))
      return
    }
  }

  const rankingMatch = /^\/api\/rankings\/([^/]+)(?:\/(evaluate))?$/.exec(path)
  if (rankingMatch) {
    const id = idOf(rankingMatch[1] ?? '')
    if (rankingMatch[2] === 'evaluate' && method === 'POST') {
      const body = recordOf(await readJson(req))
      ok(res, await service.evaluateSaved(id, body.refresh === true))
      return
    }
    if (method === 'PUT') {
      const body = recordOf(await readJson(req))
      ok(res, await service.update(id, body.patch ?? body))
      return
    }
    if (method === 'DELETE') {
      await service.remove(id)
      ok(res, { removed: true })
      return
    }
  }

  if (path === '/api/wall' && method === 'POST') {
    const body = recordOf(await readJson(req))
    const ids = Array.isArray(body.ids) ? body.ids.filter((item): item is string => typeof item === 'string') : undefined
    ok(res, await service.wall(ids, body.refresh === true))
    return
  }

  if (path === '/api/preview' && method === 'POST') {
    const body = recordOf(await readJson(req))
    const maxRows = typeof body.limit === 'number' ? Math.min(Math.max(body.limit, 1), 30) : 10
    ok(res, await service.evaluateDraft(body.config ?? body, body.refresh === true, maxRows))
    return
  }

  if (path === '/api/boards' && method === 'GET') {
    const tag = url.searchParams.get('tag') ?? ''
    ok(res, await service.boards(tag))
    return
  }

  if (path === '/api/config') {
    if (method === 'GET') {
      ok(res, await service.connection())
      return
    }
    if (method === 'POST') {
      const body = recordOf(await readJson(req))
      const key = typeof body.key === 'string' ? body.key : ''
      ok(res, await service.saveKey(key))
      return
    }
    if (method === 'DELETE') {
      ok(res, await service.clearKey())
      return
    }
  }

  if (path === '/api/config/test' && method === 'POST') {
    const body = recordOf(await readJson(req))
    const key = typeof body.key === 'string' ? body.key : undefined
    ok(res, await service.verifyKey(key))
    return
  }

  if (path === '/api/health' && method === 'GET') {
    ok(res, { ready: true })
    return
  }

  fail(res, 404, 'not_found', '没有找到这个操作')
}

