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

interface BaseDeployment {
  id: number
  submit_count: number
  created_at: string
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
    course: {
      id: number
      name: string
      tag: string
    }
  }
}
export interface ExamDeploymentItemType extends BaseDeployment {
  status: 'activated' | 'deactivated'
  avg_score: number
}
export interface ExamDeploymentDetailType extends BaseDeployment {
  exam_access_url: string
  access_code: string
  not_submitted_count: number
  duration_time: number
  open_at: string
  close_at: string
}

export interface PaginatedDeploymentResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
