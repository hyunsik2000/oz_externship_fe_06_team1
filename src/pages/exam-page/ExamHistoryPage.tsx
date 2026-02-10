import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseSubjectFilterModal, {
  type FilterValue,
  type Option,
} from '@/components/common/CourseSubjectFilterModal'
import { FilterButton } from '@/components/common'
import { ExamAttemptDetailModal } from '@/components/exam-attempt'
import { ExamHistoryLayout } from '@/components/layout'
import HistoryList from '@/components/table/HistoryList'
import type { HistoryItem } from '@/types/history'
import { useToastStore } from '@/store'
import { useExamHistory } from '@/hooks'

export function ExamHistoryPage() {
  const navigate = useNavigate()
  const { submissions, isLoading } = useExamHistory()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filter, setFilter] = useState<FilterValue>({
    course: '',
    cohort: '',
    subject: '',
  })

  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)
  const showToast = useToastStore((state) => state.showToast)

  const courseOptions = useMemo<Option[]>(() => {
    const seen = new Set<string>()
    return submissions.reduce<Option[]>((acc, item) => {
      if (seen.has(item.course_name)) return acc
      seen.add(item.course_name)
      acc.push({ label: item.course_name, value: item.course_name })
      return acc
    }, [])
  }, [submissions])

  const cohortOptions = useMemo<Option[]>(() => {
    if (!filter.course) return []
    const seen = new Set<number>()
    return submissions.reduce<Option[]>((acc, item) => {
      if (item.course_name !== filter.course) return acc
      if (seen.has(item.cohort_number)) return acc
      seen.add(item.cohort_number)
      acc.push({
        label: `${item.cohort_number}기`,
        value: String(item.cohort_number),
      })
      return acc
    }, [])
  }, [filter.course, submissions])

  const subjectOptions = useMemo<Option[]>(() => {
    if (!filter.course || !filter.cohort) return []
    const cohortNumber = Number(filter.cohort)
    const seen = new Set<string>()
    return submissions.reduce<Option[]>((acc, item) => {
      if (item.course_name !== filter.course) return acc
      if (item.cohort_number !== cohortNumber) return acc
      if (seen.has(item.subject_name)) return acc
      seen.add(item.subject_name)
      acc.push({ label: item.subject_name, value: item.subject_name })
      return acc
    }, [])
  }, [filter.course, filter.cohort, submissions])

  const handleOpenFilter = () => setIsFilterOpen(true)
  const handleCloseFilter = () => setIsFilterOpen(false)

  const handleChangeFilter = (next: FilterValue) => setFilter(next)

  const handleSubmitFilter = () => {
    setIsFilterOpen(false)
    navigate('/exam/history/filtered', { state: { filter } })
  }

  const handleOpenDetail = (item: HistoryItem) => {
    setSelectedItem(item)
    setDetailOpen(true)
  }

  const handleCloseDetail = () => {
    setDetailOpen(false)
    setSelectedItem(null)
  }

  const handleDeleteConfirm = () => {
    showToast({
      variant: 'success',
      message: '응시 내역 삭제가 완료되었습니다.',
    })
  }

  return (
    <>
      <ExamHistoryLayout
        title={<span className="text-base">쪽지시험 응시 내역 조회</span>}
        headerRight={<FilterButton onClick={handleOpenFilter} />}
      >
        {isLoading ? (
          <div className="text-grey-500 flex h-60 items-center justify-center">
            데이터를 불러오는 중입니다...
          </div>
        ) : (
          <HistoryList
            onClickTitle={handleOpenDetail}
            submissions={submissions}
          />
        )}
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
        onDeleteConfirm={handleDeleteConfirm}
      />
    </>
  )
}
