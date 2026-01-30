import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const CELL_SIZES = {
  xs: 'w-[60px]',
  sm: 'w-[80px]',
  md: 'w-[100px]',
  lg: 'w-[140px]',
  xl: 'w-[180px]',
} as const

const CELL_COLORS = {
  default: 'text-grey-600',
} as const

type CellSize = keyof typeof CELL_SIZES
type CellColor = keyof typeof CELL_COLORS

interface TableCellProps {
  children?: ReactNode
  className?: string
  size?: CellSize
  color?: CellColor
}

export function TableCell({
  children,
  className,
  size,
  color = 'default',
}: TableCellProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        size && CELL_SIZES[size],
        CELL_COLORS[color],
        className
      )}
    >
      {children}
    </div>
  )
}
