import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { badgeVariants } from '@/constants/variants'
import { cn } from '@/lib/cn'

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export type MemberStatus = 'Activated' | 'Disabled' | 'Withdraw'

const MEMBER_STATUS_TO_VARIANT = {
  Activated: 'memberActivated',
  Disabled: 'memberDisabled',
  Withdraw: 'memberWithdraw',
} as const

type MemberStatusBadgeProps = {
  status: MemberStatus
  className?: string
}

export function MemberStatusBadge({
  status,
  className,
}: MemberStatusBadgeProps) {
  return (
    <Badge
      variant={MEMBER_STATUS_TO_VARIANT[status]}
      size="status"
      className={className}
    >
      {status}
    </Badge>
  )
}
