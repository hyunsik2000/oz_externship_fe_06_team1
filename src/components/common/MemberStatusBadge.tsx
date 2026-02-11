import type { BadgeProps } from '@/components/common/Badge'
import { Badge } from '@/components/common'

export type MemberStatus =
  | 'active'
  | 'Activated' // mock 등 레거시용
  | 'Disabled'
  | 'Withdraw'
  | 'Submitted'
  | 'Accepted'
  | 'Rejected'
  | 'Canceled'
  | 'General'
  | 'Student'
  | 'Staff'
  | 'Admin'

const STATUS_TO_VARIANT: Record<MemberStatus, BadgeProps['variant']> = {
  active: 'primary',
  Activated: 'primary',
  Disabled: 'danger',
  Withdraw: 'success',
  Submitted: 'success',
  Accepted: 'primary',
  Rejected: 'danger',
  Canceled: 'default',
  General: 'default',
  Student: 'success',
  Staff: 'primary',
  Admin: 'danger',
} as const

type MemberStatusBadgeProps = {
  status: MemberStatus
  className?: BadgeProps['className']
}

export function MemberStatusBadge({
  status,
  className,
}: MemberStatusBadgeProps) {
  return (
    <Badge
      variant={STATUS_TO_VARIANT[status]}
      size="status"
      className={className}
    >
      {status === 'active' || status === 'Activated' ? 'Active' : status}
    </Badge>
  )
}
