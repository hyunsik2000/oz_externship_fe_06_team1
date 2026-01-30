import { useMemo, useState } from 'react'
import type { HistoryItem } from '@/types/history'
import { Pagination } from '@/components/common/Pagination'
import { DataTable, type Column } from './data-table/DataTable'
import { MOCK_HISTORY_LIST_RESPONSE } from '@/mocks/data/table-data/HistoryList'

const TitleCell = ({ title }: { title: string }) => (
  <span
    className="block w-full cursor-pointer truncate font-medium underline"
    title={title}
  >
    {title}
  </span>
)

const COLUMNS: Column<HistoryItem>[] = [
  {
    key: 'history_id',
    title: 'ID',
    size: 'md',
    cell: (item) => item.history_id,
  },
  {
    key: 'exam_title',
    title: '제목',
    className: 'flex-1 justify-center min-w-[180px]',
    cell: (item) => <TitleCell title={item.exam_title} />,
  },
  {
    key: 'subject_name',
    title: '과목',
    size: 'xl',
    cell: (item) => item.subject_name,
  },
  {
    key: 'nickname',
    title: '닉네임',
    size: 'lg',
    cell: (item) => item.nickname,
  },
  {
    key: 'cohort',
    title: '과정/기수',
    size: 'xl',
    cell: (item) => `${item.course_name} ${item.cohort_number}기`,
  },
  {
    key: 'cheating_count',
    title: '부정행위 수',
    size: 'lg',
    cell: (item) => item.cheating_count,
  },
  {
    key: 'score',
    title: '점수',
    size: 'sm',
    cell: (item) => item.score,
  },
  {
    key: 'started_at',
    title: '시험 참가 일시',
    size: 'xl',
    cell: (item) => item.started_at,
  },
  {
    key: 'finished_at',
    title: '시험 종료 일시',
    size: 'xl',
    cell: (item) => item.finished_at,
  },
]

const PAGE_SIZE = 10

export default function HistoryList() {
  const [page, setPage] = useState(1)
  const submissions = MOCK_HISTORY_LIST_RESPONSE.submissions

  const totalPages = Math.max(1, Math.ceil(submissions.length / PAGE_SIZE))

  const pagedSubmissions = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return submissions.slice(start, start + PAGE_SIZE)
  }, [page, submissions])

  return (
    <div className="w-full">
      <DataTable data={pagedSubmissions} columns={COLUMNS} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  )
}
