import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'

const Settings = () => {
  const user = useAuthStore((state) => state.user)
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'api' | 'preferences'>('profile')

  // Profile state
  const [username, setUsername] = useState(user?.username || '指挥单元 7')
  const [email, setEmail] = useState(user?.email || 'commander@aether.ai')
  const [bio, setBio] = useState('企业级 AI 智能体平台的首席操作员')

  // Security state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // API Keys
  const [apiKeys] = useState([
    { id: 1, name: '生产环境密钥', key: 'ak_prod_**********************', created: '2024-01-15', lastUsed: '2小时前' },
    { id: 2, name: '开发环境密钥', key: 'ak_dev_**********************', created: '2024-01-10', lastUsed: '1天前' },
  ])

  // Preferences
  const [language, setLanguage] = useState('zh-CN')
  const [theme, setTheme] = useState('dark')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    taskComplete: true,
    systemUpdate: false,
  })

  const handleSaveProfile = () => {
    console.log('Saving profile:', { username, email, bio })
    alert('个人信息已保存！（模拟）')
  }

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('两次输入的密码不一致')
      return
    }
    console.log('Changing password')
    alert('密码已更新！（模拟）')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleCreateApiKey = () => {
    alert('API 密钥创建功能开发中...')
  }

  const tabs = [
    { key: 'profile', label: '个人资料', icon: 'person' },
    { key: 'security', label: '安全设置', icon: 'security' },
    { key: 'api', label: 'API 管理', icon: 'key' },
    { key: 'preferences', label: '偏好设置', icon: 'tune' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-headline text-5xl font-extrabold text-white leading-none tracking-tighter mb-3">
          账户设置
        </h1>
        <p className="text-slate-400 text-lg">管理您的账户信息和偏好设置</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <div className="col-span-1">
          <div className="bg-surface-container-low rounded-3xl p-4 sticky top-28">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`w-full text-left px-4 py-3 rounded-2xl transition-all flex items-center gap-3 ${
                    activeTab === tab.key
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-slate-400 hover:bg-surface-container hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-surface-container-low rounded-3xl p-8">
              <h2 className="font-headline text-2xl font-bold text-white mb-6">个人资料</h2>

              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-3xl border-2 border-primary/20 p-1 overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzb72CIuRX8w2hSJ52PsoNlFqIebb2yLo8nfsGME1gnXNp4qn6QL2lH_7dJhKxsbX-EM5q2dDVxvxm_COy24bWEhIgjPA48dBkjlzwHVsJB3bOSvkzUD8FHdISThpWJbd-9NIdoPQloaxRvx4lM7Mm4m-8NM994zDB7O0hfyYe9phURsJVHnHtv31yTgdSLYL2X32owbkBAaJExCi_Td3nonsZE4PjJasHmcmWbexreMd6C6Z6uagQUjX-a3MQMfUekGFU_Ikn3FEo"
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>
                  <div>
                    <button className="px-6 py-2 rounded-xl bg-primary text-on-primary font-medium hover:bg-primary/90 transition-all mb-2">
                      更换头像
                    </button>
                    <p className="text-xs text-slate-500">支持 JPG、PNG 格式，最大 2MB</p>
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="block font-label text-xs font-semibold uppercase tracking-widest text-primary-container mb-2">
                    用户名
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-surface-container-highest/50 border-0 rounded-xl px-5 py-4 text-on-surface focus:ring-1 focus:ring-secondary/30 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-label text-xs font-semibold uppercase tracking-widest text-primary-container mb-2">
                    邮箱地址
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-highest/50 border-0 rounded-xl px-5 py-4 text-on-surface focus:ring-1 focus:ring-secondary/30 transition-all"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block font-label text-xs font-semibold uppercase tracking-widest text-primary-container mb-2">
                    个人简介
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full bg-surface-container-highest/50 border-0 rounded-xl px-5 py-4 text-on-surface focus:ring-1 focus:ring-secondary/30 transition-all resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSaveProfile}
                    className="px-8 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed font-bold hover:shadow-lg transition-all"
                  >
                    保存更改
                  </button>
                  <button className="px-8 py-3 rounded-2xl bg-surface-container text-slate-400 font-medium hover:text-white transition-all">
                    取消
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-surface-container-low rounded-3xl p-8">
                <h2 className="font-headline text-2xl font-bold text-white mb-6">修改密码</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block font-label text-xs font-semibold uppercase tracking-widest text-primary-container mb-2">
                      当前密码
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-surface-container-highest/50 border-0 rounded-xl px-5 py-4 text-on-surface focus:ring-1 focus:ring-secondary/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-label text-xs font-semibold uppercase tracking-widest text-primary-container mb-2">
                      新密码
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-surface-container-highest/50 border-0 rounded-xl px-5 py-4 text-on-surface focus:ring-1 focus:ring-secondary/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-label text-xs font-semibold uppercase tracking-widest text-primary-container mb-2">
                      确认新密码
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-surface-container-highest/50 border-0 rounded-xl px-5 py-4 text-on-surface focus:ring-1 focus:ring-secondary/30 transition-all"
                    />
                  </div>

                  <button
                    onClick={handleChangePassword}
                    className="px-8 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed font-bold hover:shadow-lg transition-all"
                  >
                    更新密码
                  </button>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-3xl p-8">
                <h2 className="font-headline text-2xl font-bold text-white mb-6">两步验证</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium mb-1">启用两步验证</p>
                    <p className="text-sm text-slate-400">为您的账户添加额外的安全保护</p>
                  </div>
                  <button className="px-6 py-2 rounded-xl bg-secondary text-on-secondary font-medium hover:bg-secondary/90 transition-all">
                    启用
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* API Tab */}
          {activeTab === 'api' && (
            <div className="bg-surface-container-low rounded-3xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline text-2xl font-bold text-white">API 密钥管理</h2>
                <button
                  onClick={handleCreateApiKey}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed font-bold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  创建密钥
                </button>
              </div>

              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div
                    key={key.id}
                    className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-white mb-1">{key.name}</h4>
                        <p className="text-sm text-slate-400 font-mono">{key.key}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-surface-container-high text-slate-400 hover:text-white transition-all">
                          <span className="material-symbols-outlined text-sm">content_copy</span>
                        </button>
                        <button className="p-2 rounded-lg bg-surface-container-high text-error hover:text-error/80 transition-all">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-6 text-xs text-slate-500">
                      <span>创建于: {key.created}</span>
                      <span>最后使用: {key.lastUsed}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                <p className="text-sm text-slate-300">
                  <span className="material-symbols-outlined text-primary text-sm mr-2 align-middle">info</span>
                  请妥善保管您的 API 密钥，不要与他人分享。如果密钥泄露，请立即删除并创建新密钥。
                </p>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="bg-surface-container-low rounded-3xl p-8">
                <h2 className="font-headline text-2xl font-bold text-white mb-6">界面设置</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block font-label text-xs font-semibold uppercase tracking-widest text-primary-container mb-3">
                      语言
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-surface-container-highest/50 border-0 rounded-xl px-5 py-4 text-on-surface focus:ring-1 focus:ring-secondary/30 transition-all"
                    >
                      <option value="zh-CN">简体中文</option>
                      <option value="en-US">English</option>
                      <option value="ja-JP">日本語</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-label text-xs font-semibold uppercase tracking-widest text-primary-container mb-3">
                      主题
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {['dark', 'light', 'auto'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setTheme(t)}
                          className={`p-4 rounded-2xl border transition-all ${
                            theme === t
                              ? 'bg-primary/10 border-primary text-primary'
                              : 'bg-surface-container border-outline-variant/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          <span className="material-symbols-outlined text-2xl mb-2">
                            {t === 'dark' ? 'dark_mode' : t === 'light' ? 'light_mode' : 'brightness_auto'}
                          </span>
                          <p className="text-sm font-medium capitalize">{t === 'dark' ? '深色' : t === 'light' ? '浅色' : '自动'}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-3xl p-8">
                <h2 className="font-headline text-2xl font-bold text-white mb-6">通知设置</h2>

                <div className="space-y-4">
                  {[
                    { key: 'email', label: '邮件通知', desc: '接收重要更新的邮件通知' },
                    { key: 'push', label: '推送通知', desc: '接收浏览器推送通知' },
                    { key: 'taskComplete', label: '任务完成通知', desc: '智能体任务完成时通知' },
                    { key: 'systemUpdate', label: '系统更新通知', desc: '系统维护和更新通知' },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-surface-container rounded-2xl"
                    >
                      <div>
                        <p className="text-white font-medium mb-1">{item.label}</p>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                      <button
                        onClick={() =>
                          setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })
                        }
                        className={`relative w-14 h-8 rounded-full transition-all ${
                          notifications[item.key as keyof typeof notifications] ? 'bg-secondary' : 'bg-slate-600'
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                            notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : ''
                          }`}
                        ></span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
