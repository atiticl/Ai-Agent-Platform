import request from '@/utils/request'

// 历史记录类型定义
export interface HistoryItem {
  id: number
  type: 'conversation' | 'task' | 'deployment'
  title: string
  agent: string
  timestamp: string
  status: 'success' | 'failed' | 'pending'
  details: string
}

export interface HistoryStats {
  conversations: number
  tasks: number
  deployments: number
  successRate: number
}

// 获取历史记录列表
export const getHistory = (params?: {
  type?: 'all' | 'conversation' | 'task' | 'deployment'
  search?: string
  page?: number
  pageSize?: number
}) => {
  return request.get<{
    items: HistoryItem[]
    total: number
  }>('/history', { params })
}

// 获取历史记录详情
export const getHistoryById = (id: number) => {
  return request.get<HistoryItem>(`/history/${id}`)
}

// 获取历史统计信息
export const getHistoryStats = () => {
  return request.get<HistoryStats>('/history/stats')
}

// 导出历史记录
export const exportHistory = (params?: {
  type?: string
  startDate?: string
  endDate?: string
}) => {
  return request.get('/history/export', {
    params,
    responseType: 'blob',
  })
}

// 删除历史记录
export const deleteHistory = (id: number) => {
  return request.delete(`/history/${id}`)
}
