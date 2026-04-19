import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuth()
    navigate('/login')
  }

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-240px)] flex justify-between items-center px-10 py-4 bg-[#181B25]/80 backdrop-blur-2xl z-40 shadow-[0_20px_50px_rgba(208,188,255,0.04)]">
      <div className="flex items-center gap-8">
        {/* Search */}
        <div className="flex items-center gap-4 bg-surface-container rounded-full px-5 py-2">
          <span className="material-symbols-outlined text-slate-400">search</span>
          <input
            className="bg-transparent border-none focus:ring-0 text-sm w-48 text-white placeholder-slate-500 outline-none"
            placeholder="搜索系统..."
            type="text"
          />
        </div>

        {/* Nav Tabs */}
        <nav className="flex gap-8">
          <a href="#" className="text-primary font-bold border-b-2 border-primary pb-1 font-headline tracking-tight">
            模型
          </a>
          <a href="#" className="text-slate-400 font-medium hover:text-white transition-colors duration-300 font-headline tracking-tight">
            分析
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative text-slate-400 hover:text-white transition-all">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full border-2 border-background"></span>
        </button>

        {/* Settings */}
        <button className="text-slate-400 hover:text-white transition-all">
          <span className="material-symbols-outlined">settings</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 ml-4 cursor-pointer group">
          <div className="text-right">
            <p className="text-xs font-bold text-white leading-none">{user?.username || '指挥单元 7'}</p>
            <p className="text-[10px] text-primary">首席操作员</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-primary/20 p-0.5 overflow-hidden group-hover:border-primary/50 transition-all">
            <img
              alt="User avatar"
              className="w-full h-full object-cover rounded-full"
              src={user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzb72CIuRX8w2hSJ52PsoNlFqIebb2yLo8nfsGME1gnXNp4qn6QL2lH_7dJhKxsbX-EM5q2dDVxvxm_COy24bWEhIgjPA48dBkjlzwHVsJB3bOSvkzUD8FHdISThpWJbd-9NIdoPQloaxRvx4lM7Mm4m-8NM994zDB7O0hfyYe9phURsJVHnHtv31yTgdSLYL2X32owbkBAaJExCi_Td3nonsZE4PjJasHmcmWbexreMd6C6Z6uagQUjX-a3MQMfUekGFU_Ikn3FEo'}
            />
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-slate-400 hover:text-error transition-all ml-2"
          title="退出登录"
        >
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </header>
  )
}

export default Header
