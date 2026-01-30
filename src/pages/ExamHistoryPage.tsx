import { AdminContainer } from '@/components/layout'
import HistoryList from '@/components/table/HistoryList'

export function ExamHistoryPage() {
  return (
    <AdminContainer title="쪽지시험 응시 내역 조회">
      <HistoryList />
    </AdminContainer>
  )
}
