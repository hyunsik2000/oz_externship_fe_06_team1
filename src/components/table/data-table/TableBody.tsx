import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface TableBodyProps {
  children: ReactNode
  className?: string
}

export function TableBody({ children, className }: TableBodyProps) {
  return <div className={cn('flex w-full flex-col', className)}>{children}</div>
}
