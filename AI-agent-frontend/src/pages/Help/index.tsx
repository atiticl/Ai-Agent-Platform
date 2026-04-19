import { useState } from 'react'

const faqs = [
  {
    category: '入门指南',
    questions: [
      {
        q: '如何创建第一个智能体？',
        a: '进入"智能体中心"页面，点击右上角"创建智能体"按钮，填写基本信息、选择模型类型、配置参数，然后点击"创建"按钮即可。',
      },
      {
        q: '支持哪些 AI 模型？',
        a: '目前支持 GPT-4、GPT-3.5、Claude 3、Gemini Pro 等主流大语言模型，后续会持续增加更多模型支持。',
      },
      {
        q: '如何开始对话？',
        a: '在"实时聊天"页面选择或创建一个对话，然后在输入框中输入消息并发送即可开始与智能体对话。',
      },
    ],
  },
  {
    category: '功能使用',
    questions: [
      {
        q: '如何调整智能体的回复风格？',
        a: '在创建或编辑智能体时，可以通过调整"温度参数"和"系统提示词"来控制回复的创造性和风格。温度越高，回复越有创造性。',
      },
      {
        q: '智能体可以处理哪些任务？',
        a: '智能体可以处理对话、代码生成、数据分析、内容创作等多种任务，具体能力取决于您选择的模型和配置。',
      },
      {
        q: '如何查看历史记录？',
        a: '在"历史记录"页面可以查看所有对话、任务和部署的历史记录，支持按类型筛选和搜索。',
      },
    ],
  },
  {
    category: '账户管理',
    questions: [
      {
        q: '如何修改个人信息？',
        a: '进入"账户设置"页面，可以修改用户名、邮箱、头像等个人信息。',
      },
      {
        q: '如何重置密码？',
        a: '在登录页面点击"忘记密码"，按照提示通过邮箱验证后即可重置密码。',
      },
      {
        q: '如何管理 API 密钥？',
        a: '在"账户设置"的"API 管理"标签页中，可以创建、查看和删除 API 密钥。',
      },
    ],
  },
  {
    category: '故障排查',
    questions: [
      {
        q: '智能体响应很慢怎么办？',
        a: '可能是网络问题或服务器负载较高。建议检查网络连接，或稍后再试。如果问题持续，请联系技术支持。',
      },
      {
        q: '为什么智能体回复不准确？',
        a: '可以尝试优化系统提示词，提供更清晰的指令；或者调整温度参数，降低温度可以获得更精确的回复。',
      },
      {
        q: '如何报告 Bug？',
        a: '可以通过页面右下角的"反馈"按钮提交问题，或发送邮件至 support@aether.ai。',
      },
    ],
  },
]

const Help = () => {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }))

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-headline text-5xl font-extrabold text-white leading-none tracking-tighter mb-3">
          帮助中心
        </h1>
        <p className="text-slate-400 text-lg">快速找到您需要的答案和指南</p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 bg-surface-container-low rounded-2xl px-6 py-4 border border-outline-variant/10">
            <span className="material-symbols-outlined text-primary text-2xl">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索问题或关键词..."
              className="bg-transparent border-none focus:ring-0 text-base w-full text-white placeholder-slate-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-primary/20 to-primary-container/20 rounded-3xl p-6 border border-primary/20 hover:scale-105 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-4xl text-primary mb-4">rocket_launch</span>
          <h3 className="font-headline text-lg font-bold text-white mb-2">快速开始</h3>
          <p className="text-sm text-slate-400">5分钟上手指南</p>
        </div>
        <div className="bg-gradient-to-br from-secondary/20 to-secondary-container/20 rounded-3xl p-6 border border-secondary/20 hover:scale-105 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-4xl text-secondary mb-4">video_library</span>
          <h3 className="font-headline text-lg font-bold text-white mb-2">视频教程</h3>
          <p className="text-sm text-slate-400">观看操作演示</p>
        </div>
        <div className="bg-gradient-to-br from-tertiary/20 to-tertiary-container/20 rounded-3xl p-6 border border-tertiary/20 hover:scale-105 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-4xl text-tertiary mb-4">description</span>
          <h3 className="font-headline text-lg font-bold text-white mb-2">API 文档</h3>
          <p className="text-sm text-slate-400">开发者接口文档</p>
        </div>
        <div className="bg-gradient-to-br from-primary-container/20 to-on-primary-fixed-variant/20 rounded-3xl p-6 border border-primary-container/20 hover:scale-105 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-4xl text-primary-container mb-4">support_agent</span>
          <h3 className="font-headline text-lg font-bold text-white mb-2">联系支持</h3>
          <p className="text-sm text-slate-400">获取人工帮助</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="grid grid-cols-4 gap-6">
        {/* Category Sidebar */}
        <div className="col-span-1">
          <div className="bg-surface-container-low rounded-3xl p-4 sticky top-28">
            <h3 className="font-headline text-sm font-bold text-white mb-4 px-4">分类</h3>
            <div className="space-y-2">
              {faqs.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(index)}
                  className={`w-full text-left px-4 py-3 rounded-2xl transition-all ${
                    selectedCategory === index
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-slate-400 hover:bg-surface-container hover:text-white'
                  }`}
                >
                  <span className="text-sm font-medium">{category.category}</span>
                  <span className="ml-2 text-xs opacity-60">({category.questions.length})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="col-span-3">
          <div className="bg-surface-container-low rounded-3xl p-8">
            <h2 className="font-headline text-2xl font-bold text-white mb-6">
              {faqs[selectedCategory].category}
            </h2>
            <div className="space-y-4">
              {filteredFaqs[selectedCategory].questions.map((item, index) => (
                <div
                  key={index}
                  className="bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/10"
                >
                  <button
                    onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-surface-container-high transition-all"
                  >
                    <span className="font-medium text-white pr-4">{item.q}</span>
                    <span
                      className={`material-symbols-outlined text-primary transition-transform ${
                        expandedQuestion === index ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {expandedQuestion === index && (
                    <div className="px-6 py-4 border-t border-outline-variant/10 bg-surface-container-highest/30">
                      <p className="text-slate-300 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
              {filteredFaqs[selectedCategory].questions.length === 0 && (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-5xl text-slate-600 mb-3">search_off</span>
                  <p className="text-slate-400">未找到匹配的问题</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline text-2xl font-bold text-white mb-2">还有其他问题？</h3>
            <p className="text-slate-400">我们的支持团队随时为您提供帮助</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-2xl bg-surface-container text-white font-medium hover:bg-surface-container-high transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">mail</span>
              发送邮件
            </button>
            <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed font-bold hover:shadow-lg transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">chat</span>
              在线客服
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
