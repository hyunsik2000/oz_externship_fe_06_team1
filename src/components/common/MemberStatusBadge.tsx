import type { BadgeProps } from '@/components/common/Badge'
import { Badge } from '@/components/common'

export type MemberStatus =
  | 'Activated'
  | 'Disabled'
  | 'Withdraw'
  | 'Submitted'
  | 'Accepted'
  | 'Rejected'
  | 'General'
  | 'Student'
  | 'Staff'
  | 'Admin'

const STATUS_TO_VARIANT = {
  Activated: 'primary',
  Disabled: 'danger',
  Withdraw: 'success',
  Submitted: 'success',
  Accepted: 'primary',
  Rejected: 'danger',
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
      {status}
    </Badge>
  )
}
