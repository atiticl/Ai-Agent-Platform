import { useState } from 'react'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

// 模拟对话历史
const mockConversations = [
  { id: 1, name: '产品需求讨论', lastMessage: '好的，我会整理需求文档', time: '2分钟前', unread: 2 },
  { id: 2, name: '代码审查', lastMessage: '这段代码可以优化...', time: '10分钟前', unread: 0 },
  { id: 3, name: '数据分析报告', lastMessage: '已生成可视化图表', time: '1小时前', unread: 0 },
  { id: 4, name: '文案创作', lastMessage: '第三版文案已完成', time: '昨天', unread: 0 },
]

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: '你好！我是 NEXUS-01，您的 AI 助手。有什么我可以帮助您的吗？',
      timestamp: '10:30',
    },
    {
      id: 2,
      role: 'user',
      content: '帮我分析一下这个产品的市场定位',
      timestamp: '10:32',
    },
    {
      id: 3,
      role: 'assistant',
      content: '好的，我会从以下几个维度为您分析产品的市场定位：\n\n1. 目标用户群体\n2. 竞争对手分析\n3. 差异化优势\n4. 市场机会\n\n请问您的产品是什么类型的？',
      timestamp: '10:32',
    },
    {
      id: 4,
      role: 'user',
      content: '是一个企业级的 AI 智能体平台',
      timestamp: '10:35',
    },
    {
      id: 5,
      role: 'assistant',
      content: '明白了。企业级 AI 智能体平台是一个很有前景的方向。让我为您详细分析：\n\n**目标用户群体：**\n- 中大型企业的技术团队\n- 需要自动化业务流程的企业\n- 希望提升效率的创新型公司\n\n**市场机会：**\n- AI 技术快速发展，企业数字化转型需求强烈\n- 降本增效是企业永恒的追求\n- 定制化 AI 解决方案市场空间大\n\n需要我继续深入分析吗？',
      timestamp: '10:36',
    },
  ])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages([...messages, newMessage])
    setInputMessage('')

    // 模拟 AI 回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: '这是一个模拟回复。在实际应用中，这里会调用后端 API 获取 AI 的真实响应。',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="h-[calc(100vh-7rem)] flex gap-6">
      {/* Conversations Sidebar */}
      <div className="w-80 bg-surface-container-low rounded-3xl flex flex-col">
        {/* Search */}
        <div className="p-6 border-b border-outline-variant/10">
          <div className="flex items-center gap-3 bg-surface-container rounded-2xl px-4 py-3">
            <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
            <input
              type="text"
              placeholder="搜索对话..."
              className="bg-transparent border-none focus:ring-0 text-sm w-full text-white placeholder-slate-500 outline-none"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {mockConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all ${
                selectedConversation === conv.id
                  ? 'bg-primary/10 border border-primary/20'
                  : 'hover:bg-surface-container'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-white text-sm">{conv.name}</h4>
                {conv.unread > 0 && (
                  <span className="bg-secondary text-on-secondary text-xs font-bold px-2 py-0.5 rounded-full">
                    {conv.unread}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 truncate mb-1">{conv.lastMessage}</p>
              <p className="text-[10px] text-slate-500">{conv.time}</p>
            </div>
          ))}
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-t border-outline-variant/10">
          <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            新建对话
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-surface-container-low rounded-3xl flex flex-col">
        {/* Chat Header */}
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">smart_toy</span>
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-white">NEXUS-01</h3>
              <p className="text-xs text-secondary flex items-center gap-1">
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                在线
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-xl bg-surface-container text-slate-400 hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">refresh</span>
            </button>
            <button className="p-2 rounded-xl bg-surface-container text-slate-400 hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">more_vert</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-primary/20'
                    : 'bg-secondary/20'
                }`}
              >
                <span className={`material-symbols-outlined text-sm ${
                  message.role === 'user' ? 'text-primary' : 'text-secondary'
                }`}>
                  {message.role === 'user' ? 'person' : 'smart_toy'}
                </span>
              </div>
              <div className={`flex-1 ${message.role === 'user' ? 'flex flex-col items-end' : ''}`}>
                <div
                  className={`inline-block max-w-[80%] p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-outline-variant/10">
          <div className="flex gap-4">
            <button className="p-3 rounded-xl bg-surface-container text-slate-400 hover:text-white transition-all">
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <div className="flex-1 flex items-center gap-3 bg-surface-container rounded-2xl px-5 py-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="输入消息..."
                className="bg-transparent border-none focus:ring-0 text-sm w-full text-white placeholder-slate-500 outline-none"
              />
              <button className="text-slate-400 hover:text-white transition-all">
                <span className="material-symbols-outlined text-sm">sentiment_satisfied</span>
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed font-bold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">send</span>
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
