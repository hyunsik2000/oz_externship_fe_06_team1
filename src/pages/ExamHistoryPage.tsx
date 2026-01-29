import AdminContainer from '@/components/layout/AdminContainer'
import HistoryList from '@/components/table/HistoryList'

export default function ExamHistoryPage() {
  return (
    <AdminContainer title="쪽지시험 응시 내역 조회">
      <HistoryList />
    </AdminContainer>
  )
}
