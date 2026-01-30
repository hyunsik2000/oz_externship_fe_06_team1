import type { VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { buttonVariants } from '@/constants/variants'
import { cn } from '@/lib/cn'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode
}

export function Button({
  className,
  variant,
  size,
  leftIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {leftIcon && leftIcon}
      {children}
    </button>
  )
}
