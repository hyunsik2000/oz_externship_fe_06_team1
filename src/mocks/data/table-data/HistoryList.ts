import type { HistoryItem } from '@/types/history'

const MOCK_HISTORY_ITEM: HistoryItem[] = [
  {
    exam_id: 1,
    history_id: 1,
    exam_title: 'React & Redux 데일리 쪽지시험',
    subject_name: 'React & Redux',
    nickname: '김코딩',
    course_name: '웹 개발 초격차 프론트엔드 부트캠프',
    cohort_number: 8,
    cheating_count: 1,
    score: 100,
    started_at: '2025.02.01 11:22:28',
    finished_at: '2025.02.01 11:22:28',
  },
]

export const MOCK_HISTORY_LIST_RESPONSE = {
  page: 1,
  size: 10,
  total_count: 10,
  submissions: MOCK_HISTORY_ITEM,
}
