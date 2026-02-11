export interface ExamItem {
  id: number
  title: string
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

export interface ExamDeploymentItemType {
  id: number
  title: string
  subject_name: string
  course_name: string
  cohort: number
  applicant_count: number
  average_score: number
  created_at: string
  is_active: boolean
}

export interface PaginatedDeploymentResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
