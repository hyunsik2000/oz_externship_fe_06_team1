import { useState } from 'react'
import type { ExamItem } from '@/types/exam'
import { DataTable, type Column } from './data-table/DataTable'
import { Link } from 'react-router-dom'
import ExamDeployModal from './data-table/deploy-modal/examDeployModal'

const StatusBadge = ({ onDeploy }: { onDeploy: () => void }) => (
  <button
    type="button"
    className="bg-success-400 flex h-[26px] w-[50px] cursor-pointer items-center justify-center rounded text-white hover:opacity-80"
    onClick={onDeploy}
  >
    배포
  </button>
)

const TitleCell = ({ title, to }: { title: string; to: string }) => (
  <Link to={to} className="text-grey-800 cursor-pointer font-medium underline">
    {title}
  </Link>
)

export default function ExamList({ data }: { data: ExamItem[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ExamItem | null>(null)

  const handleOpenDeploy = (item: ExamItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const columns: Column<ExamItem>[] = [
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
      cell: (item) => <StatusBadge onDeploy={() => handleOpenDeploy(item)} />,
    },
  ]

  return (
    <>
      <DataTable data={data} columns={columns} />

      {selectedItem && (
        <ExamDeployModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={{
            id: selectedItem.id,
            title: selectedItem.title,
            subject_name: selectedItem.subject_name,
          }}
        />
      )}
    </>
  )
}
