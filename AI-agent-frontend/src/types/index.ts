// 用户类型
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  role: UserRole
  tenantId: string
  permissions: string[]
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

// 认证类型
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

// 菜单类型
export interface MenuItem {
  key: string
  label: string
  icon?: string
  path?: string
  children?: MenuItem[]
  permission?: string
}

// 智能体类型
export interface Agent {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'processing'
  createdAt: string
  updatedAt: string
}
