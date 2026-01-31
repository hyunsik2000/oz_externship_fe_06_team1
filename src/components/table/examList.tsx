// import { Link } from "react-router";
import type { ExamItem } from '@/types/exam'
import { DataTable, type Column } from './data-table/DataTable'
import { MOCK_EXAM_LIST_RESPONSE } from '@/mocks/data/table-data/ExamList'
import { Link } from 'react-router'

const StatusBadge = () => (
  <button
    type="button"
    className="bg-success-400 flex h-[26px] w-[50px] items-center justify-center rounded text-xs font-semibold text-white outline-none"
  >
    배포
  </button>
)
const TitleCell = ({ title, to }: { title: string; to: string }) => (
  <Link to={to} className="text-grey-800 cursor-pointer font-medium underline">
    {title}
  </Link>
)

const COLUMNS: Column<ExamItem>[] = [
  {
    key: 'id',
    title: 'ID',
    size: 'md',
    cell: (item) => item.id,
  },
  {
    key: 'title',
    title: '제목',
    className: 'flex-1 justify-center min-w-[180px]',
    cell: (item) => (
      <TitleCell title={item.title} to={`/exam/list/${item.id}`} />
    ),
  },
  {
    key: 'subject_name',
    title: '과목명',
    size: 'xl',
    cell: (item) => item.subject_name,
  },
  {
    key: 'question_count',
    title: '총 문제 수',
    size: 'xl',
    cell: (item) => item.question_count,
  },
  {
    key: 'submit_count',
    title: '응시 수',
    size: 'lg',
    cell: (item) => item.submit_count,
  },
  {
    key: 'created_at',
    title: '등록 일시',
    size: 'xl',
    cell: (item) => item.created_at,
  },
  {
    key: 'updated_at',
    title: '수정 일시',
    size: 'xl',
    cell: (item) => item.updated_at,
  },
  {
    key: 'is_deployed',
    title: '',
    size: 'lg',
    cell: () => <StatusBadge />,
  },
]

export default function ExamList({ data }: { data: ExamItem[] }) {
  return <DataTable data={data} columns={COLUMNS} />
}
