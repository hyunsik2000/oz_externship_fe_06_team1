import { useMemo, useState } from 'react'
import { Pagination } from '@/components/common/Pagination'
import { MemberStatusBadge } from '@/components/common'
import { DataTable, type Column } from './data-table/DataTable'
import type { Member } from '@/types/member'

type MemberListProps = {
  data: Member[]
  onClickNickname?: (item: Member) => void
}

const NicknameCell = ({
  nickname,
  onClick,
}: {
  nickname: string
  onClick?: () => void
}) => (
  <button
    type="button"
    onClick={onClick}
    className="block w-full cursor-pointer truncate font-medium underline"
    title={nickname}
  >
    {nickname}
  </button>
)

const COLUMNS = (
  onClickNickname?: (item: Member) => void
): Column<Member>[] => [
  {
    key: 'id',
    title: 'ID',
    size: 'md',
    cell: (item) => item.id,
  },
  {
    key: 'nickname',
    title: '닉네임',
    size: 'xl',
    cell: (item) => (
      <NicknameCell
        nickname={item.nickname}
        onClick={() => onClickNickname?.(item)}
      />
    ),
  },
  {
    key: 'name',
    title: '이름',
    size: 'lg',
    cell: (item) => item.name,
  },
  {
    key: 'email',
    title: '이메일',
    className: 'flex-1 justify-center min-w-[240px]',
    cell: (item) => item.email,
  },
  {
    key: 'birthDate',
    title: '생년월일',
    size: 'xl',
    cell: (item) => item.birthDate,
  },
  {
    key: 'role',
    title: '권한',
    size: 'xl',
    cell: (item) => item.role,
  },
  {
    key: 'status',
    title: '회원상태',
    size: 'xl',
    cell: (item) => <MemberStatusBadge status={item.status} />,
  },
  {
    key: 'joinedAt',
    title: '가입일',
    size: 'xl',
    cell: (item) => item.joinedAt,
  },
]

const PAGE_SIZE = 10

export default function MemberList({ data, onClickNickname }: MemberListProps) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const columns = COLUMNS(onClickNickname)

  const pagedMembers = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE
    return data.slice(start, start + PAGE_SIZE)
  }, [data, safePage])

  return (
    <div className="w-full">
      <DataTable data={pagedMembers} columns={columns} />

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  )
}
