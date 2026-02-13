import { useState, useEffect } from 'react'
import {
  MEMBER_VIEWS,
  type MemberViewType,
} from '@/constants/dashboard/memberDashboardConfig'
import type { MemberChartResponseType } from '@/types'

export function useMemberDashboard() {
  const [viewType, setViewType] = useState<MemberViewType>(
    MEMBER_VIEWS.SUBSCRIBER
  )
  const [filters, setFilters] = useState({
    mode: 'monthly',
    year: '2025',
    reason: '이용 빈도가 낮아요.',
  })

  const [chartResponse, setChartResponse] = useState<MemberChartResponseType>({
    type: 'none',
    data: [],
  })

  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: '',
    description: '',
  })

  useEffect(() => {
    setChartResponse({ type: 'none', data: [] })
    setFilters({
      mode: 'monthly',
      year: '2025',
      reason: '이용 빈도가 낮아요.',
    })
    if (viewType === MEMBER_VIEWS.WITHDRAWAL_REASON) {
      const autoFetch = async () => {
        try {
          const url = `/api/v1/admin/members/${MEMBER_VIEWS.WITHDRAWAL_REASON}`
          const res = await fetch(url)
          const data = await res.json()
          setChartResponse({ type: 'pie', data: data })
        } catch {
          // 전역 에러 처리
        }
      }
      autoFetch()
    }
  }, [viewType])

  const fetchData = async () => {
    if (filters.mode === 'yearly' && chartResponse.data.length < 2) {
      setAlertConfig({
        isOpen: true,
        title: '연간 조회에 필요한 데이터가 부족합니다.',
        description:
          '연간 조회인 경우, 2년 이상인 경우에만 데이터 조회가 가능합니다.',
      })
      return
    }

    try {
      let url = `/api/v1/admin/members/${viewType}`
      let currentType: MemberChartResponseType['type'] = 'bar'

      if (viewType === 'withdrawal_reason') {
        currentType = 'pie'
      } else if (viewType === 'withdrawal_detail') {
        currentType = 'composed'
        url += `?reason=${filters.reason}`
      } else {
        currentType = 'bar'
        url += `?mode=${filters.mode}&year=${filters.year}`
      }
      const res = await fetch(url)
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      setChartResponse({
        type: currentType,
        data: data,
      } as MemberChartResponseType)
    } catch {
      // 전역 에러 처리
    }
  }

  return {
    viewType,
    setViewType,
    filters,
    setFilters,
    chartResponse,
    alertConfig,
    setAlertConfig,
    fetchData,
  }
}
