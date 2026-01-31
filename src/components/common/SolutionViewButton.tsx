import MagnifierIcon from '@/assets/icons/magnifier.svg?react'
import { Button } from '@/components/common/Button'
import { cn } from '@/lib/cn'

type Props = {
  onClick?: () => void
  disabled?: boolean
  className?: string
  label?: string
}

export function SolutionViewButton({
  onClick,
  disabled,
  className,
  label = '풀이 보기',
}: Props) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'text-primary-600 bg-primary-50 hover:bg-primary-50/80 border-primary-300 inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      <MagnifierIcon className="h-4 w-4" aria-hidden />
      {label}
    </Button>
  )
}
