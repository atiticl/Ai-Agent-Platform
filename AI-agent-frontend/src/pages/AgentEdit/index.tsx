import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, message } from 'antd'
import type { UploadFile } from 'antd'
import {
  getAgentById,
  updateAgent,
  type Agent,
  type CreateAgentDto,
} from '@/api/agents'
import AgentFormFields from '@/components/AgentFormFields'

const AgentEdit = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [form] = Form.useForm<CreateAgentDto>()
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setNotFound(false)
    getAgentById(Number(id))
      .then((res) => {
        if (cancelled) return
        const a = res as unknown as Agent
        setAgent(a)
        form.setFieldsValue({
          name: a.name,
          type: a.type,
          description: a.description,
          model: a.model,
          temperature: a.temperature ?? 0.7,
          systemPrompt: a.systemPrompt,
        })
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
  }, [id, form])

  const handleSubmit = async (values: CreateAgentDto) => {
    if (!agent) return
    setSaving(true)
    try {
      await updateAgent(agent.id, values)
      message.success('已保存修改')
      navigate(`/agents/${agent.id}`)
    } catch {
      message.error('保存失败')
    } finally {
      setSaving(false)
    }
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

  return (
    <div className="relative h-[calc(100vh-10rem)] flex flex-col bg-gradient-to-b from-surface-container-low to-surface-container rounded-3xl overflow-hidden border border-outline-variant/15">
      {/* Decorative glow blobs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex items-center justify-between px-8 py-5 border-b border-outline-variant/10 bg-gradient-to-r from-primary/[0.07] via-transparent to-secondary/[0.07]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/agents/${agent.id}`)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-surface-container transition-all"
            title="返回"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/15 border border-primary/30">
            <span className="material-symbols-outlined text-primary text-2xl drop-shadow-[0_0_10px_rgba(208,188,255,0.6)]">tune</span>
          </div>
          <div>
            <h2 className="text-2xl font-headline font-bold text-white tracking-tight">编辑智能体</h2>
            <p className="text-sm text-on-surface-variant/80 mt-0.5">
              修改「<span className="text-primary">{agent.name}</span>」的基础信息、模型参数与知识库
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-3xl mx-auto">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <AgentFormFields fileList={fileList} setFileList={setFileList} />
          </Form>
        </div>
      </div>

      {/* Footer */}
      <div className="relative px-8 py-4 border-t border-outline-variant/10 bg-surface-container/80 backdrop-blur-sm flex gap-3 justify-end">
        <button
          onClick={() => navigate(`/agents/${agent.id}`)}
          className="px-6 py-2.5 rounded-xl bg-surface-container-high text-white font-medium hover:bg-surface-container-highest transition-all"
        >
          取消
        </button>
        <button
          onClick={() => form.submit()}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary via-primary-container to-secondary-container text-on-primary font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center gap-2"
        >
          {saving ? (
            <>
              <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
              保存中...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm">save</span>
              保存修改
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default AgentEdit
