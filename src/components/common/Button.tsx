import type { VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { buttonVariants } from '@/constants/variants'
import { cn } from '@/lib/cn'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  )
}
