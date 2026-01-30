import { Search } from 'lucide-react'
import { Button } from './Button'

export function FilterButton() {
  return (
    <Button variant="filter" leftIcon={<Search size={20} />}>
      과정별 필터링
    </Button>
  )
}
