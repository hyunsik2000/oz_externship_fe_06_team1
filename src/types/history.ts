export interface HistoryItem {
  submission_id: number
  nickname: string
  name: string
  course_name: string
  cohort_number: number
  exam_title: string
  subject_name: string
  score: number
  cheating_count: number
  started_at: string
  finished_at: string
}

export interface HistoryListResponse {
  count: number
  next: string | null
  previous: string | null
  results: HistoryItem[]
}
