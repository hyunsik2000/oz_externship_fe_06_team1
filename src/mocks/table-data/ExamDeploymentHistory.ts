export type ExamDeploymentRow = {
  id: number
  title: string
  subject: string
  course: string
  count: number
  avg: number
  createdAt: string
  active: boolean
}

export const examDeploymentHistoryMock: ExamDeploymentRow[] =
  Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `쪽지시험 ${i + 1}`,
    subject: 'React',
    course: '웹 개발 초격차 프론트엔드 부트캠프 8기',
    count: 20,
    avg: 80,
    createdAt: '2025.02.01 11:22:28',
    active: i % 2 === 0,
  }))
