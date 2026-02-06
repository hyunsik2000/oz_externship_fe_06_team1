import { useMemo, useState } from 'react'
import type { MemberWithdrawalItemType } from '@/types'

export function useMemberWithdrawal(initialData: MemberWithdrawalItemType[]) {
  const [filters, setFilters] = useState({
    role: 'all',
    keyword: '',
  })

  const [appliedFilters, setAppliedFilters] = useState({
    role: 'all',
    keyword: '',
  })

  const filteredItems = useMemo(() => {
    return initialData.filter((item) => {
      const matchRole =
        appliedFilters.role === 'all' || item.role === appliedFilters.role

      const matchKeyword =
        item.user_name.includes(appliedFilters.keyword) ||
        item.email.includes(appliedFilters.keyword) ||
        item.reason.includes(appliedFilters.keyword)

      return matchRole && matchKeyword
    })
  }, [initialData, appliedFilters])

  const applyFilters = () => {
    setAppliedFilters(filters)
  }

  return {
    filters,
    setFilters,
    filteredItems,
    applyFilters,
  }
}
