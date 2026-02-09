import { Skeleton } from '@/components/common/Skeleton'

type TableSkeletonProps = {
  rows?: number
  rowHeight?: number
  className?: string
}

export function TableSkeleton({
  rows = 10,
  rowHeight = 44,
  className = '',
}: TableSkeletonProps) {
  return (
    <div className={`flex w-full flex-col gap-2 ${className}`.trim()}>
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={`table-skeleton-${index}`} height={rowHeight} />
      ))}
    </div>
  )
}
