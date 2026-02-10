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
