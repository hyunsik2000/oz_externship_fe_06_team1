import {
  Button,
  FilterButton,
  FilterModal,
  Input,
  Pagination,
} from '@/components/common'
import { ExamListLayout } from '@/components/layout'
import ExamList from '@/components/table/ExamList'
import { useAxios, useFilter, type FilterOptionConfig } from '@/hooks'
import { API_PATHS } from '@/constants/api'
import type { ExamListResponse } from '@/types/exam'
import { useEffect, useState } from 'react'
import ExamModal from '@/components/detail-exam/exam-modal/ExamModal'
import { COURSE_OPTIONS } from '@/constants/filtered-option'

export function ExamListPage() {
  const [data, setData] = useState<ExamListResponse | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [page, setPage] = useState(1)

  const { sendRequest, isLoading } = useAxios()

  useEffect(() => {
    const fetchExams = async () => {
      const response = await sendRequest<ExamListResponse>({
        method: 'GET',
        url: API_PATHS.EXAM.LIST,
        params: {
          page,
          size: 10,
        },
      })
      if (response) {
        console.log(response)
        setData(response)
      }
    }
    fetchExams()
  }, [page, sendRequest])

  const totalPages = data ? Math.ceil(data.total_count / data.size) : 0
  const paginatedData = data?.exams || []

  const filterConfigs: FilterOptionConfig[] = [
    {
      key: 'course',
      placeholder: '과정을 선택해주세요',
      options: COURSE_OPTIONS,
    },
  ]

  const {
    isOpen: isFilterOpen,
    openFilter: handleOpenFilter,
    closeFilter: handleCloseFilter,
    values: filter, // 필터 값
    rows, // 필터 행
    summary, // 필터 요약
    canSubmit, // 필터 제출 가능 여부
  } = useFilter(filterConfigs)

  const handleSubmitFilter = () => {
    handleCloseFilter()
  }

  return (
    <>
      <ExamListLayout
        title="쪽지시험 조회"
        toolbar={
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex gap-2">
              <Input
                placeholder="검색어를 입력하세요"
                className="h-9 w-[250px]"
              />
              <Button variant="search" size="search" className="flex-shrink-0">
                조회
              </Button>
            </div>
            <FilterButton onClick={handleOpenFilter} />
          </div>
        }
        footer={
          <div className="mt-10 grid w-full grid-cols-3 items-center">
            <div />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onChange={setPage}
              containerClassName="flex justify-center"
            />
            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={() => setIsModalOpen(true)}
                className="h-[36px] w-[55px] rounded-sm text-sm font-normal"
              >
                생성
              </Button>
            </div>
          </div>
        }
      >
        {isLoading ? (
          <div className="text-grey-500 flex h-60 items-center justify-center">
            데이터를 불러오는 중입니다...
          </div>
        ) : (
          <ExamList data={paginatedData} />
        )}
      </ExamListLayout>
      <FilterModal
        open={isFilterOpen}
        onClose={handleCloseFilter}
        title="과정별 필터링"
        subtitle="필터를 적용할 카테고리를 선택해주세요."
        rows={rows}
        summary={summary}
        onSubmit={handleSubmitFilter}
        canSubmit={canSubmit}
      />
      <ExamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="create"
      />
    </>
  )
}
