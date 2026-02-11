import ManagementPage from './ManagementPage'
import { useAdminAccounts } from '@/hooks'

export function MemberManagementPage() {
  const { members, isLoading } = useAdminAccounts({
    page: 1,
    page_size: 20,
  })

  return (
    <ManagementPage
      title="회원관리"
      listVariant="member"
      listData={members}
      externalLoading={isLoading}
    />
  )
}
