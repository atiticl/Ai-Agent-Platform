import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Layout from '@/components/Layout'
import Dashboard from '@/pages/Dashboard'
import AgentCenter from '@/pages/AgentCenter'
import AgentDetail from '@/pages/AgentDetail'
import AgentEdit from '@/pages/AgentEdit'
import Chat from '@/pages/Chat'
import History from '@/pages/History'
import Help from '@/pages/Help'
import Settings from '@/pages/Settings'

// 权限路由守卫
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="agents" element={<AgentCenter />} />
        <Route path="agents/:id" element={<AgentDetail />} />
        <Route path="agents/:id/edit" element={<AgentEdit />} />
        <Route path="chat" element={<Chat />} />
        <Route path="history" element={<History />} />
        <Route path="help" element={<Help />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter
