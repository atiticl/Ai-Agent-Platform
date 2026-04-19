import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

const menuItems = [
  { key: 'dashboard', label: '控制面板', icon: 'dashboard', path: '/dashboard' },
  { key: 'agents', label: '智能体中心', icon: 'smart_toy', path: '/agents' },
  { key: 'chat', label: '实时聊天', icon: 'forum', path: '/chat' },
  { key: 'history', label: '历史记录', icon: 'history', path: '/history' },
]

const Sidebar = () => {
  const location = useLocation()

  return (
    <aside className="bg-[#0A0E17] h-screen w-[240px] fixed left-0 top-0 z-50 flex flex-col py-8">
      {/* Logo */}
      <div className="px-8 mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-fixed">cloud</span>
          </div>
          <div>
            <h1 className="font-headline text-xl font-black text-white">Aether OS</h1>
            <p className="font-body tracking-wide text-sm text-slate-500">V 2.0.4</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.key}
              to={item.path}
              className={clsx(
                'px-6 py-4 flex items-center gap-4 group transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-primary/10 to-transparent text-primary border-r-2 border-primary'
                  : 'text-slate-500 hover:bg-surface-container-low/50 hover:text-secondary'
              )}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-body tracking-wide text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Deploy Button */}
      <div className="px-6 mb-8">
        <button className="w-full py-4 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(208,188,255,0.2)] hover:shadow-[0_0_30px_rgba(208,188,255,0.4)] transition-all active:scale-95 duration-150">
          <span className="material-symbols-outlined text-sm">rocket_launch</span>
          部署新智能体
        </button>
      </div>

      {/* Bottom Links */}
      <div className="mt-auto border-t border-outline-variant/10">
        <Link
          to="/help"
          className="text-slate-500 px-6 py-4 flex items-center gap-4 hover:bg-surface-container-low/50 hover:text-secondary transition-all duration-200"
        >
          <span className="material-symbols-outlined">help_outline</span>
          <span className="font-body tracking-wide text-sm">帮助支持</span>
        </Link>
        <Link
          to="/settings"
          className="text-slate-500 px-6 py-4 flex items-center gap-4 hover:bg-surface-container-low/50 hover:text-secondary transition-all duration-200"
        >
          <span className="material-symbols-outlined">manage_accounts</span>
          <span className="font-body tracking-wide text-sm">账户设置</span>
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
