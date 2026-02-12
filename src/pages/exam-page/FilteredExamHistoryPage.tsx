import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CourseSubjectFilterModal, {
  type FilterValue,
  type Option,
} from '@/components/common/CourseSubjectFilterModal'
import { FilterButton } from '@/components/common'
import { ExamAttemptDetailModal } from '@/components/exam-attempt'
import { ExamHistoryLayout } from '@/components/layout'
import HistoryList from '@/components/table/HistoryList'
import type { HistoryItem } from '@/types/history'
import BackCircleIcon from '@/assets/icons/BackCircle.svg?react'
import CloseIcon from '@/assets/icons/Close.svg?react'
import { useToastStore } from '@/store'
import { useExamHistory } from '@/hooks'

type LocationState = {
  filter?: FilterValue
}

const EMPTY_FILTER: FilterValue = {
  course: '',
  cohort: '',
  subject: '',
}

export function FilteredExamHistoryPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { submissions, isLoading, refetch } = useExamHistory()
  const locationState = location.state as LocationState | null
  const initialFilter = locationState?.filter ?? EMPTY_FILTER
  const isValidFilter = Boolean(
    initialFilter.course && initialFilter.cohort && initialFilter.subject
  )

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filter, setFilter] = useState<FilterValue>(initialFilter)
  const [appliedFilter, setAppliedFilter] = useState<FilterValue>(initialFilter)

  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)
  const showToast = useToastStore((state) => state.showToast)

  useEffect(() => {
    if (!isValidFilter) {
      navigate('/exam/history', { replace: true })
      return
    }
    setFilter(initialFilter)
    setAppliedFilter(initialFilter)
  }, [initialFilter, isValidFilter, navigate])

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

  const filteredSubmissions = useMemo(() => {
    const cohortNumber = Number(appliedFilter.cohort)
    return submissions.filter(
      (item) =>
        item.course_name === appliedFilter.course &&
        item.cohort_number === cohortNumber &&
        item.subject_name === appliedFilter.subject
    )
  }, [appliedFilter, submissions])

  const summaryValues = useMemo(() => {
    const seen = new Set<string>()
    return filteredSubmissions.reduce<string[]>((acc, item) => {
      const label = `${item.course_name} ${item.cohort_number}기 > ${item.subject_name}`
      if (seen.has(label)) return acc
      seen.add(label)
      acc.push(label)
      return acc
    }, [])
  }, [filteredSubmissions])

  const summaryText =
    summaryValues.length > 0
      ? summaryValues.join(', ')
      : '선택된 항목이 없습니다'

  const handleOpenFilter = () => setIsFilterOpen(true)
  const handleCloseFilter = () => setIsFilterOpen(false)
  const handleChangeFilter = (next: FilterValue) => setFilter(next)

  const handleSubmitFilter = () => {
    setAppliedFilter(filter)
    setIsFilterOpen(false)
    navigate('/exam/history/filtered', { state: { filter }, replace: true })
  }

  const handleOpenDetail = (item: HistoryItem) => {
    setSelectedItem(item)
    setDetailOpen(true)
  }

  const handleCloseDetail = () => {
    setDetailOpen(false)
    setSelectedItem(null)
  }

  const handleClearFilter = () => {
    setFilter(EMPTY_FILTER)
    setAppliedFilter(EMPTY_FILTER)
    navigate('/exam/history')
  }

  const handleDeleteConfirm = () => {
    refetch()
    showToast({
      variant: 'success',
      message: '응시 내역 삭제가 완료되었습니다.',
    })
  }

  return (
    isValidFilter && (
      <>
        <ExamHistoryLayout
          title="쪽지시험 응시 내역 조회"
          toolbar={
            <div className="flex w-full items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <p className="text-grey-700 text-base">
                  현재 선택된 과정은{' '}
                  <span className="text-primary-700 font-semibold">
                    {summaryText}
                  </span>
                  입니다.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilter}
                  aria-label="필터 초기화"
                  className="relative inline-flex h-4 w-4 items-center justify-center"
                >
                  <BackCircleIcon className="h-4 w-4" />
                  <CloseIcon className="absolute h-2 w-2" />
                </button>
              </div>
              <FilterButton onClick={handleOpenFilter} />
            </div>
          }
        >
          {isLoading ? (
            <div className="text-grey-500 flex h-60 items-center justify-center">
              데이터를 불러오는 중입니다...
            </div>
          ) : (
            <HistoryList
              onClickTitle={handleOpenDetail}
              submissions={filteredSubmissions}
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
  )
}
