import { http, HttpResponse } from 'msw'
import { MOCK_EXAM_LIST_RESPONSE } from '@/mocks/data/table-data/ExamList'

export const examHandlers = [
  http.get('/api/exams', () => {
    return HttpResponse.json(MOCK_EXAM_LIST_RESPONSE)
  }),
]
