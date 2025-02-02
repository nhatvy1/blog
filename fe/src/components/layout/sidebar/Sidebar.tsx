import { Link } from 'react-router-dom'
import MenuTitle from './MenuTitle'
import NavItem from './NavItem'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { LIST_NAV_ITEM } from './data.sidebar'
import Authorization from '@/providers/Authorization'

const Sidebar = () => {
  const { isOpenSidebar } = useSelector((state: RootState) => state.layout)

  return (
    <div
      className={`${
        isOpenSidebar
          ? 'w-sidebar-open h-screen overflow-auto'
          : 'w-sidebar-close min-h-dvh'
      } duration-200 bg-primary max-md:hidden`}
    >
      <div>
        <Link
          to='/'
          className='sticky top-0 bg-primary z-50 flex text-white uppercase font-bold justify-center py-5 w-full'
        >
          {isOpenSidebar ? (
            <span className='tracking-[5px]'>DASHBOARD</span>
          ) : (
            <img src='/vite.svg' alt='Loi anh' />
          )}
        </Link>
        <ul>
          <MenuTitle>Menu</MenuTitle>
          {LIST_NAV_ITEM.map((item, index) => (
            <Authorization
              key={index}
              module={item.module}
              permission={item.permission}
            >
              <NavItem item={item} showTitle={isOpenSidebar} />
            </Authorization>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
