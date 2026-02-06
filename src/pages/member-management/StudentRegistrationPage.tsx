import { AlertModal, Button, Dropdown, Input } from '@/components/common'
import { AdminContainer } from '@/components/layout'
import { StudentRegistrationList } from '@/components/table/StudentRegistrationList'
import { useStudentRegistration } from '@/hooks'
import type {
  DropdownOption,
  MemberRegistrationItemType,
  MemberRegistrationStatus,
} from '@/types'

const REGISTRATION_STATUS_OPTIONS: DropdownOption[] = [
  { label: '전체', value: 'all' },
  { label: '대기(Submitted)', value: 'Submitted' },
  { label: '승인(Accepted)', value: 'Accepted' },
  { label: '반려(Rejected)', value: 'Rejected' },
]

const MOCK_INITIAL_DATA: MemberRegistrationItemType[] = [
  {
    id: 1,
    course_name: '웹 개발 초격차 프론트엔드 부트캠프',
    cohort: 8,
    user_name: '김오즈',
    email: 'ozkim@gmail.com',
    birth_date: '2000.08.03',
    status: 'Submitted' as MemberRegistrationStatus,
    requested_at: '2025.02.01 11:22:28',
  },
  {
    id: 2,
    course_name: '웹 개발 초격차 백엔드 부트캠프',
    cohort: 8,
    user_name: '홍길동',
    email: 'oz-user@gmail.com',
    birth_date: '1998-11-02',
    status: 'Submitted' as MemberRegistrationStatus,
    requested_at: '2025.02.01 11:30:28',
  },
  {
    id: 3,
    course_name: '웹 개발 초격차 백엔드 부트캠프',
    cohort: 12,
    user_name: '박성수',
    email: 'parkseongsu@gmail.com',
    birth_date: '2000-10-30',
    status: 'Submitted' as MemberRegistrationStatus,
    requested_at: '2025.06.11 05:36:12',
  },
]

export function StudentRegistrationPage() {
  const {
    filters,
    filteredItems,
    selectedIds,
    modalConfig,
    setFilters,
    applyFilters,
    toggleOne,
    toggleAll,
    closeModal,
    openApproveModal,
    openRejectModal,
  } = useStudentRegistration(MOCK_INITIAL_DATA)

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
                onChange={(v) => setFilters((p) => ({ ...p, status: v }))}
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
            <StudentRegistrationList
              data={filteredItems}
              selectedIds={selectedIds}
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
