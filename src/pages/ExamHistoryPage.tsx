import AdminContainer from '@/components/layout/AdminContainer'
import HistoryList from '@/components/table/HistoryList'

export default function ExamHistoryPage() {
  return (
    <AdminContainer title="응시 내역 관리">
      <HistoryList />
    </AdminContainer>
  )
}
