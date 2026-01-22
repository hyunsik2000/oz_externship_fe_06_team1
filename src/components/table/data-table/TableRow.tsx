import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface TableRowProps {
  children: ReactNode
  className?: string
}

export function TableRow({ children, className }: TableRowProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center border-b border-slate-100 py-4 text-center text-sm text-slate-600 transition-colors',
        className
      )}
    >
      {children}
    </div>
  )
}
