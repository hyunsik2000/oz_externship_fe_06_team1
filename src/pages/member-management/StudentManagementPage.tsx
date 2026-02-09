import ManagementPage from './ManagementPage'
import { MOCK_MEMBER_LIST_RESPONSE } from '@/mocks/data/table-data/MemberList'

export function StudentManagementPage() {
  const studentList = MOCK_MEMBER_LIST_RESPONSE.members.filter(
    (member) => member.role === 'Student'
  )

  return (
    <ManagementPage
      title="수강생 관리"
      listVariant="student"
      listData={studentList}
      enableDetail={false}
    />
  )
}
