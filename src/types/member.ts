import type { MemberStatus } from '@/components/common'

export type MemberRole = 'Admin' | 'Manager' | 'User'

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
