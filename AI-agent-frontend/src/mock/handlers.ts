import type { InternalAxiosRequestConfig } from 'axios'
import { UserRole } from '@/types'

export type MockMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

export interface MockContext {
  params: Record<string, string>
  query: Record<string, unknown>
  body: any
  config: InternalAxiosRequestConfig
}

export interface MockRoute {
  method: MockMethod
  path: string
  handler: (ctx: MockContext) => { status?: number; data: unknown } | Promise<{ status?: number; data: unknown }>
}

const nowIso = () => new Date().toISOString()

const currentUser = {
  id: '1',
  username: '指挥单元 7',
  email: 'admin@aether.ai',
  role: UserRole.ADMIN,
  tenantId: 'tenant-1',
  permissions: ['*'],
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
}

const profile = {
  id: 1,
  username: '指挥单元 7',
  email: 'admin@aether.ai',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  bio: 'Aether OS 测试账号',
  createdAt: '2026-01-01T00:00:00Z',
}

let preferences = {
  language: 'zh-CN',
  theme: 'dark',
  notifications: {
    email: true,
    push: true,
    taskComplete: true,
    systemUpdate: false,
  },
}

let apiKeys = [
  { id: 1, name: 'default', key: 'sk-mock-************abcd', created: '2026-03-01', lastUsed: '2026-04-18' },
]
let apiKeySeq = 2

let agents = [
  {
    id: 1,
    name: 'NEXUS-01',
    type: '对话助手',
    status: 'active' as const,
    description: '通用对话智能体，支持多轮对话和上下文理解',
    lastActive: '2分钟前',
    tasks: 156,
    accuracy: 98.5,
    model: 'claude-opus-4-7',
    temperature: 0.7,
    systemPrompt: '你是 NEXUS-01，一个通用对话助手。',
  },
  {
    id: 2,
    name: 'CodeMaster',
    type: '代码生成',
    status: 'active' as const,
    description: '专业代码生成智能体，支持多种编程语言',
    lastActive: '10分钟前',
    tasks: 89,
    accuracy: 96.2,
    model: 'claude-sonnet-4-6',
    temperature: 0.3,
    systemPrompt: '你是 CodeMaster，一个专业的代码助手。',
  },
  {
    id: 3,
    name: 'DataAnalyzer',
    type: '数据分析',
    status: 'idle' as const,
    description: '数据分析和可视化智能体',
    lastActive: '1小时前',
    tasks: 234,
    accuracy: 94.8,
    model: 'claude-sonnet-4-6',
    temperature: 0.2,
    systemPrompt: '你是 DataAnalyzer，一个数据分析专家。',
  },
  {
    id: 4,
    name: 'ContentWriter',
    type: '内容创作',
    status: 'active' as const,
    description: '内容创作和文案生成智能体',
    lastActive: '5分钟前',
    tasks: 312,
    accuracy: 97.1,
    model: 'claude-opus-4-7',
    temperature: 0.8,
    systemPrompt: '你是 ContentWriter，一个内容创作助手。',
  },
]
let agentSeq = 5

let conversations = [
  { id: 1, name: '客服对话 #1024', lastMessage: '好的，已帮您处理', time: '12:30', unread: 0 },
  { id: 2, name: '数据报表生成', lastMessage: '本月活跃用户同比 +18%', time: '昨天', unread: 2 },
]
let convSeq = 3

const messagesByConv: Record<number, Array<{ id: number; role: 'user' | 'assistant'; content: string; timestamp: string }>> = {
  1: [
    { id: 1, role: 'user', content: '我的订单什么时候发货？', timestamp: '12:28' },
    { id: 2, role: 'assistant', content: '您的订单已在今日下午发货，请留意物流通知。', timestamp: '12:30' },
  ],
  2: [
    { id: 1, role: 'user', content: '给我本月数据报告', timestamp: '昨天 09:15' },
    { id: 2, role: 'assistant', content: '本月活跃用户同比 +18%，关键指标如下……', timestamp: '昨天 09:17' },
  ],
}
let messageSeq = 100

const historyItems = [
  { id: 1, type: 'conversation' as const, title: '客服对话 #1024', agent: '客服助手', timestamp: '2026-04-19 12:30', status: 'success' as const, details: '用户咨询物流' },
  { id: 2, type: 'task' as const, title: '月度报表生成', agent: '数据分析师', timestamp: '2026-04-18 22:10', status: 'success' as const, details: '生成 3 张图表' },
  { id: 3, type: 'deployment' as const, title: '上线客服助手 v1.3', agent: '客服助手', timestamp: '2026-04-17 10:00', status: 'success' as const, details: '灰度 20%' },
  { id: 4, type: 'task' as const, title: '异常检测', agent: '数据分析师', timestamp: '2026-04-16 15:22', status: 'failed' as const, details: '模型超时' },
]

export const routes: MockRoute[] = [
  // --- auth ---
  {
    method: 'post',
    path: '/auth/login',
    handler: ({ body }) => ({
      data: {
        token: 'mock-jwt-' + Date.now(),
        user: { ...currentUser, email: body?.email || currentUser.email },
      },
    }),
  },
  {
    method: 'post',
    path: '/auth/logout',
    handler: () => ({ data: { success: true } }),
  },
  {
    method: 'get',
    path: '/auth/user',
    handler: () => ({ data: currentUser }),
  },

  // --- user profile ---
  { method: 'get', path: '/user/profile', handler: () => ({ data: profile }) },
  {
    method: 'put',
    path: '/user/profile',
    handler: ({ body }) => {
      Object.assign(profile, body || {})
      return { data: profile }
    },
  },
  {
    method: 'post',
    path: '/user/avatar',
    handler: () => ({ data: { url: profile.avatar } }),
  },
  {
    method: 'put',
    path: '/user/password',
    handler: () => ({ data: { success: true } }),
  },

  { method: 'get', path: '/user/api-keys', handler: () => ({ data: apiKeys }) },
  {
    method: 'post',
    path: '/user/api-keys',
    handler: ({ body }) => {
      const item = {
        id: apiKeySeq++,
        name: body?.name || 'unnamed',
        key: 'sk-mock-' + Math.random().toString(36).slice(2, 10),
        created: nowIso().slice(0, 10),
        lastUsed: '-',
      }
      apiKeys.push(item)
      return { data: item }
    },
  },
  {
    method: 'delete',
    path: '/user/api-keys/:id',
    handler: ({ params }) => {
      apiKeys = apiKeys.filter((k) => String(k.id) !== params.id)
      return { data: { success: true } }
    },
  },

  { method: 'get', path: '/user/preferences', handler: () => ({ data: preferences }) },
  {
    method: 'put',
    path: '/user/preferences',
    handler: ({ body }) => {
      preferences = { ...preferences, ...(body || {}) }
      return { data: preferences }
    },
  },
  { method: 'post', path: '/user/two-factor/enable', handler: () => ({ data: { success: true } }) },
  { method: 'post', path: '/user/two-factor/disable', handler: () => ({ data: { success: true } }) },

  // --- agents ---
  {
    method: 'get',
    path: '/agents',
    handler: ({ query }) => {
      let list = agents.slice()
      if (query.status && query.status !== 'all') {
        list = list.filter((a) => a.status === query.status)
      }
      if (query.search) {
        const q = String(query.search).toLowerCase()
        list = list.filter((a) => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q))
      }
      return { data: list }
    },
  },
  {
    method: 'get',
    path: '/agents/stats',
    handler: () => ({
      data: {
        total: agents.length,
        active: agents.filter((a) => a.status === 'active').length,
        idle: agents.filter((a) => a.status === 'idle').length,
        totalTasks: agents.reduce((s, a) => s + a.tasks, 0),
      },
    }),
  },
  {
    method: 'get',
    path: '/agents/:id',
    handler: ({ params }) => {
      const a = agents.find((x) => String(x.id) === params.id)
      return a ? { data: a } : { status: 404, data: { error: 'not_found' } }
    },
  },
  {
    method: 'post',
    path: '/agents',
    handler: ({ body }) => {
      const a = {
        id: agentSeq++,
        name: body?.name || 'New Agent',
        type: body?.type || 'chatbot',
        status: 'idle' as const,
        description: body?.description || '',
        lastActive: nowIso(),
        tasks: 0,
        accuracy: 0,
        model: body?.model,
        temperature: body?.temperature,
        systemPrompt: body?.systemPrompt,
      }
      agents.push(a)
      return { data: a }
    },
  },
  {
    method: 'put',
    path: '/agents/:id',
    handler: ({ params, body }) => {
      const a = agents.find((x) => String(x.id) === params.id)
      if (!a) return { status: 404, data: { error: 'not_found' } }
      Object.assign(a, body || {})
      return { data: a }
    },
  },
  {
    method: 'delete',
    path: '/agents/:id',
    handler: ({ params }) => {
      agents = agents.filter((a) => String(a.id) !== params.id)
      return { data: { success: true } }
    },
  },

  // --- conversations ---
  { method: 'get', path: '/conversations', handler: () => ({ data: conversations }) },
  {
    method: 'get',
    path: '/conversations/:id',
    handler: ({ params }) => {
      const c = conversations.find((x) => String(x.id) === params.id)
      return c ? { data: c } : { status: 404, data: { error: 'not_found' } }
    },
  },
  {
    method: 'post',
    path: '/conversations',
    handler: ({ body }) => {
      const c = {
        id: convSeq++,
        name: body?.name || '新对话',
        lastMessage: '',
        time: '刚刚',
        unread: 0,
      }
      conversations.unshift(c)
      messagesByConv[c.id] = []
      return { data: c }
    },
  },
  {
    method: 'get',
    path: '/conversations/:id/messages',
    handler: ({ params }) => ({ data: messagesByConv[Number(params.id)] || [] }),
  },
  {
    method: 'post',
    path: '/messages',
    handler: ({ body }) => {
      const convId = body?.conversationId ?? 1
      const list = messagesByConv[convId] || (messagesByConv[convId] = [])
      const userMsg = {
        id: messageSeq++,
        role: 'user' as const,
        content: body?.content || '',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      }
      list.push(userMsg)
      const reply = {
        id: messageSeq++,
        role: 'assistant' as const,
        content: `（mock 回复）我收到了："${body?.content || ''}"`,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      }
      list.push(reply)
      const conv = conversations.find((c) => c.id === convId)
      if (conv) {
        conv.lastMessage = reply.content
        conv.time = '刚刚'
      }
      return { data: reply }
    },
  },
  {
    method: 'delete',
    path: '/conversations/:id',
    handler: ({ params }) => {
      conversations = conversations.filter((c) => String(c.id) !== params.id)
      delete messagesByConv[Number(params.id)]
      return { data: { success: true } }
    },
  },

  // --- history ---
  {
    method: 'get',
    path: '/history',
    handler: ({ query }) => {
      let list = historyItems.slice()
      if (query.type && query.type !== 'all') {
        list = list.filter((h) => h.type === query.type)
      }
      if (query.search) {
        const q = String(query.search).toLowerCase()
        list = list.filter((h) => h.title.toLowerCase().includes(q))
      }
      const page = Number(query.page || 1)
      const pageSize = Number(query.pageSize || 20)
      const start = (page - 1) * pageSize
      return { data: { items: list.slice(start, start + pageSize), total: list.length } }
    },
  },
  {
    method: 'get',
    path: '/history/stats',
    handler: () => {
      const conv = historyItems.filter((h) => h.type === 'conversation').length
      const tasks = historyItems.filter((h) => h.type === 'task').length
      const deploy = historyItems.filter((h) => h.type === 'deployment').length
      const ok = historyItems.filter((h) => h.status === 'success').length
      return {
        data: {
          conversations: conv,
          tasks,
          deployments: deploy,
          successRate: historyItems.length ? Math.round((ok / historyItems.length) * 100) / 100 : 0,
        },
      }
    },
  },
  {
    method: 'get',
    path: '/history/:id',
    handler: ({ params }) => {
      const h = historyItems.find((x) => String(x.id) === params.id)
      return h ? { data: h } : { status: 404, data: { error: 'not_found' } }
    },
  },
  {
    method: 'delete',
    path: '/history/:id',
    handler: () => ({ data: { success: true } }),
  },
]
