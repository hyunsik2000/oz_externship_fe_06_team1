import { Route, Routes } from 'react-router'
import AdminLayout from '@/components/layout/AdminLayout'
import { NotFoundPage } from '@/pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" />
      </Route>
      <Route path="/404" element={<NotFoundPage />} />
    </Routes>
  )
}
