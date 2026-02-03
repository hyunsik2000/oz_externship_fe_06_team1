import { useMemo, useState } from 'react'
import { Button, Dropdown, Input } from '@/components/common'
import { MemberManagementLayout } from '@/components/layout'
import MemberList from '@/components/table/MemberList'
import type { Member, MemberRole } from '@/types/member'
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

export default function MemberManagementPage() {
  const [roleInput, setRoleInput] = useState<MemberRole | undefined>()
  const [statusInput, setStatusInput] = useState<Member['status'] | undefined>()
  const [keywordInput, setKeywordInput] = useState('')

  const [role, setRole] = useState<'ALL' | MemberRole>('ALL')
  const [status, setStatus] = useState<'ALL' | Member['status']>('ALL')
  const [keyword, setKeyword] = useState('')

  const members = MOCK_MEMBER_LIST_RESPONSE.members

  const handleSearch = () => {
    setRole(roleInput ?? 'ALL')
    setStatus(statusInput ?? 'ALL')
    setKeyword(keywordInput)
  }

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase()

    return members.filter((m: Member) => {
      const roleMatch = role === 'ALL' ? true : m.role === role
      const statusMatch = status === 'ALL' ? true : m.status === status

      const keywordMatch = kw
        ? [m.nickname, m.name, m.email].join(' ').toLowerCase().includes(kw)
        : true

      return roleMatch && statusMatch && keywordMatch
    })
  }, [members, role, status, keyword])

  return (
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

          <Button variant="memberSearch" size="memberSearch">
            조회
          </Button>
        </>
      }
    >
      <MemberList data={filtered} />
    </MemberManagementLayout>
  )
}
