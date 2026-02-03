export const DASHBOARD_VIEWS = {
  SCORE: 'score',
  AVG: 'avg',
} as const

export type ViewType = (typeof DASHBOARD_VIEWS)[keyof typeof DASHBOARD_VIEWS]

export const VIEW_METADATA = {
  [DASHBOARD_VIEWS.SCORE]: {
    label: '수강생 과목 별 점수 그래프',
    description:
      '수강생 과목 별 점수 막대 그래프 (그래프에는 과목 별 점수 가 조회됩니다.)',
    chartTitle: '수강생 과목 별 점수 그래프',
  },
  [DASHBOARD_VIEWS.AVG]: {
    label: '쪽지 시험 기수 별 평균 그래프',
    description:
      '쪽지 시험 기수 별 평균 그래프 (그래프에는 최근 12기수의 쪽지시험 평균 점수가 조회됩니다.)',
    chartTitle: '쪽지 시험 기수 별 평균 그래프',
  },
} as const
