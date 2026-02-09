import ManagementPage from './ManagementPage'
import { MOCK_MEMBER_LIST_RESPONSE } from '@/mocks/data/table-data/MemberList'

export function MemberManagementPage() {
  return (
    <ManagementPage
      title="회원관리"
      listVariant="member"
      listData={MOCK_MEMBER_LIST_RESPONSE.members}
    />
  )
}
