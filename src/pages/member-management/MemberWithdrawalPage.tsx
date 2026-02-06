import { Button, Dropdown, Input } from '@/components/common'
import { AdminContainer } from '@/components/layout'
import { MemberWithdrawalList } from '@/components/table/MemberWithdrawalList'
import { useMemberWithdrawal } from '@/hooks/useMemberWithdrawal'
import type { DropdownOption, MemberWithdrawalItemType } from '@/types'

const ROLE_OPTIONS: DropdownOption[] = [
  { label: '전체 권한', value: 'all' },
  { label: 'General', value: 'General' },
  { label: 'Student', value: 'Student' },
  { label: 'Staff', value: 'Staff' },
  { label: 'Admin', value: 'Admin' },
]

const MOCK_WITHDRAWAL_DATA: MemberWithdrawalItemType[] = [
  {
    id: 1,
    email: 'ozcoding@gmail.com',
    user_name: '김오즈',
    birth_date: '2000.08.03',
    role: 'General',
    reason: '기타 (직접 입력)',
    withdrawn_at: '2025.02.01 11:22:28',
  },
  {
    id: 2,
    email: 'ozcoding@gmail.com',
    user_name: '홍길동',
    birth_date: '2000.08.03',
    role: 'Student',
    reason: '이용 빈도가 너무 낮아요.',
    withdrawn_at: '2025.02.01 11:22:28',
  },
  {
    id: 3,
    email: 'ozcoding@gmail.com',
    user_name: '박오즈',
    birth_date: '2000.08.03',
    role: 'Student',
    reason: '수료',
    withdrawn_at: '2025.02.01 11:22:28',
  },
  {
    id: 4,
    email: 'ozcoding@gmail.com',
    user_name: '홍오즈',
    birth_date: '2000.08.03',
    role: 'Student',
    reason: '이용 빈도가 너무 낮아요.',
    withdrawn_at: '2025.02.01 11:22:28',
  },
  {
    id: 5,
    email: 'ozcoding@gmail.com',
    user_name: '이오즈',
    birth_date: '2000.08.03',
    role: 'Staff',
    reason: '타 부트캠프 이용',
    withdrawn_at: '2025.02.01 11:22:28',
  },
  {
    id: 6,
    email: 'ozcoding@gmail.com',
    user_name: '이길동',
    birth_date: '2000.08.03',
    role: 'Staff',
    reason: '타 부트캠프 이용',
    withdrawn_at: '2025.02.01 11:22:28',
  },
  {
    id: 7,
    email: 'ozcoding@gmail.com',
    user_name: '박길동',
    birth_date: '2000.08.03',
    role: 'Staff',
    reason: '타 부트캠프 이용',
    withdrawn_at: '2025.02.01 11:22:28',
  },
  {
    id: 8,
    email: 'ozcoding@gmail.com',
    user_name: '김코치',
    birth_date: '2000.08.03',
    role: 'Staff',
    reason: '타 부트캠프 이용',
    withdrawn_at: '2025.02.01 11:22:28',
  },
  {
    id: 9,
    email: 'ozcoding@gmail.com',
    user_name: '최오즈',
    birth_date: '2000.08.03',
    role: 'Admin',
    reason: '타 부트캠프 이용',
    withdrawn_at: '2025.02.01 11:22:28',
  },
  {
    id: 10,
    email: 'ozcoding@gmail.com',
    user_name: '김초캠',
    birth_date: '2000.08.03',
    role: 'Staff',
    reason: '타 부트캠프 이용',
    withdrawn_at: '2025.02.01 11:22:28',
  },
]

export function MemberWithdrawalPage() {
  const { filters, setFilters, filteredItems, applyFilters } =
    useMemberWithdrawal(MOCK_WITHDRAWAL_DATA)

  return (
    <AdminContainer title="회원 탈퇴 관리">
      <div className="flex h-full flex-col px-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="w-48">
            <Dropdown
              size="sm"
              placeholder="권한"
              options={ROLE_OPTIONS}
              value={filters.role}
              onChange={(v) => setFilters((p) => ({ ...p, role: v }))}
            />
          </div>
          <Input
            placeholder="검색어를 입력하세요."
            className="h-9 w-80"
            value={filters.keyword}
            onChange={(e) =>
              setFilters((p) => ({ ...p, keyword: e.target.value }))
            }
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
          />
          <Button
            variant="search"
            size="search"
            className="shrink-0"
            onClick={applyFilters}
          >
            조회
          </Button>
        </div>

        <div className="relative flex flex-1 flex-col overflow-hidden">
          <MemberWithdrawalList data={filteredItems} />
        </div>
      </div>
    </AdminContainer>
  )
}
