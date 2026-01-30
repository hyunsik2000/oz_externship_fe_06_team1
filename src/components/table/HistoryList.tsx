import type { HistoryItem } from '@/types/history'
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

export default function HistoryList() {
  return (
    <div className="w-full">
      <DataTable
        data={MOCK_HISTORY_LIST_RESPONSE.submissions}
        columns={COLUMNS}
      />
    </div>
  )
}
