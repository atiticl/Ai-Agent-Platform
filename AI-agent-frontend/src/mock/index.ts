import type {
  AxiosAdapter,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { routes, type MockMethod } from './handlers'

interface CompiledRoute {
  method: MockMethod
  regex: RegExp
  keys: string[]
  handler: (ctx: {
    params: Record<string, string>
    query: Record<string, unknown>
    body: any
    config: InternalAxiosRequestConfig
  }) => Promise<{ status?: number; data: unknown }> | { status?: number; data: unknown }
}

function compile(pattern: string): { regex: RegExp; keys: string[] } {
  const keys: string[] = []
  const regexStr = pattern.replace(/:([A-Za-z_][A-Za-z0-9_]*)/g, (_, k) => {
    keys.push(k)
    return '([^/]+)'
  })
  return { regex: new RegExp(`^${regexStr}$`), keys }
}

const compiled: CompiledRoute[] = routes.map((r) => {
  const { regex, keys } = compile(r.path)
  return { method: r.method, regex, keys, handler: r.handler }
})

function normalizePath(config: InternalAxiosRequestConfig): string {
  const base = (config.baseURL || '').replace(/\/$/, '')
  let url = config.url || '/'
  if (!/^https?:\/\//i.test(url)) {
    url = base + (url.startsWith('/') ? url : '/' + url)
  }
  const qIdx = url.indexOf('?')
  let path = qIdx >= 0 ? url.slice(0, qIdx) : url
  path = path.replace(/^https?:\/\/[^/]+/i, '')
  if (path.startsWith('/api')) path = path.slice(4)
  return path || '/'
}

export const mockAdapter: AxiosAdapter = async (config) => {
  const method = (config.method || 'get').toLowerCase() as MockMethod
  const path = normalizePath(config)

  await new Promise((r) => setTimeout(r, 150))

  for (const route of compiled) {
    if (route.method !== method) continue
    const m = route.regex.exec(path)
    if (!m) continue

    const params: Record<string, string> = {}
    route.keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])))

    let body = config.data
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body)
      } catch {
        // leave as-is
      }
    }

    const result = await route.handler({
      params,
      query: (config.params || {}) as Record<string, unknown>,
      body,
      config,
    })
    const status = result.status ?? 200

    const response: AxiosResponse = {
      data: result.data,
      status,
      statusText: status < 400 ? 'OK' : 'ERROR',
      headers: { 'content-type': 'application/json' },
      config,
      request: {},
    }

    if (status >= 400) {
      const err = new Error(`Request failed with status code ${status}`) as Error & {
        response?: AxiosResponse
        config?: InternalAxiosRequestConfig
        isAxiosError?: boolean
      }
      err.response = response
      err.config = config
      err.isAxiosError = true
      throw err
    }

    // eslint-disable-next-line no-console
    console.debug(`[mock] ${method.toUpperCase()} ${path} → ${status}`)
    return response
  }

  // eslint-disable-next-line no-console
  console.warn(`[mock] not implemented: ${method.toUpperCase()} ${path}`)
  const err = new Error(`Mock not implemented: ${method.toUpperCase()} ${path}`) as Error & {
    response?: AxiosResponse
    config?: InternalAxiosRequestConfig
    isAxiosError?: boolean
  }
  err.response = {
    data: { error: 'mock_not_implemented', path, method },
    status: 404,
    statusText: 'Not Found',
    headers: {},
    config,
    request: {},
  }
  err.config = config
  err.isAxiosError = true
  throw err
}
