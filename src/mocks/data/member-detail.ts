import { MOCK_MEMBER_LIST } from '@/mocks/data/table-data/MemberList'
import type { MemberDetail } from '@/types'

export const MOCK_MEMBER_DETAIL_MAP: Record<number, MemberDetail> =
  MOCK_MEMBER_LIST.reduce<Record<number, MemberDetail>>((acc, member) => {
    acc[member.id] = member
    return acc
  }, {})
