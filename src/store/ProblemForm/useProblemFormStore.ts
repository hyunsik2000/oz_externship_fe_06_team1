import { create } from 'zustand'
import type {
  QuestionType,
  Question,
  // QuestionRequestBody,
} from '@/types/question'

//  Constants
const DEFAULT_PROBLEM_POINT = 5
const DEFAULT_BLANK_COUNT = 0

//
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
  initializeForEdit: (data: Question) => void
}

const initialState = {
  mode: 'create' as const,
  type: 'multiple_choice' as QuestionType,
  question: '',
  prompt: '',
  options: ['', ''],
  blankCount: DEFAULT_BLANK_COUNT,
  correctAnswers: '',
  point: DEFAULT_PROBLEM_POINT,
  explanation: '',
}

//  Store
export const useProblemFormStore = create<ProblemFormState>((set) => ({
  ...initialState,

  // 문제 입력에서 사용되는 Setter 함수들
  setMode: (mode) => set({ mode }),
  setType: (type) =>
    set({
      type,
      options: ['', ''],
      correctAnswers: '',
      blankCount: DEFAULT_BLANK_COUNT,
    }),
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
    const {
      type,
      question,
      prompt,
      blank_count,
      point,
      explanation,
      options,
      correct_answer,
    } = data

    set({
      mode: 'edit',
      type: type,
      question: question ?? '',
      prompt: prompt ?? '',
      blankCount: blank_count ?? DEFAULT_BLANK_COUNT,
      point: point || DEFAULT_PROBLEM_POINT,
      explanation: explanation ?? '',
    })

    switch (type) {
      case 'multiple_choice':
        // 다지선다형
        // 객관식: "0,2" -> [0, 2]
        set({
          options: options ?? ['', ''],
          correctAnswers:
            typeof correct_answer === 'string'
              ? correct_answer.split(',')
              : Array.isArray(correct_answer)
                ? correct_answer
                : [0],
        })
        break

      case 'ox':
        // ox 형
        // OX: "O" -> [0], "X" -> [1] 로 판단
        set({
          correctAnswers:
            correct_answer === 'O' ||
            (Array.isArray(correct_answer) && correct_answer[0] === 'O')
              ? 'O'
              : 'X',
        })
        break

      case 'ordering':
        // 순서 정렬
        // 순서정렬: "2,0,1" -> [2, 0, 1]
        set({
          options: options ?? ['', ''],
          correctAnswers:
            typeof correct_answer === 'string'
              ? correct_answer.split(',').map(Number)
              : Array.isArray(correct_answer)
                ? correct_answer.map(Number)
                : [],
        })
        break

      case 'short_answer':
        // 주관식 단답형
        // 단답형: 그대로 사용
        set({
          correctAnswers: (correct_answer as string) ?? '',
        })
        break

      case 'fill_blank':
        // 빈칸
        // 빈칸: 배열 그대로 사용
        set({
          correctAnswers: correct_answer,
          blankCount: Array.isArray(correct_answer)
            ? correct_answer.length
            : [String(correct_answer)].length,
        })
        break
    }
  },

  // const NEEDS_OPTIONS: Record<QuestionType, boolean> = {
  //   multiple_choice: true,
  //   ordering: true,
  //   ox: false,
  //   short_answer: false,
  //   fill_blank: false,
  // }

  // const shouldSendOptions = (type: QuestionType) => NEEDS_OPTIONS[type]

  // // [변환] 백엔드 전송용 바디 생성
  // toRequestBody: () => {
  //   const state = get()
  //   let submitCorrectAnswer: string | string[] = '' // 정답 초기화 변수
  //   let submitBlankCount = 0 // 빈칸 초기화 변수

  //   switch (state.type) {
  //     case 'multiple_choice':
  //       // [1, 3] -> "1,3" (오름차순 정렬) 나중에 받을 때 편하게
  //       submitCorrectAnswer = [...state.correctAnswers]
  //         .sort((a, b) => a - b)
  //         .join(',')
  //       break

  //     case 'ox':
  //       // [0] -> "O", [1] -> "X" 변환해서 전달
  //       submitCorrectAnswer = state.correctAnswers[0] === 0 ? 'O' : 'X'
  //       break

  //     case 'ordering':
  //       submitCorrectAnswer = state.correctAnswers.join(',')
  //       break

  //     case 'short_answer':
  //       // "정답" -> "정답"
  //       submitCorrectAnswer = state.correctAnswers
  //       break

  //     case 'fill_blank':
  //       // ["답1", "답2"] -> ["답1", "답2"]
  //       submitCorrectAnswer = state.correctAnswers
  //       submitBlankCount = state.correctAnswers.length
  //       break
  //   }

  //   // 다지선다랑 순서 정렬 빼고는 보기가 필요없음
  //   const submitOptions = shouldSendOptions(state.type) ? state.options : null;

  //   // 최종 requestBody 반환
  //   return {
  //     type: state.type,
  //     question: state.question,
  //     prompt: state.prompt,
  //     options: submitOptions,
  //     blank_count: submitBlankCount,
  //     correct_answer: submitCorrectAnswer,
  //     point: state.point,
  //     explanation: state.explanation,
  //   }
  // },
}))
