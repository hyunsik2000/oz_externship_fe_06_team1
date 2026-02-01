import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type SolveViewLayoutProps = {
  children: ReactNode
  className?: string
}

export function SolveViewLayout({ children, className }: SolveViewLayoutProps) {
  return (
    <div className={cn('bg-grey-50 h-full w-full p-6', className)}>
      {children}
    </div>
  )
}
