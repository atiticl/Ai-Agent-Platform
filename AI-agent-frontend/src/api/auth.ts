import request from '@/utils/request'
import type { LoginRequest, LoginResponse, User } from '@/types'

export const authApi = {
  login: (data: LoginRequest) => request.post<any, LoginResponse>('/auth/login', data),
  logout: () => request.post('/auth/logout'),
  getUserInfo: () => request.get<any, User>('/auth/user'),
}
