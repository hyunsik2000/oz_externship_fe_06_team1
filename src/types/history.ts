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

/** API 상세 응답 - exam/student/result 중첩 구조 */
export interface ExamSubmissionDetailApi {
  exam?: {
    exam_title?: string
    subject_name?: string
    duration_time?: number
    open_at?: string
    close_at?: string
  }
  student?: {
    nickname?: string
    name?: string
    course_name?: string
    cohort_number?: number
  }
  result?: {
    score?: number
    correct_answer_count?: number
    total_question_count?: number
    cheating_count?: number
    elapsed_time?: number
  }
  questions?: unknown[]
}

/** 상세 모달용 확장 - API 상세 응답 매핑 결과 */
export interface ExamSubmissionDetail extends HistoryItem {
  correct_answer_count?: number
  total_question_count?: number
  open_at?: string
  close_at?: string
  duration_time?: number
  elapsed_time?: number
}

export interface HistoryListResponse {
  count: number
  next: string | null
  previous: string | null
  results: HistoryItem[]
}
