import axios from 'axios'
import { useAuthStore } from '@/store/authStore'
import { mockAdapter } from '@/mock'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
  // eslint-disable-next-line no-console
  console.info('[mock] enabled — axios requests are intercepted by src/mock')
  request.defaults.adapter = mockAdapter
}

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default request
