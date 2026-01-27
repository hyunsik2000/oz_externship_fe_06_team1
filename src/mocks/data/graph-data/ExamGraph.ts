import type { ScatterData } from '@/types/graph'

export const MOCK_CAMP_OPTIONS = [
  { value: 'fe', label: '웹 개발 초격차 프론트엔드 부트캠프' },
]

export const MOCK_TERM_OPTIONS = [
  { value: '8', label: '8기' },
  { value: '13', label: '13기' },
  { value: '15', label: '15기' },
]

export const MOCK_SUBJECT_OPTIONS = [
  { value: 'html', label: 'HTML/CSS' },
  { value: 'js', label: 'JavaScript' },
  { value: 'gh', label: 'Git&GitHub' },
  { value: 'react', label: 'React' },
  { value: 'node', label: 'Node.js' },
  { value: 'db', label: 'Database' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'aws', label: 'AWS' },
  { value: 'rn', label: 'React-Native' },
]

export const MOCK_STUDENTS_BY_TERM: Record<
  string,
  { value: string; label: string }[]
> = {
  '8': [{ value: 'ancoding', label: '안코딩' }],
  '13': [{ value: 'younjs', label: '윤자스' }],
  '15': [
    { value: 'ryuact', label: '류액트' },
    { value: 'kwonnode', label: '권노드' },
  ],
}

export const MOCK_STUDENT_SCORES_DATA: Record<
  string,
  { subject: string; score: number }[]
> = {
  ancoding: [
    { subject: 'HTML/CSS', score: 85 },
    { subject: 'JavaScript', score: 65 },
    { subject: 'Git&Github', score: 78 },
    { subject: 'React', score: 28 },
    { subject: 'Node.js', score: 28 },
    { subject: 'Database', score: 48 },
    { subject: 'TypeScript', score: 20 },
    { subject: 'AWS', score: 40 },
    { subject: 'React-Native', score: 48 },
  ],
  younjs: [
    { subject: 'HTML/CSS', score: 70 },
    { subject: 'JavaScript', score: 95 },
    { subject: 'Git&Github', score: 88 },
    { subject: 'React', score: 90 },
    { subject: 'Node.js', score: 40 },
    { subject: 'Database', score: 50 },
    { subject: 'TypeScript', score: 85 },
    { subject: 'AWS', score: 60 },
    { subject: 'React-Native', score: 15 },
  ],
  ryuact: [
    { subject: 'HTML/CSS', score: 60 },
    { subject: 'JavaScript', score: 80 },
    { subject: 'Git&Github', score: 70 },
    { subject: 'React', score: 100 },
    { subject: 'Node.js', score: 40 },
    { subject: 'Database', score: 40 },
    { subject: 'TypeScript', score: 90 },
    { subject: 'AWS', score: 50 },
    { subject: 'React-Native', score: 95 },
  ],
  kwonnode: [
    { subject: 'HTML/CSS', score: 50 },
    { subject: 'JavaScript', score: 75 },
    { subject: 'Git&Github', score: 60 },
    { subject: 'React', score: 40 },
    { subject: 'Node.js', score: 95 },
    { subject: 'Database', score: 90 },
    { subject: 'TypeScript', score: 60 },
    { subject: 'AWS', score: 85 },
    { subject: 'React-Native', score: 30 },
  ],
}

export const MOCK_TERM_AVG_DATA = [
  { name: '1기', score: 40 },
  { name: '2기', score: 12 },
  { name: '3기', score: 20 },
  { name: '4기', score: 70 },
  { name: '5기', score: 8 },
  { name: '6기', score: 32 },
  { name: '7기', score: 12 },
  { name: '8기', score: 20 },
  { name: '9기', score: 45 },
  { name: '10기', score: 60 },
  { name: '11기', score: 28 },
  { name: '12기', score: 10 },
  { name: '13기', score: 82 },
  { name: '14기', score: 42 },
  { name: '15기', score: 68 },
]

export const MOCK_SCATTER_DATA_BY_SUBJECT: Record<string, ScatterData> = {
  html: {
    female: [
      { time: 1.5, score: 95 },
      { time: 2.8, score: 98 },
      { time: 3.1, score: 100 },
      { time: 2.0, score: 88 },
      { time: 3.5, score: 92 },
      { time: 4.2, score: 96 },
    ],
    male: [
      { time: 1.2, score: 85 },
      { time: 2.1, score: 90 },
      { time: 3.5, score: 95 },
      { time: 1.8, score: 70 },
      { time: 2.5, score: 75 },
      { time: 3.2, score: 80 },
    ],
  },
  js: {
    female: [
      { time: 3.2, score: 75 },
      { time: 5.1, score: 88 },
      { time: 6.8, score: 92 },
      { time: 4.0, score: 65 },
      { time: 5.8, score: 82 },
      { time: 8.5, score: 95 },
    ],
    male: [
      { time: 2.5, score: 60 },
      { time: 4.1, score: 55 },
      { time: 6.5, score: 80 },
      { time: 3.8, score: 40 },
      { time: 5.5, score: 62 },
      { time: 7.2, score: 70 },
    ],
  },
  gh: {
    female: [
      { time: 0.6, score: 100 },
      { time: 1.0, score: 92 },
      { time: 1.4, score: 87 },
      { time: 0.9, score: 96 },
      { time: 1.3, score: 89 },
    ],
    male: [
      { time: 0.5, score: 96 },
      { time: 1.1, score: 90 },
      { time: 1.5, score: 85 },
      { time: 0.8, score: 95 },
      { time: 1.2, score: 88 },
    ],
  },
  react: {
    female: [
      { time: 6.2, score: 65 },
      { time: 8.1, score: 78 },
      { time: 10.5, score: 95 },
      { time: 7.5, score: 70 },
      { time: 9.2, score: 82 },
      { time: 11.5, score: 98 },
    ],
    male: [
      { time: 5.2, score: 45 },
      { time: 7.1, score: 60 },
      { time: 9.5, score: 85 },
      { time: 6.8, score: 50 },
      { time: 8.5, score: 72 },
      { time: 10.2, score: 90 },
    ],
  },
  node: {
    female: [
      { time: 5.1, score: 72 },
      { time: 7.5, score: 80 },
      { time: 9.2, score: 85 },
      { time: 6.0, score: 68 },
      { time: 8.2, score: 78 },
    ],
    male: [
      { time: 4.5, score: 55 },
      { time: 6.2, score: 65 },
      { time: 8.8, score: 70 },
      { time: 5.5, score: 48 },
      { time: 7.8, score: 60 },
    ],
  },
  db: {
    female: [
      { time: 3.5, score: 88 },
      { time: 4.8, score: 82 },
      { time: 6.2, score: 95 },
      { time: 4.1, score: 78 },
      { time: 5.5, score: 92 },
    ],
    male: [
      { time: 3.2, score: 80 },
      { time: 4.5, score: 75 },
      { time: 5.8, score: 90 },
      { time: 3.8, score: 70 },
      { time: 5.2, score: 85 },
    ],
  },
  ts: {
    female: [
      { time: 4.2, score: 65 },
      { time: 6.1, score: 78 },
      { time: 8.5, score: 92 },
      { time: 5.5, score: 70 },
      { time: 7.2, score: 85 },
    ],
    male: [
      { time: 3.5, score: 40 },
      { time: 5.2, score: 55 },
      { time: 7.8, score: 75 },
      { time: 4.8, score: 42 },
      { time: 6.5, score: 60 },
    ],
  },
  aws: {
    female: [
      { time: 7.2, score: 55 },
      { time: 9.1, score: 68 },
      { time: 12.5, score: 82 },
      { time: 8.5, score: 60 },
      { time: 10.2, score: 75 },
    ],
    male: [
      { time: 6.5, score: 30 },
      { time: 8.2, score: 45 },
      { time: 11.8, score: 60 },
      { time: 7.8, score: 35 },
      { time: 9.5, score: 50 },
    ],
  },
  rn: {
    female: [
      { time: 6.2, score: 72 },
      { time: 8.1, score: 80 },
      { time: 10.5, score: 88 },
      { time: 7.5, score: 75 },
      { time: 9.2, score: 82 },
    ],
    male: [
      { time: 5.5, score: 50 },
      { time: 7.2, score: 65 },
      { time: 9.8, score: 70 },
      { time: 6.8, score: 55 },
      { time: 8.5, score: 62 },
    ],
  },
}
