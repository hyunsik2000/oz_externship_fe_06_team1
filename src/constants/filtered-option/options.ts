import type { DropdownOption } from '@/types'

export const COURSE_OPTIONS: DropdownOption[] = [
  {
    label: '웹 개발 초격차 프론트엔드 부트캠프',
    value: 'web-development-frontend',
  },
  { label: '웹 개발 초격차 백엔드 부트캠프', value: 'web-development-backend' },
  {
    label: '웹 개발 초격차 풀스택 부트캠프',
    value: 'web-development-fullstack',
  },
  { label: 'AI 헬스케어 부트캠프', value: 'ai-healthcare-bootcamp' },
  { label: '게임 개발 부트캠프', value: 'game-development-bootcamp' },
]

export const COHORT_OPTIONS: DropdownOption[] = [
  { label: '1기', value: '1' },
  { label: '2기', value: '2' },
  { label: '3기', value: '3' },
  { label: '4기', value: '4' },
  { label: '5기', value: '5' },
]

export const SUBJECT_OPTIONS: DropdownOption[] = [
  { label: 'HTML', value: '1' },
  { label: 'JavaScript', value: '2' },
  { label: 'React', value: '3' },
  { label: 'Django', value: '4' },
  { label: 'Flask', value: '5' },
  { label: 'AWS', value: '6' },
  { label: 'Github', value: '7' },
]
