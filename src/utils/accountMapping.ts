import type { MemberRole } from '@/types/member'
import type { MemberStatus } from '@/components/common'

/** API role 문자열 → 화면 표시용 MemberRole */
const API_ROLE_MAP: Record<string, MemberRole> = {
  USER: 'General',
  user: 'General',
  General: 'General',
  general: 'General',
  LC: 'Staff (LC)',
  lc: 'Staff (LC)',
  TA: 'Staff (TA)',
  ta: 'Staff (TA)',
  OM: 'Staff (OM)',
  om: 'Staff (OM)',
  ADMIN: 'Admin',
  admin: 'Admin',
  Admin: 'Admin',
  STAFF: 'Staff (TA)',
  staff: 'Staff (TA)',
  STUDENT: 'Student',
  student: 'Student',
  Student: 'Student',
  'Staff (TA)': 'Staff (TA)',
  'Staff (LC)': 'Staff (LC)',
  'Staff (OM)': 'Staff (OM)',
}

/** API status 문자열 → 화면 표시용 MemberStatus */
const API_STATUS_MAP: Record<string, MemberStatus> = {
  ACTIVATED: 'Activated',
  activated: 'Activated',
  Activated: 'Activated',
  DISABLED: 'Disabled',
  disabled: 'Disabled',
  Disabled: 'Disabled',
  WITHDRAW: 'Withdraw',
  withdraw: 'Withdraw',
  Withdraw: 'Withdraw',
}

export function mapApiRoleToMemberRole(apiRole?: string): MemberRole {
  if (!apiRole) return 'General'
  return API_ROLE_MAP[apiRole] ?? ('General' as MemberRole)
}

export function mapApiStatusToMemberStatus(apiStatus?: string): MemberStatus {
  if (!apiStatus) return 'Activated'
  return API_STATUS_MAP[apiStatus] ?? ('Activated' as MemberStatus)
}
