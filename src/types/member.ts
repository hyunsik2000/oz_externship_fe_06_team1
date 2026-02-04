import type { MemberStatus } from '@/components/common'

export type MemberRole = 'Admin' | 'Manager' | 'User'

export type MemberGender = '남' | '여' | '미설정'

export type Member = {
  id: number
  nickname: string
  name: string
  email: string
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
  completedCourses?: string[]
}
