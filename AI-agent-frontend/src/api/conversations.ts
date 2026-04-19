import request from '@/utils/request'

// 对话类型定义
export interface Conversation {
  id: number
  name: string
  lastMessage: string
  time: string
  unread: number
}

export interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface SendMessageDto {
  content: string
  conversationId?: number
}

// 获取对话列表
export const getConversations = () => {
  return request.get<Conversation[]>('/conversations')
}

// 获取对话详情
export const getConversationById = (id: number) => {
  return request.get<Conversation>(`/conversations/${id}`)
}

// 创建新对话
export const createConversation = (name: string) => {
  return request.post<Conversation>('/conversations', { name })
}

// 获取对话消息列表
export const getMessages = (conversationId: number) => {
  return request.get<Message[]>(`/conversations/${conversationId}/messages`)
}

// 发送消息
export const sendMessage = (data: SendMessageDto) => {
  return request.post<Message>('/messages', data)
}

// 删除对话
export const deleteConversation = (id: number) => {
  return request.delete(`/conversations/${id}`)
}
