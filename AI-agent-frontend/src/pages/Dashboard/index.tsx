const Dashboard = () => {
  return (
    <section>
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-headline text-5xl font-extrabold text-white leading-none tracking-tighter">
              系统脉动
            </h2>
            <p className="font-body text-slate-400 mt-3 text-lg">
              活跃神经节点: <span className="text-secondary font-bold">14 在线</span>
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-1.5 rounded-full bg-secondary-container/10 text-secondary text-xs font-bold border border-secondary/20">
              运行效率 98.2%
            </span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Network Visualizer */}
          <div className="col-span-8 bg-surface-container-low rounded-[2rem] p-8 min-h-[440px] relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start">
                <span className="text-xs font-label uppercase tracking-widest text-slate-500">
                  实时智能体映射
                </span>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-surface-container text-slate-400 hover:text-white">
                    <span className="material-symbols-outlined text-sm">fullscreen</span>
                  </button>
                  <button className="p-2 rounded-lg bg-surface-container text-slate-400 hover:text-white">
                    <span className="material-symbols-outlined text-sm">filter_list</span>
                  </button>
                </div>
              </div>

              {/* Nodes */}
              <div className="flex-1 flex items-center justify-center relative">
                {/* Node 1 */}
                <div className="absolute top-1/4 left-1/4 group cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center border border-primary/20 group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                    <span className="material-symbols-outlined text-primary">neurology</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-pulse shadow-[0_0_10px_rgba(93,230,255,0.8)]"></div>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-[10px] font-bold text-white">NEXUS-01</p>
                    <p className="text-[8px] text-slate-500">活跃</p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="group cursor-pointer">
                  <div className="w-24 h-24 rounded-3xl bg-surface-container-high flex items-center justify-center border-2 border-secondary/30 group-hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(93,230,255,0.1)]">
                    <div className="relative">
                      <span className="material-symbols-outlined text-4xl text-secondary">hub</span>
                      <div className="absolute inset-0 bg-secondary blur-xl opacity-20"></div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-xs font-black text-white">CORE-X</p>
                    <p className="text-[10px] text-secondary font-bold">同步中</p>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="absolute bottom-1/4 right-1/4 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center border border-tertiary/20 group-hover:scale-110 group-hover:border-tertiary transition-all duration-300">
                    <span className="material-symbols-outlined text-tertiary">memory</span>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-[10px] font-bold text-white">PROC-M2</p>
                    <p className="text-[8px] text-slate-500">待机</p>
                  </div>
                </div>

                {/* SVG Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
                  <line stroke="#D0BCFF" strokeDasharray="4" strokeWidth="1" x1="25%" x2="50%" y1="25%" y2="50%"></line>
                  <line stroke="#5DE6FF" strokeDasharray="4" strokeWidth="1" x1="75%" x2="50%" y1="75%" y2="50%"></line>
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Deploy Card */}
          <div className="col-span-4 bg-gradient-to-br from-primary-container to-on-primary-fixed-variant rounded-[2rem] p-8 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-500"></div>
            
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl text-white mb-6">rocket</span>
              <h3 className="font-headline text-3xl font-bold text-white tracking-tighter mb-2">
                初始化新<br />神经路径
              </h3>
              <p className="text-white/60 text-sm font-body max-w-[200px]">
                数秒内通过专业的 AI 子处理器扩展您的网络。
              </p>
            </div>
            
            <button className="relative z-10 bg-white text-on-primary-fixed font-black py-4 rounded-full flex items-center justify-center gap-2 mt-8 hover:bg-secondary-fixed transition-all group-hover:translate-y-[-4px]">
              部署中心 <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          {/* Metrics */}
          <div className="col-span-4 bg-surface-container rounded-3xl p-6 border-l-4 border-secondary shadow-[20px_0_40px_rgba(93,230,255,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-label text-slate-500 uppercase tracking-widest">神经负载</p>
              <span className="text-secondary font-bold text-lg">42%</span>
            </div>
            <div className="h-16 flex items-end gap-1">
              {[8, 12, 10, 14, 16, 9].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-secondary/30 rounded-t-md"
                  style={{ height: `${height * 4}px` }}
                ></div>
              ))}
            </div>
          </div>

          <div className="col-span-4 bg-surface-container rounded-3xl p-6 border-l-4 border-primary shadow-[20px_0_40px_rgba(208,188,255,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-label text-slate-500 uppercase tracking-widest">推理延迟</p>
              <span className="text-primary font-bold text-lg">18ms</span>
            </div>
            <div className="h-16">
              <svg className="w-full h-full">
                <path
                  d="M0 40 Q 20 10, 40 50 T 80 30 T 120 45 T 160 20 T 200 40"
                  fill="none"
                  stroke="#D0BCFF"
                  strokeWidth="2"
                />
                <path
                  d="M0 40 Q 20 10, 40 50 T 80 30 T 120 45 T 160 20 T 200 40 V 64 H 0 Z"
                  fill="url(#grad1)"
                  opacity="0.1"
                />
                <defs>
                  <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#D0BCFF', stopOpacity: 1 }}></stop>
                    <stop offset="100%" style={{ stopColor: '#D0BCFF', stopOpacity: 0 }}></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="col-span-4 bg-surface-container rounded-3xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <p className="text-xs font-label text-slate-500 uppercase tracking-widest">活动动态</p>
              <button className="text-[10px] text-primary font-bold hover:underline">查看全部</button>
            </div>
            <div className="space-y-4">
              {[
                { label: '智能体 NEXUS-01', time: '200毫秒前完成逻辑递归', color: 'secondary' },
                { label: '全局同步', time: '通用状态备份成功', color: 'primary' },
                { label: '账户修改', time: '已应用新的权限层', color: 'tertiary' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start" style={{ opacity: 1 - i * 0.25 }}>
                  <div className={`w-2 h-2 rounded-full bg-${item.color} mt-1.5 shadow-[0_0_8px_rgba(93,230,255,0.6)]`}></div>
                  <div>
                    <p className="text-xs text-white font-bold leading-none">{item.label}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Insights */}
      <div className="mt-12 grid grid-cols-3 gap-8">
        {[
          { icon: 'security', label: '安全脉动', value: '威胁矩阵已清除', color: 'tertiary' },
          { icon: 'bolt', label: '功耗', value: '低能耗状态', color: 'secondary' },
          { icon: 'lan', label: '子网状态', value: '3 外部桥接已激活', color: 'primary' },
        ].map((item, i) => (
          <div key={i} className="bg-surface-container-low rounded-2xl p-6 flex items-center gap-6">
            <div className={`w-12 h-12 rounded-full bg-on-${item.color}-fixed-variant/20 flex items-center justify-center text-${item.color}`}>
              <span className="material-symbols-outlined">{item.icon}</span>
            </div>
            <div>
              <p className="text-[10px] font-label uppercase tracking-widest text-slate-500">{item.label}</p>
              <p className="text-white font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Dashboard
