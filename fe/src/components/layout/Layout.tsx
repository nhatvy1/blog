import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'

const Layout = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1'>
        <Header />
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
