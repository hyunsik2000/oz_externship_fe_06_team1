import { AlertModal, Button, Dropdown, Input } from '@/components/common'
import { AdminContainer } from '@/components/layout'
import { StudentRegistrationList } from '@/components/table/StudentRegistrationList'
import { useStudentRegistration } from '@/hooks'
import type { DropdownOption } from '@/types'

const REGISTRATION_STATUS_OPTIONS: DropdownOption[] = [
  { label: '전체', value: 'all' },
  { label: '대기(Submitted)', value: 'Submitted' },
  { label: '승인(Accepted)', value: 'Accepted' },
  { label: '반려(Rejected)', value: 'Rejected' },
  { label: '취소(Canceled)', value: 'Canceled' },
]

export function StudentRegistrationPage() {
  const {
    isLoading,
    filters,
    items,
    currentPage,
    totalPages,
    selectedIds,
    modalConfig,
    setCurrentPage,
    setFilters,
    applyFilters,
    toggleOne,
    toggleAll,
    closeModal,
    openApproveModal,
    openRejectModal,
  } = useStudentRegistration()

  return (
    <>
      <AdminContainer title="수강생 등록 신청">
        <div className="flex h-full flex-col px-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-48">
              <Dropdown
                size="sm"
                placeholder="승인 상태"
                options={REGISTRATION_STATUS_OPTIONS}
                value={filters.status}
                onChange={(v) =>
                  setFilters((p) => ({
                    ...p,
                    status: v as typeof p.status,
                  }))
                }
              />
            </div>
            <Input
              placeholder="검색어를 입력하세요"
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
              {isLoading ? '조회 중...' : '조회'}
            </Button>
          </div>

          <div className="relative flex flex-1 flex-col overflow-hidden">
            <StudentRegistrationList
              data={items}
              currentPage={currentPage}
              totalPages={totalPages}
              selectedIds={selectedIds}
              onPageChange={setCurrentPage}
              onToggleOne={toggleOne}
              onToggleAll={toggleAll}
            />

            <div className="absolute right-0 bottom-0 flex gap-2">
              <Button variant="primary" onClick={openApproveModal}>
                승인
              </Button>
              <Button variant="danger" onClick={openRejectModal}>
                반려
              </Button>
            </div>
          </div>
        </div>
      </AdminContainer>

      <AlertModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        type={modalConfig.type}
        title={modalConfig.title as string}
        description="요청 상태를 변경하면 다시 되돌릴 수 없습니다."
        confirmText={modalConfig.confirmText}
        onConfirm={modalConfig.onConfirm}
      />
    </>
  )
}
