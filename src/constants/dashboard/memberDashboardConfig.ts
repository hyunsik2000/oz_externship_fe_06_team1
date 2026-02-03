export const MEMBER_VIEWS = {
  SUBSCRIBER: 'subscribers',
  WITHDRAWAL: 'withdrawals',
  WITHDRAWAL_REASON: 'withdrawal_reason',
  WITHDRAWAL_DETAIL: 'withdrawal_detail',
  CONVERSION: 'conversion',
} as const

export type MemberViewType = (typeof MEMBER_VIEWS)[keyof typeof MEMBER_VIEWS]

export const MEMBER_VIEW_METADATA = {
  [MEMBER_VIEWS.SUBSCRIBER]: {
    label: '가입자 현황 그래프',
    description: '가입자 현황 그래프 (그래프에는 가입자 수가 조회됩니다.)',
    chartTitle: '가입자 수 현황',
    color: '#e1f2e3',
    hoverColor: '#5eb669',
  },
  [MEMBER_VIEWS.WITHDRAWAL]: {
    label: '탈퇴자 현황 그래프',
    description: '탈퇴자 현황 그래프 (그래프에는 탈퇴자 수가 조회됩니다.)',
    chartTitle: '탈퇴자 수 현황',
    color: '#f9e2e2',
    hoverColor: '#cc0a0a',
  },
  [MEMBER_VIEWS.WITHDRAWAL_REASON]: {
    label: '회원 탈퇴 사유 그래프',
    description:
      '회원 탈퇴 사유 그래프 (그래프에는 탈퇴한 유저의 탈퇴 사유의 비율이 조회됩니다.)',
    chartTitle: '',
    color: '',
    hoverColor: '',
  },
  [MEMBER_VIEWS.WITHDRAWAL_DETAIL]: {
    label: '회원 탈퇴 사유 상세 그래프',
    description:
      '탈퇴 사유 현황 그래프 (그래프에는 최근 12개월 내 선택한 사유로 탈퇴한 유저수 가 조회됩니다.)',
    chartTitle: '회원 탈퇴 사유 상세 현황',
    color: '',
    hoverColor: '',
  },
  [MEMBER_VIEWS.CONVERSION]: {
    label: '수강생 전환 추이 그래프',
    description:
      '수강생 전환 추이 그래프 (그래프에는 일반회원에서 수강생으로 전환되는 회원 수의 추이가 조회됩니다.)',
    chartTitle: '수강생 전환수 현황',
    color: '#fdeece',
    hoverColor: '#f6a818',
  },
}
