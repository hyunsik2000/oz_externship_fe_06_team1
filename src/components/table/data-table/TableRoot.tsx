import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface TableProps {
  children: ReactNode
  className?: string
}

export function TableRoot({ children, className }: TableProps) {
  return <div className={cn('w-full', className)}>{children}</div>
}
