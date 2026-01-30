import type { VariantProps } from 'class-variance-authority'
import { badgeVariants } from '@/constants/variants'
import { cn } from '@/lib/cn'

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}
