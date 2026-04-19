import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authApi } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'

const Login = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await authApi.login(formData)
      setAuth(response.token, response.user)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative stardust-bg">
      {/* 左侧视觉区 - 网络图形 */}
      <div className="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden border-r border-outline-variant/10">
        {/* 背景光晕 */}
        <div className="absolute w-[600px] h-[600px] sphere-glow rounded-full"></div>
        
        <div className="relative z-10 w-full max-w-lg p-12">
          {/* 网络图形图片 */}
          <div className="relative group">
            <img 
              alt="Abstract Neural Network" 
              className="w-full h-auto object-cover rounded-full mix-blend-screen opacity-90 scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxtpu2F0XLZRNZxv_PnmHcISRxrKPNRcbIj-7RNHsO0VFqv6V3_hAdQaQNZW4d-LyMhwiNwGxoBODVLyfGEXraRKWPraruEy2rPvoo3GlPVsC9z3IicGgjg34__E64cCnoOR_xjZiX-EFJbwF2fj6GIX3jKbZ7l4x4akf9JPIAt0wxslQVsG8TnMKxTdJzWaDU7jpVAGNR0UCK_U4PbCK1mpaJ0ZiE3ThAPvxknGuKjfAs4oiG1LPkO_yRIAPlMA3kWuk5j-1L5GIZ"
            />
          </div>
          
          <div className="mt-16 space-y-6">
            <h1 className="font-headline text-5xl font-black tracking-tighter text-white leading-none">
              智能 <br />
              <span className="text-secondary">进化。</span>
            </h1>
            <p className="font-body text-lg text-on-surface-variant max-w-md tracking-wide leading-relaxed">
              体验下一代自主智能。Aether OS 为您最雄心勃勃的 AI 智能体提供架构支持。
            </p>
          </div>
        </div>
      </div>

      {/* 右侧登录表单 */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative z-20">
        {/* Logo */}
        <div className="absolute top-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-[0_0_20px_rgba(208,188,255,0.3)]">
            <span className="material-symbols-outlined text-on-primary-fixed text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              bolt
            </span>
          </div>
          <span className="font-headline text-2xl font-bold tracking-tighter text-white">Aether OS</span>
        </div>

        {/* 登录卡片 */}
        <div className="w-full max-w-md glass-panel p-10 rounded-3xl border border-outline-variant/15 shadow-[0_40px_100px_rgba(10,14,23,0.8)]">
          <div className="mb-10">
            <h2 className="font-headline text-3xl font-bold text-white mb-2 tracking-tight">欢迎回来</h2>
            <p className="font-label text-sm text-slate-400">请输入您的凭据以访问 Aether 核心。</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="font-label text-xs font-semibold uppercase tracking-widest text-primary-container ml-1">
                通用 ID
              </label>
              <div className="relative group">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface-container-highest/50 border-0 rounded-xl px-5 py-4 text-on-surface placeholder:text-slate-600 focus:ring-1 focus:ring-secondary/30 focus:bg-surface-container-highest transition-all duration-300"
                  placeholder="name@aether.ai"
                  required
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none border border-secondary/0 group-focus-within:border-secondary/20 transition-all duration-300"></div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="font-label text-xs font-semibold uppercase tracking-widest text-primary-container">
                  安全协议
                </label>
                <a href="#" className="font-label text-[10px] uppercase font-bold text-slate-500 hover:text-secondary transition-colors">
                  忘记密码？
                </a>
              </div>
              <div className="relative group">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-surface-container-highest/50 border-0 rounded-xl px-5 py-4 text-on-surface placeholder:text-slate-600 focus:ring-1 focus:ring-secondary/30 focus:bg-surface-container-highest transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none border border-secondary/0 group-focus-within:border-secondary/20 transition-all duration-300"></div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed font-bold py-4 rounded-full shadow-[0_10px_30px_rgba(160,120,255,0.25)] hover:shadow-[0_15px_40px_rgba(160,120,255,0.4)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>{loading ? '连接中...' : '初始化会话'}</span>
              <span className="material-symbols-outlined text-xl">login</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-outline-variant/10"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
              <span className="bg-[#1C1F29] px-4 text-slate-500">跨平台同步</span>
            </div>
          </div>

          {/* SSO */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-surface-container-low hover:bg-surface-container transition-colors py-3.5 rounded-xl border border-outline-variant/10 group">
              <img 
                alt="Google" 
                className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt9F80IXigrZiOUA5vp2D73mmeRgCdT3vJwRuApcBIbtMOENbeBFRuAUscEJETSEml4VH0qYASqwyWWoPZ2LQUwe5dT1FOKMlo1BjXi6OL4wNQ40tXK24P1G1kfY4vGJ2155OJEII9pXsaEisa6VYVSGc9i5LFOZKbw_-HAIWWX_8Tr53e2x0AEoHlSVcFDggdXEs5qGntuHdu57RW8dXkTPhuFY4L3Ad62ZGLovIlkJyf1OIyDw3yohoYdPzM8sJG9gjvifm16vuw"
              />
              <span className="font-label text-sm font-semibold text-on-surface-variant group-hover:text-white">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 bg-surface-container-low hover:bg-surface-container transition-colors py-3.5 rounded-xl border border-outline-variant/10 group">
              <img 
                alt="GitHub" 
                className="w-5 h-5 grayscale invert group-hover:grayscale-0 transition-all" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMhwRENVIeFgE79HmIzopJr5Kwj9T_rV69dNDuAUJ62LEWrBF5iW7VJRIuD24IkZ6WHSnMqhj22Qpf7xaDeUh1VoH3SKp7WarlbdaiyQK6zCTpWdPqGU0v8jVHig_cLg2uJPbMydZo4SMjMKWty35uHWuvrp2eYF_y2iAp86iyFcSXpi1e62Uj1zxZXW_1-OpilBzdE8SoYoe-P4qrATfT-p4FcqdZZOdZBv7vViM95R4edwAD4JH8Hpev9oaSrVqbrw7UykyZ9PFy"
              />
              <span className="font-label text-sm font-semibold text-on-surface-variant group-hover:text-white">GitHub</span>
            </button>
          </div>

          <p className="mt-10 text-center font-label text-sm text-slate-500">
            新加入生态系统？{' '}
            <Link to="/register" className="text-secondary font-bold hover:underline underline-offset-4">
              创建身份
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="absolute bottom-10 flex gap-8">
          <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-slate-600 hover:text-primary transition-colors">
            隐私节点
          </a>
          <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-slate-600 hover:text-primary transition-colors">
            安全条款
          </a>
          <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-slate-600 hover:text-primary transition-colors">
            系统版本 V2.0.4
          </a>
        </div>
      </div>

      {/* 装饰性边角 */}
      <div className="fixed top-0 right-0 p-8 pointer-events-none opacity-20">
        <div className="w-32 h-32 border-t border-r border-primary-container rounded-tr-3xl"></div>
      </div>
      <div className="fixed bottom-0 left-0 p-8 pointer-events-none opacity-20">
        <div className="w-32 h-32 border-b border-l border-secondary rounded-bl-3xl"></div>
      </div>
    </div>
  )
}

export default Login
