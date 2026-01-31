import { useState } from 'react'
import CourseSubjectFilterModal, {
  type FilterValue,
  type Option,
} from '@/components/common/CourseSubjectFilterModal'
import { FilterButton } from '@/components/common/FilterButton'
import { ExamHistoryLayout } from '@/components/layout/ExamHistoryLayout'
import HistoryList from '@/components/table/HistoryList'

export function ExamHistoryPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filter, setFilter] = useState<FilterValue>({
    course: '',
    cohort: '',
    subject: '',
  })

  const courseOptions: Option[] = []
  const cohortOptions: Option[] = []
  const subjectOptions: Option[] = []

  const handleOpenFilter = () => setIsFilterOpen(true)
  const handleCloseFilter = () => setIsFilterOpen(false)

  const handleChangeFilter = (next: FilterValue) => setFilter(next)

  const handleSubmitFilter = () => {
    setIsFilterOpen(false)
  }

  return (
    <>
      <ExamHistoryLayout
        title="쪽지시험 응시 내역 조회"
        headerRight={<FilterButton onClick={handleOpenFilter} />}
      >
        <HistoryList />
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
    </>
  )
}
