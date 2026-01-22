import { http, HttpResponse } from 'msw'
import { MOCK_EXAM_LIST_RESPONSE } from './table-data/ExamList'

export const handlers = [
  http.get('/api/hello', () => {
    return HttpResponse.json({ message: 'Hello, world!', code: 200 })
  }),
  http.get('/api/exams', () => {
    return HttpResponse.json(MOCK_EXAM_LIST_RESPONSE)
  }),
]
