import { Outlet } from 'react-router-dom'
import { AdminHeader, AdminSidebar } from '@/components/layout'

export function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <AdminHeader />

        <main className="bg-grey-100 min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
