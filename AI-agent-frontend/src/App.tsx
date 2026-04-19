import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import AppRouter from './router'

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#d0bcff',
          colorBgBase: '#0f131c',
          colorTextBase: '#dfe2ef',
          fontSize: 12,
          controlHeight: 28,
          borderRadius: 6,
        },
      }}
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
