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
import { useEffect, useState, useCallback } from 'react'
import ExamModal from '@/components/detail-exam/exam-modal/ExamModal'
import { SUBJECT_OPTIONS } from '@/constants/filtered-option'

export function ExamListPage() {
  const { sendRequest, isLoading } = useAxios()
  const [data, setData] = useState<ExamListResponse | null>(null)
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const totalPages = data ? Math.ceil(data.total_count / data.size) : 0
  const paginatedData = data?.exams || []

  // 과정별 필터링
  const filterConfigs: FilterOptionConfig[] = [
    {
      key: 'subject_id',
      placeholder: '과목을 선택해주세요',
      options: [{ label: '전체', value: '' }, ...SUBJECT_OPTIONS],
    },
  ]

  const {
    isOpen: isFilterOpen,
    openFilter: handleOpenFilter,
    closeFilter: handleCloseFilter,
    values: filterValues,
    rows,
    summary,
    canSubmit,
  } = useFilter(filterConfigs)

  // 검색 및 필터 상태
  const [searchText, setSearchText] = useState('')
  const [queryParams, setQueryParams] = useState({
    search_keyword: '',
    subject_id: '',
  })

  // 데이터 조회
  const fetchExams = useCallback(async () => {
    const params: Record<string, any> = {
      page,
      size: 10,
    }

    if (queryParams.search_keyword) {
      params.search_keyword = queryParams.search_keyword
    }
    if (queryParams.subject_id) {
      params.subject_id = queryParams.subject_id
    }

    const response = await sendRequest<ExamListResponse>({
      method: 'GET',
      url: API_PATHS.EXAM.LIST,
      params,
    })
    if (response) {
      setData(response)
    }
  }, [page, sendRequest, queryParams])

  useEffect(() => {
    fetchExams()
  }, [fetchExams])

  // 검색 버튼 클릭
  const handleSearch = () => {
    setPage(1)
    setQueryParams((prev) => ({
      ...prev,
      search_keyword: searchText,
    }))
  }

  // 검색 인풋 엔터키
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // 필터 적용 버튼
  const handleSubmitFilter = () => {
    setPage(1)
    setQueryParams((prev) => ({
      ...prev,
      subject_id: filterValues['subject_id'],
    }))
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
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                variant="search"
                size="search"
                className="flex-shrink-0"
                onClick={handleSearch}
              >
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
          <div className="flex h-60 items-center justify-center">
            데이터를 불러오는 중입니다...
          </div>
        ) : paginatedData.length === 0 ? (
          <div className="flex h-60 items-center justify-center">
            존재하는 데이터가 없습니다.
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
        onSuccess={fetchExams}
      />
    </>
  )
}
