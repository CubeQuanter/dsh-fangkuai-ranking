import type {
  ApiEnvelope,
  BoardInfo,
  BootstrapData,
  BasicHistoryStatus,
  ConnectionInfo,
  EvaluateResult,
  RankingConfig,
  WallData,
} from '../shared/types.ts'

const BASE = '/fangkuai-ranking/api'

export class UiError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = 'UiError'
    this.code = code
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${BASE}${path}`, {
      ...init,
      headers: {
        accept: 'application/json',
        ...(init?.body ? { 'content-type': 'application/json' } : {}),
        ...(init?.headers ?? {}),
      },
    })
  } catch {
    throw new UiError('network', '暂时连不上本地服务，请稍后再试')
  }
  const body = (await response.json().catch(() => null)) as ApiEnvelope<T> | null
  if (!body) throw new UiError('bad_response', '服务返回了无法识别的内容')
  if (!body.ok) throw new UiError(body.error.code, body.error.message)
  return body.data
}

export const api = {
  bootstrap: () => request<BootstrapData>('/bootstrap'),
  connection: () => request<ConnectionInfo>('/config'),
  saveKey: (key: string) => request<ConnectionInfo>('/config', { method: 'POST', body: JSON.stringify({ key }) }),
  removeKey: () => request<ConnectionInfo>('/config', { method: 'DELETE' }),
  wall: (ids?: string[], refresh = false) =>
    request<WallData>('/wall', { method: 'POST', body: JSON.stringify({ ids, refresh }) }),
  evaluate: (id: string, refresh = false) =>
    request<EvaluateResult>(`/rankings/${encodeURIComponent(id)}/evaluate`, {
      method: 'POST',
      body: JSON.stringify({ refresh }),
    }),
  preview: (config: unknown, limit = 10) =>
    request<EvaluateResult>('/preview', { method: 'POST', body: JSON.stringify({ config, limit }) }),
  create: (config: Record<string, unknown>) =>
    request<RankingConfig>('/rankings', { method: 'POST', body: JSON.stringify({ config }) }),
  update: (id: string, patch: Record<string, unknown>) =>
    request<RankingConfig>(`/rankings/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify({ patch }) }),
  remove: (id: string) =>
    request<{ removed: boolean }>(`/rankings/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  boards: (tag: string) => request<BoardInfo[]>(`/boards?tag=${encodeURIComponent(tag)}`),
  basicStatus: () => request<BasicHistoryStatus>('/basic'),
  initializeBasic: (refresh = false) =>
    request<BasicHistoryStatus>('/basic/init', { method: 'POST', body: JSON.stringify({ refresh }) }),
}

