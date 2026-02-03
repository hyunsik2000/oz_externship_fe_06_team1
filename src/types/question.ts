export type QuestionType =
  | 'multiple_choice'
  | 'ox'
  | 'ordering'
  | 'short_answer'
  | 'fill_blank'

export interface Question {
  id: number
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
