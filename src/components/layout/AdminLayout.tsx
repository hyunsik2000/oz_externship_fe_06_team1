import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <AdminHeader />

       <main className="flex-1 min-w-0 bg-grey-100">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

