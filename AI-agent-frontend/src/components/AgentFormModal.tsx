import { useEffect, useState } from 'react'
import { Form } from 'antd'
import type { UploadFile } from 'antd'
import type { CreateAgentDto } from '@/api/agents'
import AgentFormFields from './AgentFormFields'

export interface AgentFormModalProps {
  open: boolean
  loading?: boolean
  onClose: () => void
  onSubmit: (values: CreateAgentDto) => Promise<void> | void
}

const AgentFormModal = ({ open, loading = false, onClose, onSubmit }: AgentFormModalProps) => {
  const [form] = Form.useForm<CreateAgentDto>()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (!open) {
      form.resetFields()
      setFileList([])
    }
  }, [open, form])

  if (!open) return null

  const handleClose = () => {
    form.resetFields()
    setFileList([])
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-backdrop-in">
      <div className="relative bg-gradient-to-b from-surface-container-low to-surface-container rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border border-outline-variant/15 animate-modal-in">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />

        <div className="relative flex items-center justify-between px-8 py-6 border-b border-outline-variant/10 bg-gradient-to-r from-primary/[0.07] via-transparent to-secondary/[0.07]">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/15 border border-primary/30">
              <span className="material-symbols-outlined text-primary text-2xl drop-shadow-[0_0_10px_rgba(208,188,255,0.6)]">auto_awesome</span>
            </div>
            <div>
              <h2 className="text-2xl font-headline font-bold text-white tracking-tight">创建智能体</h2>
              <p className="text-sm text-on-surface-variant/80 mt-0.5">配置基础信息、模型参数与知识库</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-surface-container-high rounded-xl transition-all">
            <span className="material-symbols-outlined text-slate-400">close</span>
          </button>
        </div>

        <div className="relative overflow-y-auto px-8 py-6" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          <Form form={form} layout="vertical" onFinish={(values) => onSubmit(values)}>
            <AgentFormFields fileList={fileList} setFileList={setFileList} />
          </Form>
        </div>

        <div className="relative px-8 py-4 border-t border-outline-variant/10 bg-surface-container/80 backdrop-blur-sm flex gap-3 justify-end">
          <button
            onClick={handleClose}
            className="px-6 py-2.5 rounded-xl bg-surface-container-high text-white font-medium hover:bg-surface-container-highest transition-all"
          >
            取消
          </button>
          <button
            onClick={() => form.submit()}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary via-primary-container to-secondary-container text-on-primary font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                创建中...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
                创建智能体
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AgentFormModal
