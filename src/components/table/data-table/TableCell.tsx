import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const CELL_SIZES = {
  xs: 'w-[80px]', // ID
  sm: 'w-[100px]', // 상태, 배포여부
  md: 'w-[120px]', // 카운트, 수치
  lg: 'w-[180px]', // 과목명, 짧은 텍스트
  xl: 'w-[220px]', // 날짜, 긴 텍스트
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
