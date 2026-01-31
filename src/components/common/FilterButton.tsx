import { Search } from 'lucide-react'
import { Button } from './Button'

type Props = {
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function FilterButton({ onClick, className, disabled }: Props) {
  return (
    <Button
      variant="filter"
      leftIcon={<Search size={20} />}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      과정별 필터링
    </Button>
  )
}
