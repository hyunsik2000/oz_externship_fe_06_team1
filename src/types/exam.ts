export interface ExamItem {
  exam_id: number
  exam_title: string
  subject_name: string
  question_count: number
  submit_count: number
  created_at: string
  updated_at: string
  detail_url: string
}

export interface ExamListResponse {
  page: number
  size: number
  total_count: number
  exams: ExamItem[]
}
