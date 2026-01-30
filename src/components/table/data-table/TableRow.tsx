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
        'border-grey-300 flex h-[50px] w-full items-center border-b text-center text-sm',
        className
      )}
    >
      {children}
    </div>
  )
}
