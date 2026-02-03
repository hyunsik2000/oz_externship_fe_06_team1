import type { QuestionsList, Question } from '@/types/question'
import reactLogo from '@/assets/react.svg'

const BASE_QUESTION: Omit<Question, 'id'> = {
  type: 'multiple_choice',
  question:
    'TypeScript의 타입 호환성 규칙에 따라, 상위 타입-하위 타입 관계에서 보통 안전하게 허용되는 값 할당은 어떤 방식일까요?',
  prompt: '',
  point: 5,
  blank_count: 0,
  options: [
    '상위 타입 값을 하위 타입 변수에 할당',
    '하위 타입 값을 상위 타입 변수에 할당',
    '서로소 유니온 타입 값을 일반 유니온 타입 변수에 할당',
    'any 타입 값을 unknown 타입 변수에 할당',
  ],
  correct_answer: '하위 타입 값을 상위 타입 변수에 할당',
  explanation:
    '하위 타입 값을 상위 타입으로 취급하는 것을 업캐스팅이라고 하며, 이는 대부분의 경우 안전하게 허용됩니다. 반대인 다운캐스팅은 일반적으로 허용되지 않아요.',
}

// 같은 문제 20개 Test
const MOCK_QUESTIONS: Question[] = Array.from({ length: 20 }, (_, i) => ({
  ...BASE_QUESTION,
  id: 301 + i,
  question: BASE_QUESTION.question,
}))

export const MOCK_QUESTION_LIST_RESPONSE: QuestionsList = {
  id: 101,
  title: 'TypeScript 쪽지시험',
  subject: {
    id: 1,
    title: 'TypeScript',
  },
  questions: MOCK_QUESTIONS,
  thumbnail_img_url: reactLogo,
  created_at: '2025-02-01 13:20:33',
  updated_at: '2025-02-05 15:10:20',
}

export const MOCK_EMPTY_QUESTION_LIST_RESPONSE: QuestionsList = {
  id: 102,
  title: 'TypeScript 쪽지시험',
  subject: {
    id: 1,
    title: 'TypeScript',
  },
  questions: [],
  thumbnail_img_url: reactLogo,
  created_at: '2025-02-01 13:20:33',
  updated_at: '2025-02-05 15:10:20',
}
