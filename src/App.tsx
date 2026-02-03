import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '@/components/layout'
import { ExamDashboardPage, ExamHistoryPage, NotFoundPage } from '@/pages'
import { ExamListPage } from './pages/exam-page/exam-list/ExamListPage'
import { DetailExamPage } from './pages/exam-page/exam-list/DetailExamPage'
import { MemberDashboardPage } from './pages/member-management/MemberDashboardPage'
import MemberManagementPage from './pages/member-management/MemberManagementPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="/exam/history" replace />} />
        <Route path="/exam">
          <Route path="/exam/dashboard" element={<ExamDashboardPage />} />
          <Route path="/exam/history" element={<ExamHistoryPage />} />
          <Route path="/exam/list" element={<ExamListPage />} />
          <Route path="/exam/list/:id" element={<DetailExamPage />} />
          {/* <Route path="deployments" element={<DeploymentPage />} /> */}
        </Route>
        <Route path="/members">
          <Route path="/members/dashboard" element={<MemberDashboardPage />} />
          <Route
            path="/members/management"
            element={<MemberManagementPage />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
