import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import AdminContainer from './AdminContainer'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <AdminHeader />

        <main className="bg-grey-100 min-w-0 flex-1">
          <AdminContainer title="회원관리">
            <Outlet />
          </AdminContainer>
        </main>
      </div>
    </div>
  )
}
