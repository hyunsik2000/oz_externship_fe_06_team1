import { ExamHistoryLayout } from '@/components/layout/ExamHistoryLayout'
import HistoryList from '@/components/table/HistoryList'

export function ExamHistoryPage() {
  return (
    <ExamHistoryLayout title="쪽지시험 응시 내역 조회">
      <HistoryList />
    </ExamHistoryLayout>
  )
}
