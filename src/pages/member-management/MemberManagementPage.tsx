import { useEffect, useMemo, useState } from 'react'
import { Button, Dropdown, Input, Toast } from '@/components/common'
import { MemberDetailModal } from '@/components/member-management/MemberDetailModal'
import { MemberManagementLayout } from '@/components/layout'
import MemberList from '@/components/table/MemberList'
import type { Member, MemberRole } from '@/types'
import { MOCK_MEMBER_LIST_RESPONSE } from '@/mocks/data/table-data/MemberList'
import type { DropdownOption } from '@/types/commonComponents'

const ROLE_OPTIONS: DropdownOption[] = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Manager', value: 'Manager' },
  { label: 'User', value: 'User' },
]

const STATUS_OPTIONS: DropdownOption[] = [
  { label: 'Activated', value: 'Activated' },
  { label: 'Disabled', value: 'Disabled' },
  { label: 'Withdraw', value: 'Withdraw' },
]

type ToastState = {
  open: boolean
  variant: 'success' | 'error'
  message: string
}

export default function MemberManagementPage() {
  const [roleInput, setRoleInput] = useState<MemberRole | undefined>()
  const [statusInput, setStatusInput] = useState<Member['status'] | undefined>()
  const [keywordInput, setKeywordInput] = useState('')
  const [role, setRole] = useState<'ALL' | MemberRole>('ALL')
  const [status, setStatus] = useState<'ALL' | Member['status']>('ALL')
  const [keyword, setKeyword] = useState('')
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [memberList, setMemberList] = useState(
    MOCK_MEMBER_LIST_RESPONSE.members
  )

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

  /* useEffect(() => {
    if (!toast.open) return

    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }))
    }, 3000)

    return () => clearTimeout(timer)
  }, [toast.open]) */

  const openMemberDetail = (member: Member) => {
    setSelectedMember(member)
    setDetailOpen(true)
  }

  const closeMemberDetail = () => {
    setDetailOpen(false)
    setSelectedMember(null)
  }

  const handleDeleteConfirm = (member: Member) => {
    closeMemberDetail()

    setMemberList((prev) => prev.filter((m) => m.id !== member.id))

    setToastOpen(true)
  }

  return (
    <>
      <MemberManagementLayout
        title="회원관리"
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
        <MemberList data={filtered} onClickNickname={openMemberDetail} />
      </MemberManagementLayout>

      <MemberDetailModal
        open={detailOpen}
        onClose={closeMemberDetail}
        member={selectedMember}
        onDeleteConfirm={handleDeleteConfirm}
      />

      {isToastOpen && (
        <div className="fixed right-6 bottom-6 z-[9999]">
          <Toast
            variant={'success'}
            message={'message'}
            onClose={() => setToastOpen(false)}
          />
        </div>
      )}
    </>
  )
}
