import type { Dispatch, SetStateAction } from 'react'
import { Form, Input, Select, Slider, Upload } from 'antd'
import type { UploadFile } from 'antd'

const getFileIcon = (name: string) => {
  const ext = name.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'pdf':
      return { icon: 'picture_as_pdf', color: 'text-red-400' }
    case 'json':
      return { icon: 'data_object', color: 'text-amber-300' }
    case 'yaml':
    case 'yml':
      return { icon: 'settings_ethernet', color: 'text-emerald-300' }
    case 'txt':
      return { icon: 'article', color: 'text-sky-300' }
    default:
      return { icon: 'description', color: 'text-primary' }
  }
}

export interface AgentFormFieldsProps {
  fileList: UploadFile[]
  setFileList: Dispatch<SetStateAction<UploadFile[]>>
}

const AgentFormFields = ({ fileList, setFileList }: AgentFormFieldsProps) => {
  const temperature = Form.useWatch('temperature') ?? 0.7

  return (
    <div className="space-y-6">
      <div className="animate-slide-up" style={{ animationDelay: '40ms' }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-base">badge</span>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">基础信息</span>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 via-outline-variant/15 to-transparent" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Form.Item
            label={<span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">智能体名称</span>}
            name="name"
            rules={[{ required: true, message: '请输入名称' }, { max: 40 }]}
          >
            <Input
              placeholder="例如: 客服助手"
              className="bg-surface-container-highest/50 border border-outline-variant/20 rounded-xl h-11 px-4 text-white placeholder:text-slate-500 hover:border-primary/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">智能体类型</span>}
            name="type"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select
              placeholder="选择类型"
              options={[
                { value: 'conversation', label: '对话' },
                { value: 'code', label: '代码生成' },
                { value: 'analysis', label: '数据分析' },
                { value: 'creative', label: '内容创作' },
              ]}
              className="[&_.ant-select-selector]:!bg-surface-container-highest/50 [&_.ant-select-selector]:!border [&_.ant-select-selector]:!border-outline-variant/20 [&_.ant-select-selector]:!h-11 [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:hover:!border-primary/40"
            />
          </Form.Item>
        </div>

        <Form.Item
          label={<span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">描述</span>}
          name="description"
          rules={[{ max: 200 }]}
          className="!mb-0"
        >
          <Input.TextArea
            placeholder="描述智能体的功能和用途..."
            rows={3}
            className="bg-surface-container-highest/50 border border-outline-variant/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 hover:border-primary/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 resize-none transition-all"
          />
        </Form.Item>
      </div>

      <div className="animate-slide-up" style={{ animationDelay: '80ms' }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-secondary text-base">tune</span>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-secondary">模型配置</span>
          <div className="flex-1 h-px bg-gradient-to-r from-secondary/30 via-outline-variant/15 to-transparent" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Form.Item
            label={<span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">基础模型</span>}
            name="model"
            rules={[{ required: true, message: '请选择模型' }]}
            className="!mb-0"
          >
            <Select
              placeholder="选择模型"
              options={[
                { value: 'gpt-4', label: 'GPT-4' },
                { value: 'gpt-3.5', label: 'GPT-3.5' },
                { value: 'claude-3', label: 'Claude 3' },
                { value: 'gemini-pro', label: 'Gemini Pro' },
              ]}
              className="[&_.ant-select-selector]:!bg-surface-container-highest/50 [&_.ant-select-selector]:!border [&_.ant-select-selector]:!border-outline-variant/20 [&_.ant-select-selector]:!h-11 [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:hover:!border-secondary/40"
            />
          </Form.Item>

          <Form.Item
            label={
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">温度参数</span>
                <span className="text-sm font-bold text-secondary font-mono tabular-nums px-2 py-0.5 rounded-md bg-secondary/10 border border-secondary/20">
                  {Number(temperature).toFixed(1)}
                </span>
              </div>
            }
            name="temperature"
            initialValue={0.7}
            rules={[{ required: true }]}
            className="!mb-0"
          >
            <Slider
              min={0}
              max={1}
              step={0.1}
              marks={{ 0: '精确', 0.5: '平衡', 1: '创造' }}
              className="py-3 px-1"
              tooltip={{ open: false }}
            />
          </Form.Item>
        </div>
      </div>

      <div className="animate-slide-up" style={{ animationDelay: '120ms' }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-tertiary text-base">prompt_suggestion</span>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-tertiary">系统提示词</span>
          <div className="flex-1 h-px bg-gradient-to-r from-tertiary/30 via-outline-variant/15 to-transparent" />
        </div>

        <Form.Item name="systemPrompt" className="!mb-0">
          <Input.TextArea
            placeholder="定义智能体的角色、行为和约束..."
            rows={4}
            className="bg-surface-container-highest/50 border border-outline-variant/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 hover:border-tertiary/40 focus:border-tertiary/60 focus:ring-2 focus:ring-tertiary/20 resize-none font-mono text-sm transition-all"
          />
        </Form.Item>
      </div>

      <div className="animate-slide-up" style={{ animationDelay: '160ms' }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-base">folder_special</span>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">知识库</span>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 via-outline-variant/15 to-transparent" />
          {fileList.length > 0 && (
            <span className="text-[10px] font-semibold text-primary/80 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
              {fileList.length} 个文件
            </span>
          )}
        </div>

        <Form.Item className="!mb-0">
          <Upload
            accept=".pdf,.json,.txt,.yaml,.yml"
            multiple
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={() => false}
            showUploadList={false}
            className="block [&_.ant-upload]:w-full [&_.ant-upload-select]:w-full"
          >
            <div className="w-full px-6 py-7 rounded-2xl bg-gradient-to-br from-primary/[0.06] via-surface-container-highest/30 to-secondary/[0.06] border-2 border-dashed border-primary/30 hover:border-primary/60 hover:from-primary/[0.12] hover:to-secondary/[0.12] transition-all cursor-pointer flex flex-col items-center gap-2 group">
              <span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform drop-shadow-[0_0_12px_rgba(208,188,255,0.4)]">cloud_upload</span>
              <p className="text-sm font-semibold text-white">点击或拖拽上传配置文件</p>
              <p className="text-xs text-slate-500">支持 PDF · JSON · YAML · TXT</p>
            </div>
          </Upload>

          {fileList.length > 0 && (
            <div className="space-y-2 mt-3 max-h-64 overflow-y-auto pr-1">
              {fileList.map((file) => {
                const { icon, color } = getFileIcon(file.name)
                return (
                  <div
                    key={file.uid}
                    className="flex items-center gap-3 p-3 bg-surface-container/70 rounded-xl border border-outline-variant/10 hover:border-primary/30 hover:bg-surface-container transition-all group animate-slide-up"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container-highest/60">
                      <span className={`material-symbols-outlined text-lg ${color}`}>{icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{file.name}</p>
                      {file.size && (
                        <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(2)} KB</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFileList(fileList.filter((f) => f.uid !== file.uid))}
                      className="p-2 opacity-0 group-hover:opacity-100 hover:bg-error/20 rounded-lg transition-all"
                    >
                      <span className="material-symbols-outlined text-sm text-slate-400 hover:text-error">close</span>
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </Form.Item>
      </div>
    </div>
  )
}

export default AgentFormFields
