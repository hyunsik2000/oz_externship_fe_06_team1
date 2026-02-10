import { Button, Dropdown, Input } from '@/components/common'
import { AdminContainer } from '@/components/layout'
import { MemberWithdrawalDetailModal } from '@/components/member-management/MemberWithdrawalDetailModal'
import { MemberWithdrawalList } from '@/components/table/MemberWithdrawalList'
import { useMemberWithdrawal } from '@/hooks/useMemberWithdrawal'
import type { DropdownOption } from '@/types'

const ROLE_OPTIONS: DropdownOption[] = [
  { label: '전체 권한', value: 'all' },
  { label: 'General', value: 'General' },
  { label: 'Student', value: 'Student' },
  { label: 'Staff', value: 'Staff' },
  { label: 'Admin', value: 'Admin' },
]

export function MemberWithdrawalPage() {
  const {
    filters,
    setFilters,
    data,
    totalCount,
    applyFilters,
    isModalOpen,
    selectedDetail,
    openDetail,
    closeDetail,
    handleRecover,
    isLoading,
  } = useMemberWithdrawal()

  return (
    <>
      <AdminContainer title="회원 탈퇴 관리">
        <div className="flex h-full flex-col px-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-48">
              <Dropdown
                size="sm"
                placeholder="권한"
                options={ROLE_OPTIONS}
                value={filters.role}
                onChange={(v) =>
                  setFilters((p) => ({ ...p, role: v, page: 1 }))
                }
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
              disabled={isLoading}
            >
              {isLoading ? '로딩 중...' : '조회'}
            </Button>
          </div>

          <div className="relative flex flex-1 flex-col overflow-hidden">
            <MemberWithdrawalList
              data={data}
              onItemClick={openDetail}
              currentPage={filters.page}
              totalCount={totalCount}
              onPageChange={(page) => setFilters((p) => ({ ...p, page }))}
            />
          </div>
        </div>
      </AdminContainer>
      <MemberWithdrawalDetailModal
        open={isModalOpen}
        onClose={closeDetail}
        detail={selectedDetail}
        onRecoverConfirm={handleRecover}
      />
    </>
  )
}
