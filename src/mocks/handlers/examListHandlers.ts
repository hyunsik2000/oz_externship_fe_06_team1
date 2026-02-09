import { http, HttpResponse } from 'msw'
import { MOCK_EXAM_ITEMS } from '@/mocks/data/table-data/ExamList'
import {
  MOCK_QUESTION_LIST_RESPONSE,
  generateMockQuestions,
} from '@/mocks/data/exam-data/QuestionList'
import { API_PATHS } from '@/constants/api'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const fullUrl = (path: string) => `${BASE_URL}${path}`

export const examListHandlers = [
  // 목록 조회
  // http.get(fullUrl(API_PATHS.EXAM.LIST), ({ request }) => {
  //   const url = new URL(request.url)
  //   const page = Number(url.searchParams.get('page') || '1')
  //   const size = Number(url.searchParams.get('size') || '10')

  //   const { total_count } = getMockExamListResponse()
  //   const start = (page - 1) * size
  //   const end = page * size
  //   const paginatedExams = MOCK_EXAM_ITEMS.slice(start, end)

  //   return HttpResponse.json({
  //     page,
  //     size,
  //     total_count,
  //     exams: paginatedExams,
  //   })
  // }),

  // 생성
  // http.post(fullUrl(API_PATHS.EXAM.LIST), async ({ request }) => {
  //   const body = (await request.json()) as any
  //   const newExam = {
  //     id: MOCK_EXAM_ITEMS.length + 1,
  //     ...body,
  //     question_count: 0,
  //     submit_count: 0,
  //     created_at: new Date().toISOString(),
  //     updated_at: '-',
  //     detail_url: `/admin/exams/${MOCK_EXAM_ITEMS.length + 1}`,
  //     thumbnail_img_url: 'https://placeholder.com/96',
  //   }
  //   MOCK_EXAM_ITEMS.unshift(newExam)
  //   return HttpResponse.json(newExam, { status: 201 })
  // }),

  // 상세 조회
  http.get(fullUrl(API_PATHS.EXAM.DETAIL(':id')), ({ params }) => {
    const { id } = params
    const exam = MOCK_EXAM_ITEMS.find((item) => item.id === Number(id))

    if (!exam) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json({
      ...MOCK_QUESTION_LIST_RESPONSE,
      id: exam.id,
      title: exam.title,
      subject: { id: 1, title: exam.subject_name },
      questions: generateMockQuestions(exam.question_count), // 문제 수 동적 생성
      created_at: exam.created_at,
      updated_at: exam.updated_at,
    })
  }),

  // // 수정
  // http.put(fullUrl(API_PATHS.EXAM.DETAIL(':id')), async ({ params, request }) => {
  //   const { id } = params
  //   const body = (await request.json()) as any
  //   const index = MOCK_EXAM_ITEMS.findIndex((item) => item.id === Number(id))

  //   if (index === -1) {
  //     return new HttpResponse(null, { status: 404 })
  //   }

  //   MOCK_EXAM_ITEMS[index] = {
  //     ...MOCK_EXAM_ITEMS[index],
  //     ...body,
  //     updated_at: new Date().toISOString(),
  //   }

  //   return HttpResponse.json(MOCK_EXAM_ITEMS[index])
  // }),

  // // 삭제
  // http.delete(fullUrl(API_PATHS.EXAM.DETAIL(':id')), ({ params }) => {
  //   const { id } = params
  //   const index = MOCK_EXAM_ITEMS.findIndex((item) => item.id === Number(id))

  //   if (index === -1) {
  //     return new HttpResponse(null, { status: 404 })
  //   }

  //   const deletedItem = MOCK_EXAM_ITEMS[index]
  //   MOCK_EXAM_ITEMS.splice(index, 1)

  //   return HttpResponse.json(deletedItem)
  // }),
]
