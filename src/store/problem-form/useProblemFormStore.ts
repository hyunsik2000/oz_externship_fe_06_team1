import { create } from 'zustand'
import type { QuestionType, Question } from '@/types/question'

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      case 'multiple_choice': {
        const targetOptions = options ?? ['', '']
        const answersArray = Array.isArray(correct_answer)
          ? correct_answer
          : [correct_answer]

        // 텍스트 정답을 기반으로 해당 옵션의 인덱스들을 찾아냄
        const targetAnswer = answersArray
          .map((answer) => targetOptions.indexOf(String(answer)))
          .filter((idx) => idx !== -1)

        set({
          options: targetOptions,
          correctAnswers: targetAnswer,
        })
        break
      }

      case 'ox':
        // ox 형
        set({
          correctAnswers:
            correct_answer === 'O' ||
            (Array.isArray(correct_answer) && correct_answer[0] === 'O')
              ? 'O'
              : 'X',
        })
        break

      case 'ordering': {
        const targetOptions = options ?? ['', '']
        const answersArray = correct_answer as string[]

        // 각 옵션이 정답 배열(answersArray)의 몇 번째 순서(Rank)인지를 찾아 배열 생성
        const ranks = targetOptions.map((opt) => {
          const rank = answersArray.indexOf(String(opt))
          return rank !== -1 ? rank : 0
        })

        set({
          options: targetOptions,
          correctAnswers: ranks,
        })
        break
      }

      case 'short_answer':
        // 주관식 단답형
        set({
          correctAnswers: (correct_answer as string) ?? '',
        })
        break

      case 'fill_blank':
        // 빈칸
        set({
          options: options ?? ['', ''],
          correctAnswers: correct_answer,
          blankCount: Array.isArray(correct_answer)
            ? correct_answer.length
            : [String(correct_answer)].length,
        })
        break
    }
  },
}))
