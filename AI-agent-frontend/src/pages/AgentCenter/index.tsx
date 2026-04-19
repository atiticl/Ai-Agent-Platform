import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dropdown, Modal, Input, message } from 'antd'
import type { MenuProps } from 'antd'
import {
  createAgent,
  deleteAgent as apiDeleteAgent,
  getAgents,
  updateAgent,
  type Agent,
  type CreateAgentDto,
} from '@/api/agents'
import AgentFormModal from '@/components/AgentFormModal'

type FilterStatus = 'all' | 'active' | 'idle'

const AgentCenter = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  const [renameTarget, setRenameTarget] = useState<Agent | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const [renaming, setRenaming] = useState(false)

  const [createOpen, setCreateOpen] = useState(false)
  const [creating, setCreating] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const list = (await getAgents()) as unknown as Agent[]
      setAgents(list)
    } catch (e) {
      message.error('加载智能体失败')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filteredAgents = agents.filter((agent) => {
    const matchesFilter = filter === 'all' || agent.status === filter
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      !q ||
      agent.name.toLowerCase().includes(q) ||
      agent.type.toLowerCase().includes(q)
    return matchesFilter && matchesSearch
  })

  const openRename = (agent: Agent) => {
    setRenameTarget(agent)
    setRenameValue(agent.name)
  }

  const submitRename = async () => {
    if (!renameTarget) return
    const name = renameValue.trim()
    if (!name) {
      message.warning('名称不能为空')
      return
    }
    if (name === renameTarget.name) {
      setRenameTarget(null)
      return
    }
    setRenaming(true)
    try {
      await updateAgent(renameTarget.id, { name })
      setAgents((prev) =>
        prev.map((a) => (a.id === renameTarget.id ? { ...a, name } : a))
      )
      message.success('已重命名')
      setRenameTarget(null)
    } catch {
      message.error('重命名失败')
    } finally {
      setRenaming(false)
    }
  }

  const confirmDelete = (agent: Agent) => {
    Modal.confirm({
      title: '删除智能体',
      content: `确定要删除「${agent.name}」吗？该操作不可撤销。`,
      okText: '删除',
      okButtonProps: { danger: true },
      cancelText: '取消',
      onOk: async () => {
        try {
          await apiDeleteAgent(agent.id)
          setAgents((prev) => prev.filter((a) => a.id !== agent.id))
          message.success('已删除')
        } catch {
          message.error('删除失败')
        }
      },
    })
  }

  const handleCreateAgent = async (values: CreateAgentDto) => {
    setCreating(true)
    try {
      const newAgent = (await createAgent(values)) as unknown as Agent
      setAgents((prev) => [newAgent, ...prev])
      message.success('智能体创建成功')
      setCreateOpen(false)
    } catch {
      message.error('创建失败')
    } finally {
      setCreating(false)
    }
  }

  const buildMenu = (agent: Agent): MenuProps['items'] => [
    {
      key: 'rename',
      label: '重命名',
      icon: <span className="material-symbols-outlined text-sm">edit</span>,
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation()
        openRename(agent)
      },
    },
    {
      key: 'delete',
      label: '删除',
      danger: true,
      icon: <span className="material-symbols-outlined text-sm">delete</span>,
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation()
        confirmDelete(agent)
      },
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-headline text-4xl font-extrabold text-white leading-none tracking-tighter mb-2">
          智能体中心
        </h1>
        <p className="text-slate-400 text-sm">管理和监控您的 AI 智能体网络</p>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-5 gap-4 flex-wrap">
        <div className="flex gap-2">
          {(
            [
              { key: 'all', label: '全部', active: 'bg-primary text-on-primary' },
              { key: 'active', label: '活跃', active: 'bg-secondary text-on-secondary' },
              { key: 'idle', label: '待机', active: 'bg-slate-600 text-white' },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === f.key ? f.active : 'bg-surface-container text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-container rounded-full px-4 py-1.5">
            <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索智能体..."
              className="bg-transparent border-none focus:ring-0 text-sm w-44 text-white placeholder-slate-500 outline-none"
            />
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed font-bold hover:shadow-lg transition-all text-sm"
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">add</span>
              创建智能体
            </span>
          </button>
        </div>
      </div>

      {/* Agents Grid */}
      {loading ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-4xl text-slate-500 animate-spin">
            progress_activity
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-surface-container-low rounded-2xl p-4 hover:bg-surface-container transition-all cursor-pointer group flex flex-col"
              onClick={() => navigate(`/agents/${agent.id}`)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20 flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-lg">smart_toy</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-headline text-sm font-bold text-white truncate">
                      {agent.name}
                    </h3>
                    <span className="text-[10px] text-slate-400">{agent.type}</span>
                  </div>
                </div>
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                    agent.status === 'active' ? 'bg-secondary' : 'bg-slate-500'
                  } shadow-[0_0_8px_currentColor]`}
                ></span>
              </div>

              <p className="text-slate-400 text-xs mb-3 leading-relaxed line-clamp-2 min-h-[2.25rem]">
                {agent.description}
              </p>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-outline-variant/10 mb-3">
                <div>
                  <p className="text-[9px] font-label uppercase tracking-wider text-slate-500 mb-0.5">
                    活跃
                  </p>
                  <p className="text-[11px] font-bold text-white truncate">{agent.lastActive}</p>
                </div>
                <div>
                  <p className="text-[9px] font-label uppercase tracking-wider text-slate-500 mb-0.5">
                    任务
                  </p>
                  <p className="text-[11px] font-bold text-white">{agent.tasks}</p>
                </div>
                <div>
                  <p className="text-[9px] font-label uppercase tracking-wider text-slate-500 mb-0.5">
                    准确率
                  </p>
                  <p className="text-[11px] font-bold text-secondary">{agent.accuracy}%</p>
                </div>
              </div>

              <div className="mt-auto flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/agents/${agent.id}`)
                  }}
                  className="flex-1 py-1.5 rounded-lg bg-surface-container-high text-white text-xs font-medium hover:bg-primary/20 transition-all"
                >
                  查看详情
                </button>
                <Dropdown
                  menu={{ items: buildMenu(agent) }}
                  trigger={['click']}
                  placement="bottomRight"
                >
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1.5 rounded-lg bg-surface-container-high text-slate-400 hover:text-white transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">more_horiz</span>
                  </button>
                </Dropdown>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredAgents.length === 0 && (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-5xl text-slate-600 mb-3">search_off</span>
          <p className="text-slate-400 text-sm">未找到匹配的智能体</p>
        </div>
      )}

      {/* Rename Modal */}
      <Modal
        title="重命名智能体"
        open={!!renameTarget}
        onOk={submitRename}
        onCancel={() => setRenameTarget(null)}
        okText="保存"
        cancelText="取消"
        confirmLoading={renaming}
        destroyOnClose
      >
        <Input
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onPressEnter={submitRename}
          placeholder="输入新名称"
          maxLength={40}
          autoFocus
        />
      </Modal>

      {/* Create Agent Modal */}
      <AgentFormModal
        open={createOpen}
        loading={creating}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreateAgent}
      />
    </div>
  )
}

export default AgentCenter
