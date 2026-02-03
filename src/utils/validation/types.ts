import type { QuestionType } from '@/types/question'

// 유효성 검사 할 데이터
export interface ProblemValidationData {
  type: QuestionType
  question: string
  prompt: string
  options: string[]
  correctAnswers: any
  point: number
  explanation: string

  totalScore?: number
  questionCount?: number
  mode?: 'create' | 'edit'
  targetPoint?: number // 원래 문제의 배점
}

// 유효성 검사 결과
export interface ValidationResult {
  isValid: boolean
  title?: string
  description?: string
  errors: string[]
  firstInvalidField?: string
}

// 개별 에러 타입
export type ErrorDetail = {
  field: string
  message: string
  title?: string
}

// 검증 함수 타입
export type ValidationRule = (data: ProblemValidationData) => ErrorDetail[]
