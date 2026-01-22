import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'

export default function AdminLayout() {
  return (
    <div className="min-h-screen">
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1">
          {/* 임시 콘텐츠 영역 */}
          <div className="p-6" />
        </main>
      </div>
    </div>
  )
}
