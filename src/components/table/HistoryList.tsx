import { useEffect, useMemo, useState } from 'react'
import type { HistoryItem } from '@/types/history'
import { Pagination } from '@/components/common/Pagination'
import { DataTable, type Column } from './data-table/DataTable'
import { formatDateTime } from '@/utils/dateUtils'

export type ExamHistoryListProps = {
  onClickTitle?: (item: HistoryItem) => void
  submissions: HistoryItem[]
}

const TitleCell = ({
  title,
  onClick,
}: {
  title: string
  onClick?: () => void
}) => (
  <button
    type="button"
    onClick={onClick}
    className="block w-full cursor-pointer truncate font-medium underline"
    title={title}
  >
    {title}
  </button>
)

const COLUMNS = (
  onClickTitle?: (item: HistoryItem) => void
): Column<HistoryItem>[] => [
  {
    key: 'submission_id',
    title: 'ID',
    size: 'md',
    cell: (item) => item.submission_id,
  },
  {
    key: 'exam_title',
    title: '제목',
    className: 'flex-1 justify-center min-w-[180px]',
    cell: (item) => (
      <TitleCell title={item.exam_title} onClick={() => onClickTitle?.(item)} />
    ),
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
    size: 'xl',
    className: 'min-w-[220px]',
    cell: (item) => item.nickname,
  },
  {
    key: 'cohort',
    title: '과정/기수',
    size: 'xl',
    className: 'whitespace-nowrap',
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
    cell: (item) => formatDateTime(item.started_at),
  },
  {
    key: 'finished_at',
    title: '시험 종료 일시',
    size: 'xl',
    cell: (item) => formatDateTime(item.finished_at),
  },
]

const PAGE_SIZE = 10

export default function HistoryList({
  onClickTitle,
  submissions,
}: ExamHistoryListProps) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(submissions.length / PAGE_SIZE))
  const columns = COLUMNS(onClickTitle)
  const pagedSubmissions = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return submissions.slice(start, start + PAGE_SIZE)
  }, [page, submissions])

  useEffect(() => {
    setPage(1)
  }, [submissions])

  return (
    <div className="w-full">
      <DataTable data={pagedSubmissions} columns={columns} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  )
}
