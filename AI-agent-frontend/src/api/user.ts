import request from '@/utils/request'

// 用户类型定义
export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  bio?: string
  createdAt: string
}

export interface UpdateProfileDto {
  username?: string
  email?: string
  bio?: string
}

export interface ChangePasswordDto {
  currentPassword: string
  newPassword: string
}

export interface ApiKey {
  id: number
  name: string
  key: string
  created: string
  lastUsed: string
}

export interface UserPreferences {
  language: string
  theme: string
  notifications: {
    email: boolean
    push: boolean
    taskComplete: boolean
    systemUpdate: boolean
  }
}

// 获取用户信息
export const getUserProfile = () => {
  return request.get<User>('/user/profile')
}

// 更新用户信息
export const updateUserProfile = (data: UpdateProfileDto) => {
  return request.put<User>('/user/profile', data)
}

// 上传头像
export const uploadAvatar = (file: File) => {
  const formData = new FormData()
  formData.append('avatar', file)
  return request.post<{ url: string }>('/user/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 修改密码
export const changePassword = (data: ChangePasswordDto) => {
  return request.put('/user/password', data)
}

// 获取 API 密钥列表
export const getApiKeys = () => {
  return request.get<ApiKey[]>('/user/api-keys')
}

// 创建 API 密钥
export const createApiKey = (name: string) => {
  return request.post<ApiKey>('/user/api-keys', { name })
}

// 删除 API 密钥
export const deleteApiKey = (id: number) => {
  return request.delete(`/user/api-keys/${id}`)
}

// 获取用户偏好设置
export const getUserPreferences = () => {
  return request.get<UserPreferences>('/user/preferences')
}

// 更新用户偏好设置
export const updateUserPreferences = (data: Partial<UserPreferences>) => {
  return request.put<UserPreferences>('/user/preferences', data)
}

// 启用两步验证
export const enableTwoFactor = () => {
  return request.post('/user/two-factor/enable')
}

// 禁用两步验证
export const disableTwoFactor = () => {
  return request.post('/user/two-factor/disable')
}
