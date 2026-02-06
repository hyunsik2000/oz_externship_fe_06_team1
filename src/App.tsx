import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '@/components/layout'
import {
  GlobalAlertModal,
  GlobalToast,
  ErrorCatcher,
} from '@/components/common'
import { LoginPage } from '@/pages/login'
import {
  DetailExamPage,
  ExamDashboardPage,
  FilteredExamHistoryPage,
  ExamHistoryPage,
  ExamListPage,
} from '@/pages/exam-page'
import {
  MemberDashboardPage,
  MemberManagementPage,
  MemberWithdrawalPage,
  StudentRegistrationPage,
} from '@/pages/member-management'
import { NotFoundPage } from '@/pages/not-found'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/exam/history" replace />} />
          <Route path="/exam">
            <Route path="/exam/dashboard" element={<ExamDashboardPage />} />
            <Route path="/exam/history" element={<ExamHistoryPage />} />
            <Route
              path="/exam/history/filtered"
              element={<FilteredExamHistoryPage />}
            />
            <Route path="/exam/list" element={<ExamListPage />} />
            <Route path="/exam/list/:id" element={<DetailExamPage />} />
          </Route>
          <Route path="/members">
            <Route
              path="/members/dashboard"
              element={<MemberDashboardPage />}
            />
            <Route
              path="/members/management"
              element={<MemberManagementPage />}
            />
            <Route
              path="/members/student-registration"
              element={<StudentRegistrationPage />}
            />
            <Route
              path="/members/withdrawal"
              element={<MemberWithdrawalPage />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <GlobalAlertModal />
      <GlobalToast />
      <ErrorCatcher />
    </>
  )
}
