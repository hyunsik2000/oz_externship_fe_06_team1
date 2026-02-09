import type { ExamItem } from '@/types/exam'

const generateExams = (count: number): ExamItem[] => {
  const subjects = [
    'React & Redux',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Next.js',
  ]
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `${subjects[i % subjects.length]} 데일리 쪽지시험 ${i + 1}`,
    subject_name: subjects[i % subjects.length],
    question_count: (i % 20) + 1, // 1~20문제 사이로 조정
    submit_count: 5 + (i % 15),
    created_at: `2025-02-${String((i % 28) + 1).padStart(2, '0')}T11:22:28.000Z`,
    updated_at:
      i % 2 === 0
        ? `2025-02-${String((i % 28) + 1).padStart(2, '0')}T14:30:15.000Z`
        : '-',
    detail_url: `/admin/exams/${i + 1}`,
  }))
}

export const MOCK_EXAM_ITEMS = generateExams(52)

export const getMockExamListResponse = () => ({
  page: 1,
  size: 10,
  total_count: MOCK_EXAM_ITEMS.length,
  exams: MOCK_EXAM_ITEMS,
})
