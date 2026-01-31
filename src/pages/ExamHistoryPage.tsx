import { useState } from 'react'
import CourseSubjectFilterModal, {
  type FilterValue,
  type Option,
} from '@/components/common/CourseSubjectFilterModal'
import { FilterButton } from '@/components/common/FilterButton'
import { ExamAttemptDetailModal } from '@/components/exam-attempt/ExamAttemptDetailModal'
import { ExamHistoryLayout } from '@/components/layout/ExamHistoryLayout'
import HistoryList from '@/components/table/HistoryList'
import type { HistoryItem } from '@/types/history'

export function ExamHistoryPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filter, setFilter] = useState<FilterValue>({
    course: '',
    cohort: '',
    subject: '',
  })

  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)

  const courseOptions: Option[] = []
  const cohortOptions: Option[] = []
  const subjectOptions: Option[] = []

  const handleOpenFilter = () => setIsFilterOpen(true)
  const handleCloseFilter = () => setIsFilterOpen(false)

  const handleChangeFilter = (next: FilterValue) => setFilter(next)

  const handleSubmitFilter = () => {
    setIsFilterOpen(false)
  }

  const handleOpenDetail = (item: HistoryItem) => {
    setSelectedItem(item)
    setDetailOpen(true)
  }

  const handleCloseDetail = () => {
    setDetailOpen(false)
    setSelectedItem(null)
  }

  return (
    <>
      <ExamHistoryLayout
        title="쪽지시험 응시 내역 조회"
        headerRight={<FilterButton onClick={handleOpenFilter} />}
      >
        <HistoryList onClickTitle={handleOpenDetail} />
      </ExamHistoryLayout>

      <CourseSubjectFilterModal
        open={isFilterOpen}
        onClose={handleCloseFilter}
        courseOptions={courseOptions}
        cohortOptions={cohortOptions}
        subjectOptions={subjectOptions}
        value={filter}
        onChange={handleChangeFilter}
        onSubmit={handleSubmitFilter}
      />

      <ExamAttemptDetailModal
        open={detailOpen}
        onClose={handleCloseDetail}
        item={selectedItem}
      />
    </>
  )
}
