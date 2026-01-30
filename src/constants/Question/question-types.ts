import type { QuestionType } from '@/types/question'

export const QUESTION_TYPES: { label: string; value: QuestionType }[] = [
  { label: '다지선다형', value: 'multiple_choice' },
  { label: '참/거짓형 (O/X)', value: 'ox' },
  { label: '순서 정렬', value: 'ordering' },
  { label: '주관식 단답형', value: 'short_answer' },
  { label: '빈칸 채우기', value: 'fill_blank' },
]
