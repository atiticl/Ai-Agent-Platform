import request from '@/utils/request'

// 智能体类型定义
export interface Agent {
  id: number
  name: string
  type: string
  status: 'active' | 'idle'
  description: string
  lastActive: string
  tasks: number
  accuracy: number
  model?: string
  temperature?: number
  systemPrompt?: string
}

export interface CreateAgentDto {
  name: string
  type: string
  description: string
  model: string
  temperature: number
  systemPrompt: string
}

// 获取智能体列表
export const getAgents = (params?: {
  status?: 'all' | 'active' | 'idle'
  search?: string
}) => {
  return request.get<Agent[]>('/agents', { params })
}

// 获取智能体详情
export const getAgentById = (id: number) => {
  return request.get<Agent>(`/agents/${id}`)
}

// 创建智能体
export const createAgent = (data: CreateAgentDto) => {
  return request.post<Agent>('/agents', data)
}

// 更新智能体
export const updateAgent = (id: number, data: Partial<CreateAgentDto>) => {
  return request.put<Agent>(`/agents/${id}`, data)
}

// 删除智能体
export const deleteAgent = (id: number) => {
  return request.delete(`/agents/${id}`)
}

// 获取智能体统计信息
export const getAgentStats = () => {
  return request.get('/agents/stats')
}
