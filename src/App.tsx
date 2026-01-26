import { Route, Routes } from 'react-router-dom'
import AdminLayout from '@/components/layout/AdminLayout'
import HistoryList from '@/components/table/HistoryList'
import { NotFoundPage } from '@/pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route
          index
          element={
            <div className="bg-muted min-h-screen w-full p-6">
              <div className="bg-card w-full rounded-xl p-6 shadow-sm">
                <HistoryList />
              </div>
            </div>
          }
        />
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
