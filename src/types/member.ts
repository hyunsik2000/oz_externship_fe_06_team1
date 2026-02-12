import type { MemberStatus } from '@/components/common'

export type MemberRole =
  | 'Admin'
  | 'Staff (TA)'
  | 'Student'
  | 'General'
  | 'Staff (LC)'
  | 'Staff (OM)'

export type MemberGender = '남' | '여' | '미설정'

export type Member = {
  id: number
  nickname: string
  name: string
  email: string
  phone?: string
  course?: string
  cohort?: string
  birthDate: string
  role: MemberRole
  status: MemberStatus
  joinedAt: string
}

export type MemberDetail = Member & {
  gender?: MemberGender
  phone?: string
  profileImageUrl?: string
  ongoingCourses?: string[]
  cohorts?: string[]
}

export type StudentRegistrationStatus =
  | 'Accepted'
  | 'Rejected'
  | 'Submitted'
  | 'Canceled'

export type StudentRegistrationItemType = {
  id: number
  course_name: string
  cohort: number
  user_name: string
  email: string
  birth_date: string
  status: StudentRegistrationStatus
  requested_at: string
}

export type StudentRegistrationApiStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CANCELED'

export type StudentRegistrationApiQueryStatus =
  | 'accepted'
  | 'rejected'
  | 'pending'
  | 'canceled'

export type StudentRegistrationListQuery = {
  page?: number
  page_size?: number
  search?: string
  status?: StudentRegistrationApiQueryStatus
}

export type StudentRegistrationListResult = {
  id: number
  user: {
    id: number
    email: string
    name: string
    birthday: string
    gender: 'M' | 'F'
  }
  cohort: {
    id: number
    number: number
  }
  course: {
    id: number
    name: string
    tag: string
  }
  status: StudentRegistrationApiStatus
  created_at: string
}

export type StudentRegistrationListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: StudentRegistrationListResult[]
}

export type StudentRegistrationActionRequest = {
  enrollments: number[]
}

export type StudentRegistrationActionResponse = {
  detail: string
}

export type WithdrawalUserInfoType = {
  id: number
  name: string
  nickname: string
  email: string
  phone: string
  birth_date: string
  gender: string
  role: string
  joined_at: string
  profile_image_url?: string
  status: string
}

export type MemberWithdrawalItemType = {
  id: number
  user: WithdrawalUserInfoType
  reason: string
  reason_display: string
  withdrawn_at: string
}

export type MemberWithdrawalDetailType = {
  id: number
  user: WithdrawalUserInfoType
  assigned_courses: {
    course_name: string
    cohort?: number
  }[]
  reason: string
  reason_display: string
  reason_detail: string
  due_date: string
  withdrawn_at: string
}

export interface PaginatedWithdrawalResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

/** GET /api/v1/admin/students/ 쿼리 파라미터 */
export type AdminStudentsQuery = {
  cohort_id?: number
  status?: string
  search?: string
  page?: number
  page_size?: number
}

/** GET /api/v1/admin/students/ 응답 항목 (enrollment 또는 user 스타일 지원) */
export type AdminStudentListItem = {
  id: number
  email?: string
  nickname?: string
  name?: string
  phone_number?: string
  birthday?: string
  status?: string
  role?: string
  created_at?: string
  user?: {
    id: number
    email: string
    name?: string
    nickname?: string
    birthday?: string
    phone_number?: string
  }
  cohort?: { id: number; number: number }
  course?: { id: number; name: string; tag?: string }
  /** in_progress_course 래퍼 (실제 API 응답 구조) */
  in_progress_course?: {
    cohort?: { id: number; number: number }
    course?: { id: number; name: string; tag?: string }
  }
  /** flat 필드 (API 스키마에 따라 다름) */
  course_name?: string
  cohort_number?: number
  /** 수강 중인 과정 목록 (assigned_courses 등) */
  assigned_courses?: Array<{
    course?: { id?: number; name?: string }
    course_name?: string
    cohort?: number | { id?: number; number?: number }
  }>
}

export type AdminStudentListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: AdminStudentListItem[]
}

// GET /api/v1/admin/accounts/ 응답 항목 (200 예제값·스키마 기준)
export type AdminAccountListItem = {
  id: number
  email: string
  nickname?: string
  name?: string
  phone_number?: string
  birthday?: string
  status?: string
  role?: string
  created_at?: string
}

export type AdminAccountListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: AdminAccountListItem[]
}

/** GET /api/v1/admin/accounts/{id}/ 상세 응답 (retrieve) */
export type AssignedCourseItem = {
  course?:
    | string
    | { id?: number; name?: string; course_name?: string; tag?: string }
  cohort?:
    | number
    | {
        id?: number
        number?: number
        status?: string
        status_display?: string
        start_date?: string
        end_date?: string
      }
  course_name?: string
}
export type AdminAccountDetail = AdminAccountListItem & {
  profile_img_url?: string
  gender?: string
  assigned_courses?: AssignedCourseItem[]
}
