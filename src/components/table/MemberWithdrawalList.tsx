import { useMemo } from 'react'
import {
  MemberStatusBadge,
  Pagination,
  type MemberStatus,
} from '@/components/common'
import { DataTable, type Column } from '@/components/table/data-table/DataTable'
import type { MemberWithdrawalItemType } from '@/types'
import { NameCell } from './MemberList'
import { formatDateTime } from '@/utils'

type MemberWithdrawalListProps = {
  data: MemberWithdrawalItemType[]
  onItemClick?: (id: number) => void
  currentPage: number
  totalCount: number
  onPageChange: (page: number) => void
}

const PAGE_SIZE = 10

export function MemberWithdrawalList({
  data,
  onItemClick,
  currentPage,
  totalCount,
  onPageChange,
}: MemberWithdrawalListProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  const columns: Column<MemberWithdrawalItemType>[] = useMemo(
    () => [
      {
        key: 'id',
        title: 'ID',
        size: 'md',
        cell: (item) => item.id,
      },
      {
        key: 'email',
        title: '이메일',
        className: 'flex-1 min-w-[200px]',
        cell: (item) => item.user.email,
      },
      {
        key: 'user_name',
        title: '이름',
        size: 'lg',
        cell: (item) => (
          <NameCell
            name={item.user.name}
            onClick={() => onItemClick?.(item.id)}
          />
        ),
      },
      {
        key: 'birth_date',
        title: '생년월일',
        size: 'xl',
        cell: (item) => item.user.birth_date,
      },
      {
        key: 'role',
        title: '권한',
        size: 'lg',
        cell: (item) => (
          <MemberStatusBadge status={item.user.role as MemberStatus} />
        ),
      },
      {
        key: 'reason',
        title: '탈퇴 사유',
        className: 'flex-1 min-w-[250px]',
        cell: (item) => item.reason_display,
      },
      {
        key: 'withdrawn_at',
        title: '탈퇴 일시',
        size: 'xl',
        cell: (item) => formatDateTime(item.withdrawn_at),
      },
    ],
    [onItemClick]
  )

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <DataTable data={data} columns={columns} />
      </div>

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
