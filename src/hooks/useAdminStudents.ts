import { useEffect, useState } from 'react'
import { API_PATHS } from '@/constants/api'
import type {
  AdminStudentListResponse,
  AdminStudentListItem,
  Member,
} from '@/types/member'
import { useAxios } from './useAxios'
import { mapApiStatusToMemberStatus } from '@/utils/accountMapping'

const DEFAULT_PAGE_SIZE = 20

function getCourseName(item: AdminStudentListItem): string | undefined {
  if (item.course_name) return item.course_name
  if (item.course?.name) return item.course.name
  if (item.in_progress_course?.course?.name)
    return item.in_progress_course.course.name
  const first = item.assigned_courses?.[0]
  if (first?.course_name) return first.course_name
  if (first?.course?.name) return first.course.name
  return undefined
}

function getCohortDisplay(item: AdminStudentListItem): string | undefined {
  if (item.cohort_number != null) return `${item.cohort_number}기`
  if (item.cohort?.number != null) return `${item.cohort.number}기`
  if (item.in_progress_course?.cohort?.number != null)
    return `${item.in_progress_course.cohort.number}기`
  const first = item.assigned_courses?.[0]
  const c = first?.cohort
  if (typeof c === 'number') return `${c}기`
  if (c?.number != null) return `${c.number}기`
  return undefined
}

function mapStudentToMember(item: AdminStudentListItem): Member {
  const u = item.user

  return {
    id: u?.id ?? item.id ?? 0,
    nickname: item.nickname ?? u?.nickname ?? '',
    name: item.name ?? u?.name ?? '-',
    email: item.email ?? u?.email ?? '',
    phone: item.phone_number ?? (u as { phone_number?: string })?.phone_number,
    birthDate: item.birthday ?? (u as { birthday?: string })?.birthday ?? '-',
    role: 'Student',
    status: mapApiStatusToMemberStatus(item.status),
    joinedAt: item.created_at ?? '-',
    course: getCourseName(item),
    cohort: getCohortDisplay(item),
  }
}

export type UseAdminStudentsOptions = {
  cohort_id?: number
  /** 기수 번호 (예: 10, 11) - API가 cohort_number로 필터링할 때 사용 */
  cohort_number?: number
  status?: string
  search?: string
  page?: number
  page_size?: number
}

export function useAdminStudents(options?: UseAdminStudentsOptions) {
  const { sendRequest, isLoading } = useAxios()
  const [members, setMembers] = useState<Member[]>([])
  const [totalCount, setTotalCount] = useState(0)

  const cohortId = options?.cohort_id
  const cohortNumber = options?.cohort_number
  const status = options?.status
  const search = options?.search
  const page = options?.page ?? 1
  const pageSize = options?.page_size ?? DEFAULT_PAGE_SIZE

  useEffect(() => {
    const fetchStudents = async () => {
      const params: Record<string, string | number> = {
        page,
        page_size: pageSize,
      }
      if (cohortId != null) params.cohort_id = cohortId
      if (cohortNumber != null) params.cohort_number = cohortNumber
      if (status) params.status = status.toLowerCase()
      if (search) params.search = search

      try {
        const data = await sendRequest<AdminStudentListResponse>({
          method: 'GET',
          url: API_PATHS.STUDENTS.LIST,
          params,
          errorTitle: '수강생 목록 조회에 실패했습니다.',
        })

        if (data?.results) {
          setMembers(data.results.map(mapStudentToMember))
          setTotalCount(data.count ?? data.results.length)
        } else {
          setMembers([])
          setTotalCount(0)
        }
      } catch {
        setMembers([])
        setTotalCount(0)
      }
    }

    void fetchStudents()
  }, [sendRequest, cohortId, cohortNumber, status, search, page, pageSize])

  return {
    members,
    totalCount,
    isLoading,
  }
}
