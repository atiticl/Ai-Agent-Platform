import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('密码不匹配')
      return
    }
    
    setLoading(true)
    
    try {
      // TODO: 实现注册 API
      console.log('Register:', formData)
      // 注册成功后跳转到登录页
      navigate('/login')
    } catch (error) {
      console.error('Register failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col neural-bg overflow-x-hidden">
      {/* Starfield Background */}
      <div className="starfield"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#05070A]/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-5">
          <div className="flex items-center gap-10">
            <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-secondary font-headline">
              Aether OS
            </span>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium font-headline tracking-wide text-slate-400 hover:text-white transition-all">
                Network
              </a>
              <a href="#" className="text-sm font-medium font-headline tracking-wide text-slate-400 hover:text-white transition-all">
                Agents
              </a>
              <a href="#" className="text-sm font-medium font-headline tracking-wide text-slate-400 hover:text-white transition-all">
                Compute
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="hidden sm:block text-sm font-medium text-slate-400 hover:text-white transition-all font-headline">
              Login
            </Link>
            <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-2 rounded-full text-sm font-semibold transition-all font-headline">
              Explore
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 pt-32 pb-24 relative">
        {/* Dynamic Glow Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
        
        <div className="w-full max-w-xl relative">
          {/* Registration Card */}
          <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
            {/* Subtle border glow */}
            <div className="absolute inset-0 border border-white/10 rounded-[2.5rem] pointer-events-none"></div>
            
            <div className="mb-12 text-center">
              <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] text-accent font-bold tracking-widest uppercase mb-4">
                Neural Link Established
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-headline leading-tight text-white tracking-tight mb-4">
                加入智能进化
              </h1>
              <p className="text-slate-400 text-sm font-body max-w-sm mx-auto">
                创建您的数字孪生身份，接入 Aether 核心计算网络。
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block font-label text-[10px] uppercase tracking-widest text-slate-500 ml-1">
                    用户名
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-5 text-on-surface focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition-all placeholder:text-slate-600 font-body glow-input"
                    placeholder="Intelligence_X"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-label text-[10px] uppercase tracking-widest text-slate-500 ml-1">
                    通用 ID
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-5 text-on-surface focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition-all placeholder:text-slate-600 font-body glow-input"
                    placeholder="core@aether.ai"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-label text-[10px] uppercase tracking-widest text-slate-500 ml-1">
                  安全协议
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-5 text-on-surface focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition-all placeholder:text-slate-600 font-body glow-input pr-12"
                    placeholder="输入您的安全密钥"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-accent transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-label text-[10px] uppercase tracking-widest text-slate-500 ml-1">
                  确认协议
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-5 text-on-surface focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition-all placeholder:text-slate-600 font-body glow-input"
                  placeholder="确认安全密钥"
                  required
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-accent to-primary-container text-white font-bold py-5 rounded-2xl hover:brightness-110 transition-all duration-300 active:scale-[0.98] transform font-headline text-lg shadow-[0_10px_30px_rgba(139,92,246,0.3)] btn-glow"
                >
                  {loading ? '初始化中...' : '初始化身份'}
                </button>
              </div>
            </form>

            <div className="mt-12">
              <div className="relative flex items-center mb-8">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink mx-4 text-[10px] font-label uppercase tracking-[0.2em] text-slate-500">
                  第三方接入协议
                </span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/5 py-4 rounded-2xl hover:bg-white/10 transition-all font-label text-sm active:scale-95 transform group">
                  <img
                    alt="Google"
                    className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyj3A13TP-8MiuKeZGLuE2KF-SQ8jmolwIJdNfoNZl45eyrnCIwHjFJ-KR5fD9eKGMkvGqs3HNdNsW5A63LY-N4tIOk-5Op0e_P94Lo4dHraRoluPfzaqtt2imi6N_gVKAEl3FCuMPCTCERvK0to2uz_08AEzAiLEMCunOgRHVsUmMpWRg1f5km0WDMrjRg6RJH0G26IQAGQFg85C3Ld2xdk2vxjUcZu3WVp4PLZtHYxvy0LZDqSJ9qseja9bf467psPdq9YuN7HQj"
                  />
                  <span className="text-slate-300 group-hover:text-white">Google</span>
                </button>
                <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/5 py-4 rounded-2xl hover:bg-white/10 transition-all font-label text-sm active:scale-95 transform group">
                  <svg className="w-5 h-5 fill-slate-500 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                  </svg>
                  <span className="text-slate-300 group-hover:text-white">GitHub</span>
                </button>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-slate-500 text-sm font-body">
                已有账号？{' '}
                <Link to="/login" className="text-accent font-bold hover:text-primary transition-colors ml-1">
                  立即登录
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#05070A] py-10 border-t border-white/5 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-5 order-2 md:order-1">
            <span className="text-[10px] font-label uppercase tracking-[0.2em] text-slate-600">© 2024 AETHER OS</span>
            <span className="w-1 h-1 rounded-full bg-slate-800"></span>
            <span className="text-[10px] font-label uppercase tracking-[0.2em] text-slate-600">EVOLUTION V2.4</span>
          </div>
          <div className="flex gap-10 order-1 md:order-2">
            <a href="#" className="text-[10px] font-label uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">
              Privacy / 隐私中心
            </a>
            <a href="#" className="text-[10px] font-label uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">
              Terms / 协议
            </a>
            <a href="#" className="text-[10px] font-label uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">
              Status / 状态
            </a>
          </div>
        </div>
      </footer>

      {/* Decorative floating ambient lights */}
      <div className="fixed top-[15%] right-[20%] w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_10px_#8B5CF6] pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-[30%] left-[15%] w-1 h-1 bg-secondary rounded-full shadow-[0_0_8px_#5DE6FF] pointer-events-none animate-pulse" style={{ animationDuration: '3s' }}></div>
    </div>
  )
}

export default Register
