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

export type StudentRegistrationStatus = 'Accepted' | 'Rejected' | 'Submitted'

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

export type MemberWithdrawalItemType = {
  id: number
  email: string
  user_name: string
  birth_date: string
  role: 'General' | 'Student' | 'Staff' | 'Admin'
  reason: string
  withdrawn_at: string
}
