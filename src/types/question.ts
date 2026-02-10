export type QuestionType =
  | 'SINGLE_CHOICE'
  | 'MULTI_SELECT'
  | 'OX'
  | 'ORDERING'
  | 'SHORT_ANSWER'
  | 'FILL_IN_BLANK'

export interface Question {
  question_id: number
  type: QuestionType
  question: string
  prompt: string
  options: string[] | null
  blank_count: number
  correct_answer: string | string[]
  point: number
  explanation: string
}

export interface Subject {
  id: number
  title: string
}

export interface QuestionsList {
  id: number
  title: string
  subject: Subject
  questions: Question[]
  thumbnail_img_url: string
  created_at: string
  updated_at: string
}
