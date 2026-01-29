import { API_PATHS } from '@/constants/api'
import { http, HttpResponse } from 'msw'
import {
  MOCK_STUDENT_SCORES_DATA,
  MOCK_TERM_AVG_DATA,
  MOCK_SCATTER_DATA_BY_SUBJECT,
  MOCK_STUDENTS_BY_TERM,
} from '@/mocks/data/graph-data/ExamGraph'

export const examGraphHandlers = [
  http.get(
    `*/${API_PATHS.GRAPH.STUDENT_SCORES(':studentId')}`,
    ({ params }) => {
      const { studentId } = params
      const data = MOCK_STUDENT_SCORES_DATA[studentId as string] || []
      return HttpResponse.json(data)
    }
  ),

  http.get(`*/${API_PATHS.GRAPH.TERM_AVERAGE(':courseId')}`, ({ params }) => {
    const { courseId } = params
    return HttpResponse.json(MOCK_TERM_AVG_DATA)
  }),

  http.get(
    `*/${API_PATHS.GRAPH.SUBJECT_SCATTER(':subjectId')}`,
    ({ params }) => {
      const { subjectId } = params
      const data = MOCK_SCATTER_DATA_BY_SUBJECT[subjectId as string] || []
      return HttpResponse.json(data)
    }
  ),

  http.get('*/api/metadata/students', ({ request }) => {
    const url = new URL(request.url)
    const term = url.searchParams.get('term') || '8'
    const students = MOCK_STUDENTS_BY_TERM[term] || []
    return HttpResponse.json(students)
  }),
]
