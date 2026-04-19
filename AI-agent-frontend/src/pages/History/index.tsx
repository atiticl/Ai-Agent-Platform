import { useState } from 'react'

interface HistoryItem {
  id: number
  type: 'conversation' | 'task' | 'deployment'
  title: string
  agent: string
  timestamp: string
  status: 'success' | 'failed' | 'pending'
  details: string
}

const mockHistory: HistoryItem[] = [
  {
    id: 1,
    type: 'conversation',
    title: '产品需求分析对话',
    agent: 'NEXUS-01',
    timestamp: '2024-01-20 14:30',
    status: 'success',
    details: '完成了 45 轮对话，生成了需求文档',
  },
  {
    id: 2,
    type: 'task',
    title: '代码生成任务',
    agent: 'CodeMaster',
    timestamp: '2024-01-20 12:15',
    status: 'success',
    details: '生成了 3 个 React 组件，共 450 行代码',
  },
  {
    id: 3,
    type: 'deployment',
    title: '部署新智能体',
    agent: 'DataAnalyzer',
    timestamp: '2024-01-20 10:00',
    status: 'success',
    details: '成功部署数据分析智能体',
  },
  {
    id: 4,
    type: 'conversation',
    title: '市场调研讨论',
    agent: 'NEXUS-01',
    timestamp: '2024-01-19 16:45',
    status: 'success',
    details: '分析了 5 个竞品，生成了对比报告',
  },
  {
    id: 5,
    type: 'task',
    title: '数据可视化',
    agent: 'DataAnalyzer',
    timestamp: '2024-01-19 14:20',
    status: 'failed',
    details: '数据格式错误，任务失败',
  },
  {
    id: 6,
    type: 'conversation',
    title: '文案创作',
    agent: 'ContentWriter',
    timestamp: '2024-01-19 11:30',
    status: 'success',
    details: '生成了 3 版营销文案',
  },
  {
    id: 7,
    type: 'task',
    title: 'API 文档生成',
    agent: 'CodeMaster',
    timestamp: '2024-01-18 15:00',
    status: 'success',
    details: '自动生成了完整的 API 文档',
  },
  {
    id: 8,
    type: 'deployment',
    title: '更新智能体配置',
    agent: 'NEXUS-01',
    timestamp: '2024-01-18 09:30',
    status: 'success',
    details: '更新了系统提示词和温度参数',
  },
]

const History = () => {
  const [filter, setFilter] = useState<'all' | 'conversation' | 'task' | 'deployment'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredHistory = mockHistory.filter((item) => {
    const matchesFilter = filter === 'all' || item.type === filter
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.agent.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'conversation':
        return 'chat'
      case 'task':
        return 'task_alt'
      case 'deployment':
        return 'rocket_launch'
      default:
        return 'history'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'conversation':
        return 'text-primary'
      case 'task':
        return 'text-secondary'
      case 'deployment':
        return 'text-tertiary'
      default:
        return 'text-slate-400'
    }
  }

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'conversation':
        return 'bg-primary/10 border-primary/20'
      case 'task':
        return 'bg-secondary/10 border-secondary/20'
      case 'deployment':
        return 'bg-tertiary/10 border-tertiary/20'
      default:
        return 'bg-slate-500/10 border-slate-500/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return 'check_circle'
      case 'failed':
        return 'error'
      case 'pending':
        return 'schedule'
      default:
        return 'help'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-secondary'
      case 'failed':
        return 'text-error'
      case 'pending':
        return 'text-primary-container'
      default:
        return 'text-slate-400'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-headline text-5xl font-extrabold text-white leading-none tracking-tighter mb-3">
          历史记录
        </h1>
        <p className="text-slate-400 text-lg">查看所有智能体活动和任务历史</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-surface-container-low rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">chat</span>
            </div>
            <div>
              <p className="text-xs font-label uppercase tracking-widest text-slate-500">对话</p>
              <p className="text-2xl font-bold text-white">
                {mockHistory.filter((h) => h.type === 'conversation').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">task_alt</span>
            </div>
            <div>
              <p className="text-xs font-label uppercase tracking-widest text-slate-500">任务</p>
              <p className="text-2xl font-bold text-white">
                {mockHistory.filter((h) => h.type === 'task').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary">rocket_launch</span>
            </div>
            <div>
              <p className="text-xs font-label uppercase tracking-widest text-slate-500">部署</p>
              <p className="text-2xl font-bold text-white">
                {mockHistory.filter((h) => h.type === 'deployment').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">check_circle</span>
            </div>
            <div>
              <p className="text-xs font-label uppercase tracking-widest text-slate-500">成功率</p>
              <p className="text-2xl font-bold text-secondary">
                {((mockHistory.filter((h) => h.status === 'success').length / mockHistory.length) * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'all'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-slate-400 hover:text-white'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setFilter('conversation')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'conversation'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-slate-400 hover:text-white'
            }`}
          >
            对话
          </button>
          <button
            onClick={() => setFilter('task')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'task'
                ? 'bg-secondary text-on-secondary'
                : 'bg-surface-container text-slate-400 hover:text-white'
            }`}
          >
            任务
          </button>
          <button
            onClick={() => setFilter('deployment')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'deployment'
                ? 'bg-tertiary text-on-tertiary'
                : 'bg-surface-container text-slate-400 hover:text-white'
            }`}
          >
            部署
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-surface-container rounded-full px-5 py-2">
            <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索历史..."
              className="bg-transparent border-none focus:ring-0 text-sm w-48 text-white placeholder-slate-500 outline-none"
            />
          </div>
          <button className="px-6 py-2 rounded-full bg-surface-container text-slate-400 hover:text-white transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">download</span>
            导出
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="bg-surface-container-low rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-container">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-label uppercase tracking-widest text-slate-500">
                  类型
                </th>
                <th className="text-left px-6 py-4 text-xs font-label uppercase tracking-widest text-slate-500">
                  标题
                </th>
                <th className="text-left px-6 py-4 text-xs font-label uppercase tracking-widest text-slate-500">
                  智能体
                </th>
                <th className="text-left px-6 py-4 text-xs font-label uppercase tracking-widest text-slate-500">
                  时间
                </th>
                <th className="text-left px-6 py-4 text-xs font-label uppercase tracking-widest text-slate-500">
                  状态
                </th>
                <th className="text-left px-6 py-4 text-xs font-label uppercase tracking-widest text-slate-500">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-t border-outline-variant/10 hover:bg-surface-container transition-all ${
                    index % 2 === 0 ? 'bg-surface-container-low' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${getTypeBg(
                        item.type
                      )} ${getTypeColor(item.type)}`}
                    >
                      <span className="material-symbols-outlined text-sm">{getTypeIcon(item.type)}</span>
                      {item.type === 'conversation' ? '对话' : item.type === 'task' ? '任务' : '部署'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.details}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-300">{item.agent}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-400 text-sm">{item.timestamp}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-2 ${getStatusColor(item.status)}`}>
                      <span className="material-symbols-outlined text-sm">{getStatusIcon(item.status)}</span>
                      {item.status === 'success' ? '成功' : item.status === 'failed' ? '失败' : '进行中'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-surface-container-high text-slate-400 hover:text-white transition-all">
                        <span className="material-symbols-outlined text-sm">visibility</span>
                      </button>
                      <button className="p-2 rounded-lg bg-surface-container-high text-slate-400 hover:text-white transition-all">
                        <span className="material-symbols-outlined text-sm">download</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-slate-600 mb-4">search_off</span>
            <p className="text-slate-400 text-lg">未找到匹配的历史记录</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default History
