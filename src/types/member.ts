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

export type MemberRegistrationStatus = 'Accepted' | 'Rejected' | 'Submitted'

export type MemberRegistrationItemType = {
  id: number
  course_name: string
  cohort: number
  user_name: string
  email: string
  birth_date: string
  status: MemberRegistrationStatus
  requested_at: string
}
