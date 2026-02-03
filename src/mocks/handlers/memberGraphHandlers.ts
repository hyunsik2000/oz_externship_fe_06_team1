import { http, HttpResponse } from 'msw'
import {
  MOCK_MONTHLY_MEMBER_DATA,
  MOCK_WITHDRAWAL_DETAIL_BY_REASON,
  MOCK_YEARLY_MEMBER_DATA,
} from '@/mocks/data/graph-data'
import type { MemberViewType } from '@/constants/dashboard/memberDashboardConfig'

export const memberGraphHandlers = [
  http.get('*/api/v1/admin/members/:viewType', ({ params, request }) => {
    const { viewType } = params as { viewType: MemberViewType }
    const url = new URL(request.url)
    const mode = url.searchParams.get('mode')
    const year = url.searchParams.get('year') || '2025'
    const reason = url.searchParams.get('reason')

    if (viewType === 'withdrawal_reason') {
      return HttpResponse.json(
        MOCK_MONTHLY_MEMBER_DATA.withdrawal_reason['2025']
      )
    }

    if (viewType === 'withdrawal_detail') {
      const selectedReason = reason || '이용 빈도가 낮아요.'
      const data = MOCK_WITHDRAWAL_DETAIL_BY_REASON[selectedReason] || []
      return HttpResponse.json(data)
    }

    let data = []
    if (mode === 'monthly') {
      data = MOCK_MONTHLY_MEMBER_DATA[viewType as MemberViewType]?.[year] || []
    } else {
      data = MOCK_YEARLY_MEMBER_DATA[viewType as MemberViewType] || []
    }

    return HttpResponse.json(data)
  }),
]
