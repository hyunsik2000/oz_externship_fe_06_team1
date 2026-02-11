import { http, HttpResponse } from 'msw'
import { API_PATHS } from '@/constants/api'

export const adminAccountHandlers = [
  http.patch(
    `*${API_PATHS.ACCOUNTS.DETAIL(':id')}`,
    async ({ params, request }) => {
      const { id } = params as { id: string }
      const body = (await request.json()) as Record<string, unknown>

      return HttpResponse.json(
        {
          id: Number(id),
          ...body,
        },
        { status: 200 }
      )
    }
  ),
]
