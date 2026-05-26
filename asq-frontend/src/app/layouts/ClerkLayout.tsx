import { Outlet } from 'react-router-dom'
import SideNav from './SideNav/SideNav'
import TopNav from './TopNav'

const ClerkLayout: React.FC<any> = (): React.ReactElement => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">

      <SideNav />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto bg-[#f0f4fa] p-5">
          <Outlet />
        </main>
      </div>

    </div>
  )
}

export default ClerkLayout