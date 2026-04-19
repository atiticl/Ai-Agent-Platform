import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-[240px] min-h-screen relative overflow-hidden">
        <Header />
        <main className="pt-28 px-10 pb-12">
          <Outlet />
        </main>
      </div>
      
      {/* 装饰性背景 */}
      <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed top-1/2 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none"></div>
    </div>
  )
}

export default Layout
