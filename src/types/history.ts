export interface HistoryItem {
  exam_id: number
  history_id: number
  exam_title: string
  subject_name: string
  nickname: string
  course_name: string
  cohort_number: number
  cheating_count: number
  score: number
  started_at: string
  finished_at: string
}

export interface HistoryListResponse {
  page: number
  size: number
  total_count: number
  submissions: HistoryItem[]
}
