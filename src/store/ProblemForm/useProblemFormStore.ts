import { create } from 'zustand'
import type {
  QuestionType,
  Question,
  QuestionRequestBody,
} from '@/types/question'

interface ProblemFormState {
  // 모드 상태

  mode: 'create' | 'edit'
  // 폼 데이터 상태
  type: QuestionType
  question: string
  prompt: string
  options: string[]
  blankCount: number
  correctAnswers: any
  point: number
  explanation: string

  // 액션
  // 상태 변경 함수들 (Setter)
  setMode: (mode: 'create' | 'edit') => void
  setType: (type: QuestionType) => void
  setQuestion: (question: string) => void
  setPrompt: (prompt: string) => void
  setOptions: (options: string[]) => void
  setBlankCount: (blankCount: number) => void
  setCorrectAnswers: (correctAnswers: any) => void
  setPoint: (point: number) => void
  setExplanation: (explanation: string) => void

  // 상태 초기화 함수
  reset: () => void
  initializeForEdit: (question: Question) => void

  // 백엔드 전송용 바디 생성 함수
  toRequestBody: () => QuestionRequestBody
}

const initialState = {
  mode: 'create' as const,
  type: 'multiple_choice' as QuestionType,
  question: '',
  prompt: '',
  options: ['', ''],
  blankCount: 0,
  correctAnswers: '',
  point: 5,
  explanation: '',
}

export const useProblemFormStore = create<ProblemFormState>((set, get) => ({
  ...initialState,

  // 문제 입력에서 사용되는 Setter 함수들
  setMode: (mode) => set({ mode }),
  setType: (type) => set({ type }),
  setQuestion: (question) => set({ question }),
  setPrompt: (prompt) => set({ prompt }),
  setOptions: (options) => set({ options }),
  setBlankCount: (blankCount) => set({ blankCount }),
  setCorrectAnswers: (correctAnswers) => set({ correctAnswers }),
  setPoint: (point) => set({ point }),
  setExplanation: (explanation) => set({ explanation }),

  // create 모드 - 모든 값 초기화할때 reset 함수 사용
  reset: () => set(initialState),

  // edit 모드 - 기존 문제 데이터를 폼 초기값에 적용시키기
  initializeForEdit: (data: Question) => {
    // 1. 공통 데이터 세팅
    set({
      mode: 'edit',
      type: data.type,
      question: data.question || '',
      prompt: data.prompt || '',
      blankCount: data.blank_count || 0,
      point: data.point || 5,
      explanation: data.explanation || '',
    })

    // 2. 타입별 데이터 파싱 및 세팅 -> 경우 계산하고 정답의 타입이 any이기 때문에 타입 가드 사용
    if (data.type === 'multiple_choice') {
      // 다지선다형
      // 객관식: "0,2" -> [0, 2]
      const answerArray =
        typeof data.correct_answer === 'string'
          ? data.correct_answer.split(',').map(Number)
          : Array.isArray(data.correct_answer)
            ? data.correct_answer.map(Number)
            : [0]

      set({
        options: data.options || ['', ''],
        correctAnswers: answerArray,
      })
    } else if (data.type === 'ox') {
      // ox 형
      // OX: "O" -> [0], "X" -> [1] 로 판단
      const isO =
        data.correct_answer === 'O' ||
        (Array.isArray(data.correct_answer) && data.correct_answer[0] === 'O')
      set({
        correctAnswers: isO ? 'O' : 'X',
      })
    } else if (data.type === 'ordering') {
      // 순서 정렬
      // 순서정렬: "2,0,1" -> [2, 0, 1]
      const orderArray =
        typeof data.correct_answer === 'string'
          ? data.correct_answer.split(',').map(Number)
          : Array.isArray(data.correct_answer)
            ? data.correct_answer.map(Number)
            : []

      set({
        options: data.options || ['', ''],
        correctAnswers: orderArray,
      })
    } else if (data.type === 'short_answer') {
      // 주관식 단답형
      // 단답형: 그대로 사용
      set({
        correctAnswers: Array.isArray(data.correct_answer)
          ? data.correct_answer[0]
          : String(data.correct_answer),
      })
    } else if (data.type === 'fill_blank') {
      // 빈칸
      // 빈칸: 배열 그대로 사용
      const answerArray = Array.isArray(data.correct_answer)
        ? data.correct_answer
        : [String(data.correct_answer)]

      set({
        correctAnswers: answerArray,
      })
    }
  },

  // [변환] 백엔드 전송용 바디 생성
  toRequestBody: () => {
    const state = get()
    let submitCorrectAnswer: string | string[] = '' // 정답 초기화 변수
    let submitOptions: string[] | null = state.options // 보기 초기화 변수
    let submitBlankCount = 0 // 빈칸 초기화 변수

    switch (state.type) {
      case 'multiple_choice':
        // [1, 3] -> "1,3" (오름차순 정렬) 나중에 받을 때 편하게
        submitCorrectAnswer = [...state.correctAnswers]
          .sort((a, b) => a - b)
          .join(',')
        break

      case 'ox':
        // [0] -> "O", [1] -> "X" 변환해서 전달
        submitCorrectAnswer = state.correctAnswers[0] === 0 ? 'O' : 'X'
        submitOptions = null
        break

      case 'ordering':
        submitCorrectAnswer = state.correctAnswers.join(',')
        break

      case 'short_answer':
        // "정답" -> "정답"
        submitCorrectAnswer = state.correctAnswers
        submitOptions = null
        break

      case 'fill_blank':
        // ["답1", "답2"] -> ["답1", "답2"]
        submitCorrectAnswer = state.correctAnswers
        submitOptions = null
        submitBlankCount = state.correctAnswers.length
        break
    }

    // 다지선다랑 순서 정렬 빼고는 보기가 필요없음
    if (state.type !== 'multiple_choice' && state.type !== 'ordering') {
      submitOptions = null
    }

    // 최종 requestBody 반환
    return {
      type: state.type,
      question: state.question,
      prompt: state.prompt,
      options: submitOptions,
      blank_count: submitBlankCount,
      correct_answer: submitCorrectAnswer,
      point: state.point,
      explanation: state.explanation,
    }
  },
}))
