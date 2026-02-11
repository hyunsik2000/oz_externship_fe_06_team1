import { http, HttpResponse, delay } from 'msw'
import { API_PATHS } from '@/constants/api'
import {
  deleteMockDeployment,
  MOCK_DEPLOYMENTS,
  updateMockDeploymentStatus,
} from '@/mocks/data/table-data/DeploymentList'

export const examDeploymentHandlers = [
  http.get(`*${API_PATHS.DEPLOYMENT.LIST}`, async ({ request }) => {
    await delay(400)

    const url = new URL(request.url)
    const search = url.searchParams.get('search')?.toLowerCase()
    const page = Number(url.searchParams.get('page') || '1')
    const course = url.searchParams.get('course')
    const cohort = url.searchParams.get('cohort')

    const pageSize = 10

    let filteredResults = [...MOCK_DEPLOYMENTS]

    if (search) {
      filteredResults = filteredResults.filter(
        (item) =>
          item.title.toLowerCase().includes(search) ||
          item.subject_name.toLowerCase().includes(search)
      )
    }

    if (course) {
      filteredResults = filteredResults.filter(
        (item) => item.course_name === course
      )
    }

    if (cohort) {
      filteredResults = filteredResults.filter(
        (item) => item.cohort === Number(cohort)
      )
    }

    const totalCount = filteredResults.length
    const startIndex = (page - 1) * pageSize
    const pagedResults = filteredResults.slice(
      startIndex,
      startIndex + pageSize
    )

    return HttpResponse.json({
      count: totalCount,
      results: pagedResults,
    })
  }),

  http.patch(
    `*/api/v1/admin/exams/deployments/:id/status/`,
    async ({ params, request }) => {
      const { id } = params
      const body = (await request.json()) as { is_active: boolean }

      updateMockDeploymentStatus(Number(id), body.is_active)

      return HttpResponse.json({ detail: 'Status updated' })
    }
  ),

  http.delete(`*/api/v1/admin/exams/deployments/:id/`, async ({ params }) => {
    const { id } = params

    deleteMockDeployment(Number(id))

    return new HttpResponse(null, { status: 204 })
  }),
]
