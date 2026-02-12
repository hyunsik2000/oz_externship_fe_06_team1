import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '@/components/layout'
import {
  GlobalAlertModal,
  GlobalToast,
  ErrorCatcher,
} from '@/components/common'
import { useAuthStore } from '@/store'
import { LoginPage } from '@/pages/login'
import {
  DetailExamPage,
  ExamDashboardPage,
  ExamDeploymentPage,
  ExamHistoryPage,
  ExamListPage,
  FilteredExamHistoryPage,
} from '@/pages/exam-page'
import {
  MemberDashboardPage,
  MemberManagementPage,
  MemberWithdrawalPage,
  StudentManagementPage,
  StudentRegistrationPage,
} from '@/pages/member-management'
import { NotFoundPage } from '@/pages/not-found'

export default function App() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return (
    <>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<AdminLayout />}>
          <Route
            index
            element={
              accessToken ? (
                <Navigate to="/members/management" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="exam">
            <Route path="dashboard" element={<ExamDashboardPage />} />
            <Route path="deployments" element={<ExamDeploymentPage />} />
            <Route path="history" element={<ExamHistoryPage />} />
            <Route
              path="history/filtered"
              element={<FilteredExamHistoryPage />}
            />
            <Route path="list" element={<ExamListPage />} />
            <Route path="list/:id" element={<DetailExamPage />} />
          </Route>
          <Route path="members">
            <Route path="dashboard" element={<MemberDashboardPage />} />
            <Route path="management" element={<MemberManagementPage />} />
            <Route
              path="student-management"
              element={<StudentManagementPage />}
            />
            <Route
              path="student-registration"
              element={<StudentRegistrationPage />}
            />
            <Route path="withdrawal" element={<MemberWithdrawalPage />} />
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
