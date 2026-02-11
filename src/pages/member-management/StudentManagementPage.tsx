import { useCallback, useState } from 'react'
import ManagementPage from './ManagementPage'
import { useAdminStudents } from '@/hooks'

type StudentFilters = {
  cohort_id?: number
  status?: string
  keyword?: string
}

export function StudentManagementPage() {
  const [filters, setFilters] = useState<StudentFilters>({})

  const { members, isLoading } = useAdminStudents({
    cohort_id: filters.cohort_id,
    status: filters.status,
    search: filters.keyword,
  })

  const handleStudentSearch = useCallback((next: StudentFilters) => {
    setFilters(next)
  }, [])

  return (
    <ManagementPage
      title="수강생 관리"
      listVariant="student"
      listData={members}
      enableDetail={false}
      externalLoading={isLoading}
      onStudentSearch={handleStudentSearch}
    />
  )
}
