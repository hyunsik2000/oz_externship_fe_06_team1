import { useMemo } from 'react'
import { Pagination } from '@/components/common'
import { DataTable, type Column } from '@/components/table/data-table/DataTable'
import type { ExamDeploymentItemType } from '@/types'
import { TitleCell } from './HistoryList'
import { Switch } from '@/components/exam-deployment'

type ExamDeploymentListProps = {
  data: ExamDeploymentItemType[]
  currentPage: number
  totalCount: number
  onPageChange: (page: number) => void
  onToggleStatus: (id: number, status: boolean) => void
  onItemClick: (item: ExamDeploymentItemType) => void
}

export function ExamDeploymentList({
  data,
  currentPage,
  totalCount,
  onPageChange,
  onToggleStatus,
  onItemClick,
}: ExamDeploymentListProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / 10))

  const columns: Column<ExamDeploymentItemType>[] = useMemo(
    () => [
      {
        key: 'id',
        title: 'ID',
        size: 'md',
        cell: (item) => item.id,
      },
      {
        key: 'title',
        title: '제목',
        className: 'flex-1 min-w-[200px]',
        cell: (item) => (
          <TitleCell title={item.title} onClick={() => onItemClick(item)} />
        ),
      },
      {
        key: 'subject',
        title: '과목명',
        size: 'lg',
        cell: (item) => item.subject_name,
      },
      {
        key: 'course',
        title: '과정 | 기수',
        className: 'flex-1 min-w-[200px]',
        cell: (item) => `${item.course_name} ${item.cohort}기`,
      },
      {
        key: 'count',
        title: '응시 수',
        size: 'md',
        cell: (item) => item.applicant_count,
      },
      {
        key: 'avg',
        title: '평균',
        size: 'md',
        cell: (item) => item.average_score,
      },
      {
        key: 'date',
        title: '배포 생성 일시',
        size: 'xl',
        cell: (item) => item.created_at,
      },
      {
        key: 'status',
        title: '배포 활성 상태',
        size: 'lg',
        cell: (item) => (
          <Switch
            checked={item.is_active}
            onChange={() => onToggleStatus(item.id, item.is_active)}
          />
        ),
      },
    ],
    [onToggleStatus, onItemClick]
  )

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DataTable data={data} columns={columns} />
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}
