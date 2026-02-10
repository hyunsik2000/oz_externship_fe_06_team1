import { useMemo, useState } from 'react'
import { Pagination } from '@/components/common/Pagination'
import { MemberStatusBadge } from '@/components/common'
import { DataTable, type Column } from './data-table/DataTable'
import type { Member } from '@/types/member'

const getRoleLabel = (role: Member['role']) => role

type MemberListProps = {
  data: Member[]
  onClickName?: (item: Member) => void
  variant?: 'member' | 'student'
}

const NicknameCell = ({ nickname }: { nickname: string }) => (
  <span className="block w-full truncate" title={nickname}>
    {nickname}
  </span>
)

export const NameCell = ({
  name,
  onClick,
  className,
}: {
  name: string
  onClick?: () => void
  className?: string
}) =>
  onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full cursor-pointer truncate font-medium underline ${className ?? ''}`}
      title={name}
    >
      {name}
    </button>
  ) : (
    <span
      className={`block w-full truncate no-underline ${className ?? ''}`}
      title={name}
    >
      {name}
    </span>
  )

const MEMBER_COLUMNS = (
  onClickName?: (item: Member) => void
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
    cell: (item) => <NicknameCell nickname={item.nickname} />,
  },
  {
    key: 'name',
    title: '이름',
    size: 'lg',
    cell: (item) => (
      <NameCell name={item.name} onClick={() => onClickName?.(item)} />
    ),
  },
  {
    key: 'email',
    title: '이메일',
    className: 'flex-1 justify-center min-w-[240px]',
    cell: (item) => item.email,
  },
  {
    key: 'role',
    title: '권한',
    size: 'xl',
    cell: (item) => getRoleLabel(item.role),
  },
  {
    key: 'birthDate',
    title: '생년월일',
    size: 'xl',
    cell: (item) => item.birthDate,
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

const STUDENT_COLUMNS = (): Column<Member>[] => [
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
    cell: (item) => <NicknameCell nickname={item.nickname} />,
  },
  {
    key: 'name',
    title: '이름',
    size: 'lg',
    cell: (item) => (
      <span className="block w-full truncate no-underline" title={item.name}>
        {item.name}
      </span>
    ),
  },
  {
    key: 'email',
    title: '이메일',
    className: 'flex-1 justify-center min-w-[240px]',
    cell: (item) => item.email,
  },
  {
    key: 'phone',
    title: '연락처',
    size: 'xl',
    cell: (item) => item.phone ?? '-',
  },
  {
    key: 'role',
    title: '권한',
    size: 'xl',
    cell: (item) => getRoleLabel(item.role),
  },
  {
    key: 'course',
    title: '과정 | 기수',
    className: 'flex-1 justify-center min-w-[260px]',
    cell: (item) =>
      [item.course, item.cohort].filter(Boolean).join(' | ') || '-',
  },
  {
    key: 'birthDate',
    title: '생년월일',
    size: 'xl',
    cell: (item) => item.birthDate,
  },
  {
    key: 'status',
    title: '회원상태',
    size: 'xl',
    cell: (item) => <MemberStatusBadge status={item.status} />,
  },
]

const PAGE_SIZE = 10

export default function MemberList({
  data,
  onClickName,
  variant = 'member',
}: MemberListProps) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const columns =
    variant === 'student' ? STUDENT_COLUMNS() : MEMBER_COLUMNS(onClickName)

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
