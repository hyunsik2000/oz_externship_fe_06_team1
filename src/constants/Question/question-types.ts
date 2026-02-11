import type { QuestionType } from '@/types/question'

export const QUESTION_TYPES: { label: string; value: QuestionType }[] = [
  { label: '다지선다형', value: 'MULTI_SELECT' },
  { label: '참/거짓형 (O/X)', value: 'OX' },
  { label: '순서 정렬', value: 'ORDERING' },
  { label: '주관식 단답형', value: 'SHORT_ANSWER' },
  { label: '빈칸 채우기', value: 'FILL_IN_BLANK' },
]
