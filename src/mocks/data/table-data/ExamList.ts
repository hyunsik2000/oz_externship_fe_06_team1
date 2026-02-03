import type { ExamItem } from '@/types/exam'

const generateMockExams = (count: number): ExamItem[] => {
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
    question_count: 10 + (i % 20),
    submit_count: 5 + (i % 15),
    created_at: `2025.02.${(i % 28) + 1} 11:22:28`,
    updated_at: i % 2 === 0 ? `2025.02.${(i % 28) + 1} 14:30:15` : '-',
    detail_url: `/admin/exams/${i + 1}`,
  }))
}

const MOCK_EXAM_ITEMS = generateMockExams(52)

export const MOCK_EXAM_LIST_RESPONSE = {
  page: 1,
  size: 10,
  total_count: MOCK_EXAM_ITEMS.length,
  exams: MOCK_EXAM_ITEMS,
}
