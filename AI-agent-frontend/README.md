# Aether OS - 企业级 AI 智能体平台

<div align="center">
  <h3>🚀 现代化的企业级 AI 智能体管理平台</h3>
  <p>完整的前端框架 | 精美的 UI 设计 | 开箱即用</p>
</div>

---

## ✨ 项目状态

**✅ 前端页面框架已完成，支持 Mock / 真实后端无缝切换**

- 9 个完整页面（登录、注册、仪表板、智能体中心、详情、编辑、聊天、历史、帮助、设置）
- 基于 React Router v6 的完整路由配置与权限守卫
- 内置 Mock 数据层，可一键切换真实 API
- 类型齐全的 API 接口定义（`src/api/`）

## 📸 页面一览

- **登录 / 注册**：科技感设计，支持第三方登录入口
- **仪表板 (Dashboard)**：实时智能体监控和性能指标
- **智能体中心 (Agent Center)**：智能体列表、筛选与管理
- **智能体详情 / 编辑 (Agent Detail / Edit)**：查看与修改智能体配置
- **实时聊天 (Chat)**：流畅的对话体验
- **历史记录 (History)**：完整的活动追踪
- **帮助中心 (Help)** / **账户设置 (Settings)**

## 🎯 核心功能

- ✅ 用户认证（登录 / 注册）与权限路由守卫
- ✅ 智能体管理（创建 / 查看 / 编辑 / 筛选）
- ✅ 实时对话系统
- ✅ 历史记录追踪
- ✅ 账户设置管理
- ✅ 帮助中心
- ✅ Mock / 真实 API 切换（通过 `VITE_ENABLE_MOCK` 开关）

## 🛠️ 技术栈

### 核心技术
- **React 18** + **TypeScript 5**
- **Vite 5** - 极速构建工具
- **React Router v6** - 路由管理
- **Zustand** - 轻量级状态管理
- **Axios** - HTTP 客户端

### UI 和样式
- **Ant Design 5** - 企业级组件库
- **Tailwind CSS 3** - 原子化 CSS
- **clsx** - 条件类名工具
- 设计体系参见 [DESIGN.md](./DESIGN.md)

## 🚀 快速开始

### 1. 安装依赖
```bash
cd AI-agent-frontend
npm install
```

### 2. 配置环境变量
```bash
cp .env.example .env.development
# 按需修改 VITE_API_BASE_URL 与 VITE_ENABLE_MOCK
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 访问应用
```
http://localhost:3000
```

> 开发服务器默认端口为 `3000`（见 [vite.config.ts](./vite.config.ts)），并将 `/api` 代理到 `http://localhost:8000`。

### 5. 默认登录
- 开启 Mock 时，任意邮箱和密码即可登录

## 📁 项目结构

```
AI-agent-frontend/
├── src/
│   ├── api/                   # API 接口层
│   │   ├── auth.ts            # 认证 API
│   │   ├── agents.ts          # 智能体 API
│   │   ├── conversations.ts   # 对话 API
│   │   ├── history.ts         # 历史记录 API
│   │   └── user.ts            # 用户 API
│   ├── components/            # 可复用组件
│   │   ├── Layout/            # 布局组件（Header / Sidebar）
│   │   ├── AgentFormFields.tsx
│   │   └── AgentFormModal.tsx
│   ├── pages/                 # 页面组件
│   │   ├── Login/  Register/
│   │   ├── Dashboard/
│   │   ├── AgentCenter/  AgentDetail/  AgentEdit/
│   │   ├── Chat/  History/
│   │   ├── Help/  Settings/
│   ├── router/                # 路由配置与权限守卫
│   ├── store/                 # Zustand 状态管理
│   ├── mock/                  # Mock 数据与 handlers
│   ├── types/                 # TypeScript 类型定义
│   ├── utils/                 # 工具函数（含 Axios 封装）
│   ├── App.tsx  main.tsx  index.css
├── .env.example               # 环境变量模板
├── DESIGN.md                  # 设计系统说明
├── vite.config.ts  tailwind.config.js  tsconfig.json
└── package.json
```

## 🔌 后端对接

### API 端点清单（定义于 `src/api/`）

```typescript
// 认证
POST /api/auth/login
POST /api/auth/register

// 智能体
GET    /api/agents
POST   /api/agents
GET    /api/agents/:id
PUT    /api/agents/:id
DELETE /api/agents/:id

// 对话
GET  /api/conversations
POST /api/conversations/:id/messages

// 历史记录
GET /api/history

// 用户
GET /api/user/profile
PUT /api/user/profile
```

### 对接步骤

1. **配置后端地址与 Mock 开关**
   ```env
   # .env.development
   VITE_API_BASE_URL=http://localhost:8000
   VITE_ENABLE_MOCK=false
   ```

2. **导入并调用 API 函数**
   ```typescript
   import { getAgents } from '@/api/agents'
   const agents = await getAgents()
   ```

3. **Vite 代理（可选）**
   开发环境下 `/api` 已代理到 `http://localhost:8000`，见 [vite.config.ts](./vite.config.ts)。

## 🎨 设计特点

- 🌙 深色模式优先
- ✨ 科技感 + AI 感（"Ethereal Intelligence"）
- 🔮 玻璃拟态与环境光晕
- 🌈 渐变与辉光效果
- 🎭 流畅的动画过渡
- 📱 响应式布局

> 完整的视觉规范、色板与组件规则请参阅 [DESIGN.md](./DESIGN.md)。

## 🗺️ 路由导航

```
公开路由:
├── /login          登录
└── /register       注册

私有路由（需登录）:
├── /dashboard          仪表板
├── /agents             智能体中心
├── /agents/:id         智能体详情
├── /agents/:id/edit    智能体编辑
├── /chat               实时聊天
├── /history            历史记录
├── /help               帮助中心
└── /settings           账户设置
```

## 🔧 开发命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本（tsc + vite build）
npm run preview      # 预览生产构建
npm run lint         # ESLint 代码检查
npm run type-check   # TypeScript 类型检查
npm run format       # Prettier 格式化
```

## 📦 构建部署

```bash
npm run build
```

构建产物位于 `dist/`，可部署到 Vercel、Netlify、Nginx 或任意静态资源托管环境。

## 🎯 下一步工作

### 必须完成
- [ ] 对接真实后端 API（关闭 Mock）
- [ ] 完善全局 loading 与错误处理
- [ ] 表单校验补全
- [ ] Token 刷新与权限过期处理

### 建议完成
- [ ] 全局 Toast / Message 提示封装
- [ ] 骨架屏加载
- [ ] 接口层请求缓存
- [ ] 文件上传（头像 / 附件）
- [ ] 单元测试与 E2E 测试

## 🤝 贡献

欢迎提交 Issue 与 Pull Request。

## 📄 License

MIT License

---

<div align="center">
  <p>Made with ❤️ by Aether OS Team</p>
  <p>⭐ 如果这个项目对你有帮助，请给一个 Star！</p>
</div>
