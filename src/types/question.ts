export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'ordering'
  | 'short_answer'
  | 'fill_in_the_blank'

export interface Subject {
  id: number
  title: string
}

export interface Question {
  id: number
  type: QuestionType
  question: string
  prompt: string
  point: number
  options?: string[]
  correct_answer: string | string[]
  explanation: string
}

export interface QuestionListResponse {
  id: number
  title: string
  subject: Subject
  questions: Question[]
  thumbnail_img_url: string
  created_at: string
  updated_at: string
}
