import { useMemo, useState } from 'react'
import { MemberStatusBadge, Pagination } from '@/components/common'
import { DataTable, type Column } from '@/components/table/data-table/DataTable'
import type { MemberWithdrawalItemType } from '@/types'

type MemberWithdrawalListProps = {
  data: MemberWithdrawalItemType[]
}

const PAGE_SIZE = 10

export function MemberWithdrawalList({ data }: MemberWithdrawalListProps) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)

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
        cell: (item) => item.email,
      },
      {
        key: 'user_name',
        title: '이름',
        size: 'lg',
        cell: (item) => item.user_name,
      },
      {
        key: 'birth_date',
        title: '생년월일',
        size: 'xl',
        cell: (item) => item.birth_date,
      },
      {
        key: 'role',
        title: '권한',
        size: 'lg',
        cell: (item) => <MemberStatusBadge status={item.role} />,
      },
      {
        key: 'reason',
        title: '탈퇴 사유',
        className: 'flex-1 min-w-[250px]',
        cell: (item) => item.reason,
      },
      {
        key: 'withdrawn_at',
        title: '탈퇴 일시',
        size: 'xl',
        cell: (item) => item.withdrawn_at,
      },
    ],
    []
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
