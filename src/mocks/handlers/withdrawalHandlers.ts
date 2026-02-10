import { http, HttpResponse, delay } from 'msw'
import { API_PATHS } from '@/constants/api'
import {
  deleteMockWithdrawal,
  MOCK_WITHDRAWAL_DATA,
  MOCK_WITHDRAWAL_DETAILS,
} from '@/mocks/data/table-data/WithdrawalList'

export const withdrawalHandlers = [
  http.get(`*${API_PATHS.WITHDRAWAL.LIST}`, async ({ request }) => {
    await delay(500)

    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || '1')
    const role = url.searchParams.get('role')
    const search = url.searchParams.get('search')?.toLowerCase()
    const pageSize = 10

    let filtered = [...MOCK_WITHDRAWAL_DATA]

    if (role && role !== 'all') {
      filtered = filtered.filter((item) => item.user.role === role)
    }

    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.user.name.toLowerCase().includes(search) ||
          item.user.email.toLowerCase().includes(search)
      )
    }

    const totalCount = filtered.length
    const start = (page - 1) * pageSize
    const pagedData = filtered.slice(start, start + pageSize)

    return HttpResponse.json({
      count: totalCount,
      next: totalCount > start + pageSize ? 'next-page-url' : null,
      previous: page > 1 ? 'prev-page-url' : null,
      results: pagedData,
    })
  }),

  http.get(`*/api/v1/admin/withdrawals/:id/`, async ({ params }) => {
    await delay(300)
    const { id } = params
    const detail = MOCK_WITHDRAWAL_DETAILS[Number(id)]

    if (!detail) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(detail)
  }),

  http.delete('*/api/v1/admin/withdrawals/:id/', async ({ params }) => {
    await delay(500)
    const { id } = params

    deleteMockWithdrawal(Number(id))

    return HttpResponse.json(
      { detail: '정상적으로 복구되었습니다.' },
      { status: 200 }
    )
  }),
]
