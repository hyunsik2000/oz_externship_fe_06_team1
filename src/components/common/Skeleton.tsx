import type { CSSProperties } from 'react'

type SkeletonVariant = 'text' | 'rect' | 'circle'
type SkeletonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

type SkeletonProps = {
  className?: string
  width?: number | string
  height?: number | string
  variant?: SkeletonVariant
  radius?: SkeletonRadius
  style?: CSSProperties
}

const radiusClassName: Record<SkeletonRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

export function Skeleton({
  className = '',
  width,
  height,
  variant = 'rect',
  radius,
  style,
}: SkeletonProps) {
  const resolvedRadius = radius ?? (variant === 'circle' ? 'full' : 'md')
  const mergedStyle: CSSProperties = { width, height, ...style }

  return (
    <div
      className={`skeleton ${radiusClassName[resolvedRadius]} ${className}`.trim()}
      style={mergedStyle}
      aria-hidden="true"
    />
  )
}

type SkeletonTextProps = {
  lines?: number
  lineHeight?: number | string
  gap?: number | string
  lastLineWidth?: number | string
  className?: string
}

export function SkeletonText({
  lines = 3,
  lineHeight = 14,
  gap = 8,
  lastLineWidth = '60%',
  className = '',
}: SkeletonTextProps) {
  return (
    <div className={`flex flex-col ${className}`.trim()}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={`skeleton-line-${index}`}
          height={lineHeight}
          width={index === lines - 1 ? lastLineWidth : '100%'}
          radius="sm"
          style={{ marginTop: index === 0 ? 0 : gap }}
        />
      ))}
    </div>
  )
}
