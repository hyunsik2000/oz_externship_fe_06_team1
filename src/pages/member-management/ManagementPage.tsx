import { useEffect, useMemo, useState } from 'react'
import { Button, Dropdown, Input, Toast } from '@/components/common'
import { MemberDetailModal } from '@/components/member-management/MemberDetailModal'
import { MemberEditModal } from '@/components/member-management/MemberEditModal'
import { MemberManagementLayout } from '@/components/layout'
import MemberList from '@/components/table/MemberList'
import type { Member, MemberRole } from '@/types'
import { MOCK_MEMBER_DETAIL_MAP } from '@/mocks/data/member-detail'
import type { DropdownOption } from '@/types/commonComponents'

const ROLE_OPTIONS: DropdownOption[] = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Staff (TA)', value: 'Staff (TA)' },
  { label: 'Student', value: 'Student' },
  { label: 'General', value: 'General' },
  { label: 'Staff (LC)', value: 'Staff (LC)' },
  { label: 'Staff (OM)', value: 'Staff (OM)' },
]

const STATUS_OPTIONS: DropdownOption[] = [
  { label: 'Activated', value: 'Activated' },
  { label: 'Disabled', value: 'Disabled' },
  { label: 'Withdraw', value: 'Withdraw' },
]

type ManagementPageProps = {
  title: string
  listVariant: 'member' | 'student'
  listData: Member[]
  enableDetail?: boolean
}

export default function ManagementPage({
  title,
  listVariant,
  listData,
  enableDetail = true,
}: ManagementPageProps) {
  const [roleInput, setRoleInput] = useState<MemberRole | undefined>()
  const [statusInput, setStatusInput] = useState<Member['status'] | undefined>()
  const [keywordInput, setKeywordInput] = useState('')
  const [role, setRole] = useState<'ALL' | MemberRole>('ALL')
  const [status, setStatus] = useState<'ALL' | Member['status']>('ALL')
  const [keyword, setKeyword] = useState('')
  const [detailOpen, setDetailOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [memberList, setMemberList] = useState(listData)

  const [isToastOpen, setToastOpen] = useState<boolean>(false)

  const handleSearch = () => {
    setRole(roleInput ?? 'ALL')
    setStatus(statusInput ?? 'ALL')
    setKeyword(keywordInput)
  }

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase()

    return memberList.filter((m: Member) => {
      const roleMatch = role === 'ALL' ? true : m.role === role
      const statusMatch = status === 'ALL' ? true : m.status === status

      const keywordMatch = kw
        ? [m.nickname, m.name, m.email].join(' ').toLowerCase().includes(kw)
        : true

      return roleMatch && statusMatch && keywordMatch
    })
  }, [memberList, role, status, keyword])

  useEffect(() => {
    if (!isToastOpen) return

    const timer = setTimeout(() => {
      setToastOpen(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isToastOpen])

  const openMemberDetail = (member: Member) => {
    if (!enableDetail) return
    setSelectedMember(member)
    setDetailOpen(true)
  }

  const closeMemberDetail = () => {
    setDetailOpen(false)
    setSelectedMember(null)
  }

  const openMemberEdit = () => {
    if (!selectedMember) return
    setDetailOpen(false)
    setEditOpen(true)
  }

  const closeMemberEdit = () => {
    setEditOpen(false)
  }

  const handleDeleteConfirm = (member: Member) => {
    closeMemberDetail()

    setMemberList((prev) => prev.filter((m) => m.id !== member.id))

    setToastOpen(true)
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
            <div className="w-[140px]">
              <Dropdown
                variant="memberFilter"
                size="sm"
                placeholder="권한"
                options={ROLE_OPTIONS}
                value={roleInput}
                onChange={(v) => setRoleInput(v as MemberRole)}
              />
            </div>

            <div className="w-[171px]">
              <Dropdown
                variant="memberFilter"
                size="sm"
                placeholder="회원 상태"
                options={STATUS_OPTIONS}
                value={statusInput}
                onChange={(v) => setStatusInput(v as Member['status'])}
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
        <MemberList
          data={filtered}
          onClickName={enableDetail ? openMemberDetail : undefined}
          variant={listVariant}
        />
      </MemberManagementLayout>

      {enableDetail && (
        <>
          <MemberDetailModal
            open={detailOpen}
            onClose={closeMemberDetail}
            member={selectedMember}
            onDeleteConfirm={handleDeleteConfirm}
            onEdit={openMemberEdit}
          />

          <MemberEditModal
            open={editOpen}
            onClose={closeMemberEdit}
            detail={selectedDetail}
            courseOptions={courseOptions}
            cohortOptions={cohortOptions}
          />
        </>
      )}

      {isToastOpen && (
        <div className="fixed right-[30px] bottom-[30px] z-[9999]">
          <Toast
            variant={'success'}
            message={'성공적으로 삭제가 완료되었습니다.'}
            onClose={() => setToastOpen(false)}
          />
        </div>
      )}
    </>
  )
}
