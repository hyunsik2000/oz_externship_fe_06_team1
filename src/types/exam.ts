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
  submit_count: number
  avg_score: number
  status: 'activated' | 'deactivated'
  exam: {
    id: number
    title: string
    thumbnail_img_url: string
  }
  subject: {
    id: number
    name: string
  }
  cohort: {
    id: number
    number: number
    display: string
  }
  created_at: string
}

export interface PaginatedDeploymentResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
