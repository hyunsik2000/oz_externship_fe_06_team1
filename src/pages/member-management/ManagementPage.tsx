import { useEffect, useMemo, useState } from 'react'
import { Button, Dropdown, Input, TableSkeleton } from '@/components/common'
import { MemberDetailModal } from '@/components/member-management/MemberDetailModal'
import { MemberEditModal } from '@/components/member-management/MemberEditModal'
import { MemberManagementLayout } from '@/components/layout'
import MemberList from '@/components/table/MemberList'
import type { Member, MemberDetail, MemberRole } from '@/types'
import { MOCK_MEMBER_DETAIL_MAP } from '@/mocks/data/member-detail'
import type { DropdownOption } from '@/types/commonComponents'
import { useToastStore } from '@/store'

const ROLE_OPTIONS: DropdownOption[] = [
  { label: '전체', value: 'ALL' },
  { label: 'Admin', value: 'Admin' },
  { label: 'Staff (TA)', value: 'Staff (TA)' },
  { label: 'Student', value: 'Student' },
  { label: 'General', value: 'General' },
  { label: 'Staff (LC)', value: 'Staff (LC)' },
  { label: 'Staff (OM)', value: 'Staff (OM)' },
]

const STATUS_OPTIONS: DropdownOption[] = [
  { label: '전체', value: 'ALL' },
  { label: 'Activated', value: 'Activated' },
  { label: 'Disabled', value: 'Disabled' },
  { label: 'Withdraw', value: 'Withdraw' },
]

type StudentSearchFilters = {
  cohort_id?: number
  status?: string
  keyword?: string
}

type ManagementPageProps = {
  title: string
  listVariant: 'member' | 'student'
  listData: Member[]
  enableDetail?: boolean
  externalLoading?: boolean
  /** 수강생: 기수 옵션 및 조회 시 API refetch 콜백 */
  studentCohortOptions?: DropdownOption[]
  onStudentSearch?: (filters: StudentSearchFilters) => void
}

const STUDENT_COHORT_OPTIONS: DropdownOption[] = [
  { label: '전체', value: '' },
  { label: '10기', value: '10' },
  { label: '11기', value: '11' },
  { label: '12기', value: '12' },
  { label: '13기', value: '13' },
  { label: '14기', value: '14' },
  { label: '15기', value: '15' },
]

export default function ManagementPage({
  title,
  listVariant,
  listData,
  enableDetail = true,
  externalLoading,
  studentCohortOptions = listVariant === 'student'
    ? STUDENT_COHORT_OPTIONS
    : undefined,
  onStudentSearch,
}: ManagementPageProps) {
  const showRoleFilter = listVariant === 'member'
  const showCohortFilter =
    listVariant === 'student' && studentCohortOptions?.length
  const [cohortInput, setCohortInput] = useState('')
  const [roleInput, setRoleInput] = useState<MemberRole | 'ALL'>('ALL')
  const [statusInput, setStatusInput] = useState<Member['status'] | 'ALL'>(
    'ALL'
  )
  const [keywordInput, setKeywordInput] = useState('')
  const [role, setRole] = useState<'ALL' | MemberRole>('ALL')
  const [status, setStatus] = useState<'ALL' | Member['status']>('ALL')
  const [keyword, setKeyword] = useState('')
  const [detailOpen, setDetailOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [editDetail, setEditDetail] = useState<MemberDetail | null>(null)
  const [memberList, setMemberList] = useState(listData)
  const showToast = useToastStore((state) => state.showToast)
  const [internalLoading, setInternalLoading] = useState(
    externalLoading === undefined
  )

  useEffect(() => {
    setMemberList(listData)
  }, [listData])

  useEffect(() => {
    if (externalLoading !== undefined) return
    const timer = setTimeout(() => setInternalLoading(false), 500)
    return () => clearTimeout(timer)
  }, [externalLoading])

  const isLoading =
    externalLoading !== undefined ? externalLoading : internalLoading

  const handleSearch = () => {
    setRole(roleInput ?? 'ALL')
    setStatus(statusInput ?? 'ALL')
    setKeyword(keywordInput)
    if (showCohortFilter && onStudentSearch) {
      const cohortId = cohortInput ? Number(cohortInput) : undefined
      const statusVal =
        statusInput && statusInput !== 'ALL' ? statusInput : undefined
      onStudentSearch({
        cohort_id: cohortId,
        status: statusVal,
        keyword: keywordInput.trim() || undefined,
      })
    }
  }

  useEffect(() => {
    if (keywordInput.trim() === '') {
      setKeyword('')
      if (showCohortFilter && onStudentSearch) {
        const cohortId = cohortInput ? Number(cohortInput) : undefined
        const statusVal =
          statusInput && statusInput !== 'ALL' ? statusInput : undefined
        onStudentSearch({
          cohort_id: cohortId,
          status: statusVal,
          keyword: undefined,
        })
      }
    }
  }, [
    keywordInput,
    showCohortFilter,
    onStudentSearch,
    cohortInput,
    statusInput,
  ])

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase()

    return memberList.filter((m: Member) => {
      const roleMatch = showRoleFilter
        ? role === 'ALL' || m.role === role
        : true
      const statusMatch = status === 'ALL' ? true : m.status === status

      const keywordMatch = kw
        ? [m.nickname, m.name, m.email].join(' ').toLowerCase().includes(kw)
        : true

      return roleMatch && statusMatch && keywordMatch
    })
  }, [memberList, role, showRoleFilter, status, keyword])

  const openMemberDetail = (member: Member) => {
    if (!enableDetail) return
    setSelectedMember(member)
    setDetailOpen(true)
  }

  const closeMemberDetail = () => {
    setDetailOpen(false)
    setSelectedMember(null)
  }

  const openMemberEdit = (detail: MemberDetail) => {
    setEditDetail(detail)
    setDetailOpen(false)
    setEditOpen(true)
  }

  const closeMemberEdit = () => {
    setEditOpen(false)
    setEditDetail(null)
  }

  const handleDeleteConfirm = (member: Member) => {
    closeMemberDetail()

    setMemberList((prev) => prev.filter((m) => m.id !== member.id))

    showToast({
      variant: 'success',
      message: '성공적으로 삭제가 완료되었습니다.',
    })
  }

  const handleEditSave = () => {
    showToast({
      variant: 'success',
      message: '성공적으로 수정이 완료되었습니다.',
    })
  }

  const handlePermissionConfirm = () => {
    showToast({
      variant: 'success',
      message: '권한이 성공적으로 변경되었습니다.',
    })
  }

  const selectedDetail = useMemo(() => {
    if (!selectedMember) return null
    const detail = MOCK_MEMBER_DETAIL_MAP[selectedMember.id] ?? {
      ...selectedMember,
      gender: '미설정',
      phone: '-',
      ongoingCourses: [],
      cohorts: [],
    }
    return listVariant === 'student'
      ? { ...detail, role: selectedMember.role }
      : detail
  }, [selectedMember, listVariant])

  const courseOptions = useMemo(() => {
    const allCourses = Object.values(MOCK_MEMBER_DETAIL_MAP)
      .flatMap((detail) => detail.ongoingCourses ?? [])
      .filter(Boolean)
    return Array.from(new Set(allCourses)).map((course) => ({
      label: course,
      value: course,
    }))
  }, [])

  const cohortOptions = useMemo(() => {
    const allCohorts = Object.values(MOCK_MEMBER_DETAIL_MAP)
      .flatMap((detail) => detail.cohorts ?? [])
      .filter(Boolean)
    return Array.from(new Set(allCohorts)).map((cohort) => ({
      label: cohort,
      value: cohort,
    }))
  }, [])

  return (
    <>
      <MemberManagementLayout
        title={title}
        toolbar={
          <>
            {showCohortFilter && studentCohortOptions && (
              <div className="w-[100px]">
                <Dropdown
                  variant="memberFilter"
                  size="sm"
                  placeholder="기수"
                  options={studentCohortOptions}
                  value={cohortInput}
                  onChange={(v) => setCohortInput(v ?? '')}
                />
              </div>
            )}
            {showRoleFilter && (
              <div className="w-[140px]">
                <Dropdown
                  variant="memberFilter"
                  size="sm"
                  placeholder="권한"
                  options={ROLE_OPTIONS}
                  value={roleInput}
                  onChange={(v) => {
                    const val = v as MemberRole | 'ALL'
                    setRoleInput(val)
                    setRole(val)
                  }}
                />
              </div>
            )}

            <div className="w-[171px]">
              <Dropdown
                variant="memberFilter"
                size="sm"
                placeholder="회원 상태"
                options={STATUS_OPTIONS}
                value={statusInput}
                onChange={(v) => {
                  const val = v as Member['status'] | 'ALL'
                  setStatusInput(val)
                  setStatus(val)
                }}
              />
            </div>

            <div className="w-[340px]">
              <Input
                size="sm"
                placeholder="검색어를 입력하세요."
                className="rounded-[3px] border-[#DDDDDD]"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch()
                }}
              />
            </div>

            <Button variant="search" size="search" onClick={handleSearch}>
              조회
            </Button>
          </>
        }
      >
        {isLoading ? (
          <TableSkeleton rows={10} />
        ) : (
          <MemberList
            data={filtered}
            onClickName={enableDetail ? openMemberDetail : undefined}
            variant={listVariant}
          />
        )}
      </MemberManagementLayout>

      {enableDetail && (
        <>
          <MemberDetailModal
            open={detailOpen}
            onClose={closeMemberDetail}
            member={selectedMember}
            onDeleteConfirm={handleDeleteConfirm}
            onEdit={openMemberEdit}
            onPermissionConfirm={handlePermissionConfirm}
          />

          <MemberEditModal
            open={editOpen}
            onClose={closeMemberEdit}
            detail={editDetail ?? selectedDetail}
            courseOptions={courseOptions}
            cohortOptions={cohortOptions}
            onSave={handleEditSave}
          />
        </>
      )}
    </>
  )
}
