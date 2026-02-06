import { useMemo, useState } from 'react'
import {
  CustomCheckbox,
  MemberStatusBadge,
  Pagination,
} from '@/components/common'
import { DataTable, type Column } from '@/components/table/data-table/DataTable'
import type { MemberRegistrationItemType } from '@/types'

type StudentRegistrationListProps = {
  data: MemberRegistrationItemType[]
  selectedIds: number[]
  onToggleOne: (id: number) => void
  onToggleAll: () => void
}

const PAGE_SIZE = 10

export function StudentRegistrationList({
  data,
  selectedIds,
  onToggleOne,
  onToggleAll,
}: StudentRegistrationListProps) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)

  const columns: Column<MemberRegistrationItemType>[] = useMemo(
    () => [
      {
        key: 'select',
        title: (
          <CustomCheckbox
            checked={
              data.filter((item) => item.status === 'Submitted').length > 0 &&
              data
                .filter((item) => item.status === 'Submitted')
                .every((item) => selectedIds.includes(item.id))
            }
            onChange={onToggleAll}
          />
        ),
        size: 'sm',
        cell: (item) => (
          <CustomCheckbox
            checked={selectedIds.includes(item.id)}
            onChange={() => onToggleOne(item.id)}
            disabled={item.status !== 'Submitted'}
          />
        ),
      },
      {
        key: 'id',
        title: 'ID',
        size: 'md',
        cell: (item) => item.id,
      },
      {
        key: 'course_name',
        title: '신청 과정명',
        className: 'flex-1 min-w-[250px]',
        cell: (item) => item.course_name,
      },
      { key: 'cohort', title: '기수', size: 'md', cell: (item) => item.cohort },
      {
        key: 'user_name',
        title: '이름',
        size: 'lg',
        cell: (item) => item.user_name,
      },
      { key: 'email', title: '이메일', size: 'xl', cell: (item) => item.email },
      {
        key: 'birth_date',
        title: '생년월일',
        size: 'xl',
        cell: (item) => item.birth_date,
      },
      {
        key: 'status',
        title: '상태',
        size: 'lg',
        cell: (item) => <MemberStatusBadge status={item.status} />,
      },
      {
        key: 'requested_at',
        title: '요청일시',
        size: 'xl',
        cell: (item) => item.requested_at,
      },
    ],
    [data, onToggleAll, selectedIds, onToggleOne]
  )

  const pagedItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE
    return data.slice(start, start + PAGE_SIZE)
  }, [data, safePage])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <DataTable data={pagedItems} columns={columns} />
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onChange={setPage}
        />
      </div>
    </div>
  )
}
