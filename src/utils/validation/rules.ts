import type { QuestionType } from '@/types/question'
import type { ErrorDetail, ValidationRule } from './types'

// 에러 객체를 배열 형태로 반환
const createError = (
  field: string,
  title: string,
  message: string
): ErrorDetail[] => [{ field, title, message }]

// 필수 입력 처리 @param p1 조사 (을/를) @param p2 조사 (은/는)
const required = (
  field: string,
  target: string,
  p1: '을' | '를',
  p2: '은' | '는'
): ErrorDetail[] =>
  createError(
    field,
    `${target}${p1} 입력 해주세요`,
    `${target}${p2} 필수 입력 항목입니다.`
  )

// 정답 선택 처리
const requiredSelect = (field: string, target: string): ErrorDetail[] =>
  createError(
    field,
    `${target}을 선택 해주세요`,
    `${target}은 필수 입력 항목입니다.`
  )

// 공통 폼 검증
export const COMMON_RULES: ValidationRule = (data) => {
  if (!data.question.trim()) return required('question', '문제', '를', '는')
  if (!data.point || data.point === 0)
    return required('point', '배점', '을', '은')

  if (data.totalScore !== undefined && data.questionCount !== undefined) {
    const baseScore =
      data.mode === 'edit'
        ? data.totalScore - (data.targetPoint || 0)
        : data.totalScore

    if (baseScore + data.point > 100) {
      return createError(
        'point',
        '배점의 합계는 100점을 초과할 수 없습니다.',
        '배점의 합계가 100점이 초과하지 않도록 각문제의 배점을 조율해야 합니다'
      )
    }

    if (data.mode === 'create' && data.questionCount >= 20) {
      return createError(
        'question',
        '총 문제 수는 20문제를 초과할 수 없습니다.',
        '최대 추가 가능한 문제는 20개입니다.'
      )
    }
  }
  return []
}

// --- [유형별 개별 검증] ---
export const TYPE_RULES: Record<QuestionType, ValidationRule> = {
  multiple_choice: (data) => {
    const emptyIndex = data.options.findIndex((opt) => !opt.trim())
    if (emptyIndex !== -1) {
      return required(`options-${emptyIndex}`, `보기`, '를', '는')
    }
    if (
      !Array.isArray(data.correctAnswers) ||
      data.correctAnswers.length === 0
    ) {
      return requiredSelect('correctAnswers', '정답')
    }
    return []
  },

  ox: (data) => {
    return data.correctAnswers === 'O' || data.correctAnswers === 'X'
      ? []
      : requiredSelect('correctAnswers', '정답')
  },

  ordering: (data) => {
    if (data.options.length < 2) {
      return createError(
        'options',
        '보기를 입력 해주세요',
        '보기를 2개 이상 등록해주세요.'
      )
    }
    const emptyIndex = data.options.findIndex((opt) => !opt.trim())
    if (emptyIndex !== -1) {
      return required(`options-${emptyIndex}`, `보기`, '를', '는')
    }
    return []
  },

  short_answer: (data) => {
    const answer =
      typeof data.correctAnswers === 'string' ? data.correctAnswers.trim() : ''
    return !answer ? required('correctAnswers', '답안', '을', '은') : []
  },

  fill_blank: (data) => {
    if (!data.prompt.trim()) return required('prompt', '지문', '을', '은')
    if (
      !Array.isArray(data.correctAnswers) ||
      data.correctAnswers.length === 0
    ) {
      return required('correctAnswers', '답안', '을', '은')
    }
    const emptyIndex = data.correctAnswers.findIndex(
      (ans: string) => !ans.trim()
    )
    if (emptyIndex !== -1) {
      return createError(
        `correctAnswers-${emptyIndex}`,
        '답안을 입력 해주세요',
        '빈칸의 답안을 입력해주세요.'
      )
    }
    return []
  },
}
