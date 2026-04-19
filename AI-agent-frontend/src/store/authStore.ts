import { create } from 'zustand'
import type { User } from '@/types'

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  setAuth: (token: string, user: User) => void
  clearAuth: () => void
  hasPermission: (permission: string) => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null,
  user: typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('auth-user') || 'null') 
    : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('auth-token') : false,
  
  setAuth: (token, user) => {
    set({ token, user, isAuthenticated: true })
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth-token', token)
      localStorage.setItem('auth-user', JSON.stringify(user))
    }
  },
  
  clearAuth: () => {
    set({ token: null, user: null, isAuthenticated: false })
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-token')
      localStorage.removeItem('auth-user')
    }
  },
  
  hasPermission: (permission) => {
    const { user } = get()
    if (!user?.permissions) return false
    return user.permissions.includes('*') || user.permissions.includes(permission)
  },
}))
