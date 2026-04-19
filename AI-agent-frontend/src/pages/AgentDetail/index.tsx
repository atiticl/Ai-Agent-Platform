import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAgentById, type Agent } from '@/api/agents'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

const SUGGESTED_PROMPTS: Record<string, string[]> = {
  '对话助手': [
    '帮我梳理一下今天的工作重点',
    '用简单的语言解释一下量子计算',
    '给我讲一个关于坚持的小故事',
    '面试官问我职业规划，我该怎么回答？',
  ],
  '代码生成': [
    '用 TypeScript 写一个防抖函数',
    '帮我 review 一段 React 组件',
    '解释一下 useMemo 和 useCallback 的区别',
    '生成一个二分查找的模板',
  ],
  '数据分析': [
    '给我一份本月活跃用户的分析思路',
    '怎样识别数据中的异常值？',
    '用 SQL 统计每日留存率',
    '对比两个时间段指标的常见方法',
  ],
  '内容创作': [
    '写一篇 300 字的产品发布会开场',
    '给这篇文章起 5 个吸引人的标题',
    '帮我把这段话改得更简洁有力',
    '生成一份活动邀请邮件',
  ],
}

const DEFAULT_PROMPTS = [
  '介绍一下你自己',
  '你最擅长解决哪类问题？',
  '给我看一个使用示例',
  '你有什么限制？',
]

const nowTime = () =>
  new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setNotFound(false)
    getAgentById(Number(id))
      .then((res) => {
        if (cancelled) return
        setAgent(res as unknown as Agent)
      })
      .catch(() => {
        if (!cancelled) setNotFound(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, sending])

  const autoGrow = () => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px'
  }

  const send = (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || sending) return

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content,
      timestamp: nowTime(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    setSending(true)

    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: agent
          ? `（${agent.name} mock 回复）\n\n收到你的提问："${content}"\n\n这里可以接入真实模型，比如 ${agent.model || 'claude-opus-4-7'}。`
          : `收到："${content}"`,
        timestamp: nowTime(),
      }
      setMessages((prev) => [...prev, reply])
      setSending(false)
    }, 800)
  }

  if (loading) {
    return (
      <div className="h-[calc(100vh-10rem)] flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-slate-500 animate-spin">progress_activity</span>
      </div>
    )
  }

  if (notFound || !agent) {
    return (
      <div className="h-[calc(100vh-10rem)] flex flex-col items-center justify-center gap-4">
        <span className="material-symbols-outlined text-6xl text-slate-600">search_off</span>
        <p className="text-slate-400">未找到该智能体</p>
        <button
          onClick={() => navigate('/agents')}
          className="px-5 py-2 rounded-full bg-surface-container text-white hover:bg-primary/20 transition-all text-sm"
        >
          返回智能体中心
        </button>
      </div>
    )
  }

  const prompts = SUGGESTED_PROMPTS[agent.type] || DEFAULT_PROMPTS
  const isEmpty = messages.length === 0

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col bg-surface-container-low rounded-3xl overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-outline-variant/10">
        <button
          onClick={() => navigate('/agents')}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-surface-container transition-all"
          title="返回"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20">
          <span className="material-symbols-outlined text-primary">smart_toy</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-headline text-lg font-bold text-white truncate">{agent.name}</h2>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                agent.status === 'active' ? 'bg-secondary' : 'bg-slate-500'
              } shadow-[0_0_8px_currentColor]`}
            ></span>
            <span className={`text-xs ${agent.status === 'active' ? 'text-secondary' : 'text-slate-500'}`}>
              {agent.status === 'active' ? '在线' : '待机'}
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate">
            {agent.type} · {agent.model || 'claude-opus-4-7'} · 任务数 {agent.tasks} · 准确率 {agent.accuracy}%
          </p>
        </div>
        <button
          onClick={() => navigate(`/agents/${agent.id}/edit`)}
          className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/60 transition-all text-sm flex items-center gap-2"
          title="编辑智能体"
        >
          <span className="material-symbols-outlined text-sm">edit</span>
          编辑
        </button>
        <button
          onClick={() => setMessages([])}
          className="px-4 py-2 rounded-xl bg-surface-container text-slate-400 hover:text-white transition-all text-sm flex items-center gap-2"
          title="清空对话"
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          新对话
        </button>
      </div>

      {/* Messages / Empty */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center px-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20 mb-6">
              <span className="material-symbols-outlined text-primary text-4xl">smart_toy</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-white mb-2">{agent.name}</h3>
            <p className="text-slate-400 text-sm mb-8 text-center max-w-md">{agent.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
              {prompts.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="text-left px-4 py-3 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/10 hover:border-primary/30 transition-all text-sm text-slate-300"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    m.role === 'user' ? 'bg-primary/20' : 'bg-secondary/20'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-sm ${
                      m.role === 'user' ? 'text-primary' : 'text-secondary'
                    }`}
                  >
                    {m.role === 'user' ? 'person' : 'smart_toy'}
                  </span>
                </div>
                <div className={`flex-1 min-w-0 ${m.role === 'user' ? 'flex flex-col items-end' : ''}`}>
                  {m.role === 'user' ? (
                    <div className="inline-block max-w-[85%] px-4 py-3 rounded-2xl bg-primary text-on-primary">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{m.content}</p>
                    </div>
                  ) : (
                    <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {m.content}
                    </div>
                  )}
                  <p className="text-[10px] text-slate-500 mt-1.5">{m.timestamp}</p>
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-sm text-secondary">smart_toy</span>
                </div>
                <div className="flex items-center gap-1.5 pt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-6 pb-6 pt-2">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2 bg-surface-container rounded-3xl border border-outline-variant/10 focus-within:border-primary/40 transition-colors px-3 py-2">
            <button
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-surface-container-high transition-all flex-shrink-0"
              title="附件"
            >
              <span className="material-symbols-outlined text-base">attach_file</span>
            </button>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                autoGrow()
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              rows={1}
              placeholder={`向 ${agent.name} 提问...（Enter 发送，Shift+Enter 换行）`}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 text-white placeholder-slate-500 outline-none resize-none leading-6 max-h-[200px]"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || sending}
              className="p-2 rounded-xl bg-primary text-on-primary disabled:bg-surface-container-high disabled:text-slate-500 hover:shadow-[0_0_20px_rgba(208,188,255,0.3)] transition-all flex-shrink-0"
              title="发送"
            >
              <span className="material-symbols-outlined text-base">arrow_upward</span>
            </button>
          </div>
          <p className="text-[10px] text-slate-600 text-center mt-2">
            {agent.name} 可能会犯错。请核对重要信息。
          </p>
        </div>
      </div>
    </div>
  )
}

export default AgentDetail
