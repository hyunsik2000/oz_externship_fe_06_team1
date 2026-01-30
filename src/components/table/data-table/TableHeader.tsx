import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface TableHeaderProps {
  children: ReactNode
  className?: string
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <div
      className={cn(
        'bg-grey-50 border-grey-300 text-grey-800 flex h-[50px] w-full border-t border-b text-sm',
        className
      )}
    >
      {children}
    </div>
  )
}
