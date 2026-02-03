import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '@/components/layout'
import { ExamDashboardPage, ExamHistoryPage, NotFoundPage } from '@/pages'
import { ExamListPage } from './pages/exam-page/exam-list/ExamListPage'
import { DetailExamPage } from './pages/exam-page/exam-list/DetailExamPage'
import MemberManagementPage from './pages/member-management/MemberManagementPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="/exam/history" replace />} />
        <Route path="/dashboard" element={<ExamDashboardPage />} />
        <Route path="/exam/history" element={<ExamHistoryPage />} />
        <Route path="/exam/list" element={<ExamListPage />} />
        <Route path="/exam/list/:id" element={<DetailExamPage />} />
        <Route path="/members/management" element={<MemberManagementPage />} />
        {/* <Route path="deployments" eleㅌment={<DeploymentPage />} /> */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
