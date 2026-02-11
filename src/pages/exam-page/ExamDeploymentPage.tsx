import { Button, FilterButton, Input } from '@/components/common'
import { CourseCohortFilterModal } from '@/components/exam-deployment/CourseCohortFilterModal'
import { ExamDeploymentDetailModal } from '@/components/exam-deployment/ExamDeploymentDetailModal'
import { ExamHistoryLayout } from '@/components/layout'
import { ExamDeploymentList } from '@/components/table/ExamDeploymentList'
import { useExamDeployment } from '@/hooks/useExamDeployment'
import { MOCK_DEPLOYMENTS } from '@/mocks/data/table-data/DeploymentList'
import BackCircleIcon from '@/assets/icons/BackCircle.svg?react'
import CloseIcon from '@/assets/icons/Close.svg?react'
import { useMemo, useState } from 'react'

export function ExamDeploymentPage() {
  const {
    data,
    totalCount,
    filters,
    setFilters,
    isLoading,
    applyFilters,
    handleToggleStatus,
    isDetailModalOpen,
    selectedItem,
    openDetail,
    closeDetail,
    handleDeleteDeployment,
  } = useExamDeployment()

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [tempFilter, setTempFilter] = useState({
    course: filters.course || '',
    cohort: filters.cohort || '',
  })

  const isFilterApplied = Boolean(filters.course && filters.cohort)

  const summaryText = useMemo(() => {
    if (!isFilterApplied) return ''
    return `${filters.course} > ${filters.cohort}기`
  }, [filters.course, filters.cohort, isFilterApplied])

  const handleClearFilter = () => {
    setFilters((prev) => ({
      ...prev,
      course: '',
      cohort: '',
      page: 1,
    }))
    setTempFilter({ course: '', cohort: '' })
  }

  type FilterOptionType = { label: string; value: string }

  const courseOptions = useMemo<FilterOptionType[]>(() => {
    const seen = new Set<string>()
    return MOCK_DEPLOYMENTS.reduce<FilterOptionType[]>((acc, item) => {
      if (seen.has(item.course_name)) return acc
      seen.add(item.course_name)
      acc.push({ label: item.course_name, value: item.course_name })
      return acc
    }, [])
  }, [])

  const cohortOptions = useMemo<FilterOptionType[]>(() => {
    if (!tempFilter.course) return []
    const seen = new Set<number>()
    return MOCK_DEPLOYMENTS.filter(
      (item) => item.course_name === tempFilter.course
    )
      .reduce<FilterOptionType[]>((acc, item) => {
        if (seen.has(item.cohort)) return acc
        seen.add(item.cohort)
        acc.push({
          label: `${item.cohort}기`,
          value: String(item.cohort),
        })
        return acc
      }, [])
      .sort((a, b) => Number(a.value) - Number(b.value))
  }, [tempFilter.course])

  const handleFilterSubmit = () => {
    setFilters((prev) => ({
      ...prev,
      course: tempFilter.course,
      cohort: tempFilter.cohort,
      page: 1,
    }))

    setIsFilterModalOpen(false)
  }

  return (
    <>
      <ExamHistoryLayout
        title="쪽지시험 배포 내역 조회"
        headerRight={
          <FilterButton onClick={() => setIsFilterModalOpen(true)} />
        }
        toolbar={
          isFilterApplied ? (
            <div className="-mt-1.5 flex w-full items-center justify-between gap-3">
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
                  className="relative inline-flex h-4 w-4 cursor-pointer items-center justify-center hover:opacity-70"
                >
                  <BackCircleIcon className="h-4 w-4" />
                  <CloseIcon className="absolute h-2 w-2" />
                </button>
              </div>
            </div>
          ) : undefined
        }
      >
        <div className="flex h-full flex-col pb-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Input
                placeholder="검색어를 입력하세요."
                className="h-9 w-80"
                value={filters.search}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, search: e.target.value }))
                }
                onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
              />
              <Button
                variant="search"
                size="search"
                onClick={applyFilters}
                disabled={isLoading}
              >
                조회
              </Button>
            </div>
          </div>

          <div className="relative flex flex-1 flex-col overflow-hidden">
            <ExamDeploymentList
              data={data}
              currentPage={filters.page}
              totalCount={totalCount}
              onPageChange={(page) => setFilters((p) => ({ ...p, page }))}
              onToggleStatus={handleToggleStatus}
              onItemClick={openDetail}
            />
          </div>
        </div>
      </ExamHistoryLayout>
      <CourseCohortFilterModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        value={tempFilter}
        onChange={setTempFilter}
        onSubmit={handleFilterSubmit}
        courseOptions={courseOptions}
        cohortOptions={cohortOptions}
      />
      <ExamDeploymentDetailModal
        isOpen={isDetailModalOpen}
        onClose={closeDetail}
        data={selectedItem}
        onDeleteConfirm={handleDeleteDeployment}
      />
    </>
  )
}
