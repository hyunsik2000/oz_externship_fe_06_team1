import type { MemberViewType } from '@/constants/dashboard/memberDashboardConfig'

export interface MemberStatData {
  label: string
  value: number
  name?: string
  fill?: string
}

export const MOCK_WITHDRAWAL_REASONS = [
  { name: '다른 부트캠프를 이용하게 되었어요.', value: 24, fill: '#b69cf1' },
  { name: '이용 빈도가 낮아요.', value: 56, fill: '#986be9' },
  { name: '원하는 콘텐츠가 부족해요.', value: 11, fill: '#7c35d9' },
  { name: '기타 (직접 입력)', value: 5, fill: '#522193' },
  { name: '개인정보가 걱정돼요.', value: 4, fill: '#d7cbf7' },
]

export const MOCK_WITHDRAWAL_DETAIL_BY_REASON: Record<
  string,
  MemberStatData[]
> = {
  '다른 부트캠프를 이용하게 되었어요.': [
    { label: '2025-02', value: 100 },
    { label: '2025-03', value: 200 },
    { label: '2025-04', value: 150 },
    { label: '2025-05', value: 300 },
    { label: '2025-06', value: 250 },
    { label: '2025-07', value: 400 },
    { label: '2025-08', value: 120 },
    { label: '2025-09', value: 350 },
    { label: '2025-10', value: 200 },
    { label: '2025-11', value: 450 },
    { label: '2025-12', value: 50 },
    { label: '2026-01', value: 300 },
  ],
  '이용 빈도가 낮아요.': [
    { label: '2025-02', value: 150 },
    { label: '2025-03', value: 220 },
    { label: '2025-04', value: 250 },
    { label: '2025-05', value: 80 },
    { label: '2025-06', value: 320 },
    { label: '2025-07', value: 150 },
    { label: '2025-08', value: 210 },
    { label: '2025-09', value: 450 },
    { label: '2025-10', value: 220 },
    { label: '2025-11', value: 280 },
    { label: '2025-12', value: 30 },
    { label: '2026-01', value: 380 },
  ],
  '원하는 콘텐츠가 부족해요.': [
    { label: '2025-02', value: 50 },
    { label: '2025-03', value: 80 },
    { label: '2025-04', value: 400 },
    { label: '2025-05', value: 150 },
    { label: '2025-06', value: 90 },
    { label: '2025-07', value: 220 },
    { label: '2025-08', value: 310 },
    { label: '2025-09', value: 120 },
    { label: '2025-10', value: 450 },
    { label: '2025-11', value: 180 },
    { label: '2025-12', value: 100 },
    { label: '2026-01', value: 250 },
  ],
  '기타 (직접 입력)': [
    { label: '2025-02', value: 30 },
    { label: '2025-03', value: 40 },
    { label: '2025-04', value: 50 },
    { label: '2025-05', value: 20 },
    { label: '2025-06', value: 60 },
    { label: '2025-07', value: 30 },
    { label: '2025-08', value: 80 },
    { label: '2025-09', value: 40 },
    { label: '2025-10', value: 90 },
    { label: '2025-11', value: 30 },
    { label: '2025-12', value: 10 },
    { label: '2026-01', value: 50 },
  ],
  '개인정보가 걱정돼요.': [
    { label: '2025-02', value: 20 },
    { label: '2025-03', value: 15 },
    { label: '2025-04', value: 30 },
    { label: '2025-05', value: 10 },
    { label: '2025-06', value: 25 },
    { label: '2025-07', value: 20 },
    { label: '2025-08', value: 35 },
    { label: '2025-09', value: 15 },
    { label: '2025-10', value: 40 },
    { label: '2025-11', value: 10 },
    { label: '2025-12', value: 5 },
    { label: '2026-01', value: 30 },
  ],
}

export const MOCK_MONTHLY_MEMBER_DATA: Record<
  MemberViewType,
  Record<string, MemberStatData[]>
> = {
  subscribers: {
    '2023': [
      { label: '2023-01', value: 400 },
      { label: '2023-02', value: 300 },
      { label: '2023-03', value: 450 },
      { label: '2023-04', value: 90 },
      { label: '2023-05', value: 780 },
      { label: '2024-06', value: 380 },
      { label: '2024-07', value: 190 },
      { label: '2024-08', value: 470 },
      { label: '2024-09', value: 400 },
      { label: '2024-10', value: 900 },
      { label: '2024-11', value: 410 },
      { label: '2024-12', value: 170 },
    ],
    '2024': [
      { label: '2024-01', value: 400 },
      { label: '2024-02', value: 300 },
      { label: '2024-03', value: 450 },
      { label: '2024-04', value: 90 },
      { label: '2024-05', value: 780 },
      { label: '2024-06', value: 380 },
      { label: '2024-07', value: 190 },
      { label: '2024-08', value: 470 },
      { label: '2024-09', value: 400 },
      { label: '2024-10', value: 900 },
      { label: '2024-11', value: 410 },
      { label: '2024-12', value: 170 },
    ],
    '2025': [
      { label: '2025-01', value: 860 },
      { label: '2025-02', value: 480 },
      { label: '2025-03', value: 510 },
      { label: '2025-04', value: 280 },
      { label: '2025-05', value: 280 },
      { label: '2025-06', value: 480 },
      { label: '2025-07', value: 200 },
      { label: '2025-08', value: 410 },
      { label: '2025-09', value: 480 },
      { label: '2025-10', value: 960 },
      { label: '2025-11', value: 480 },
      { label: '2025-12', value: 50 },
    ],
  },
  withdrawals: {
    '2024': [
      { label: '2024-01', value: 400 },
      { label: '2024-02', value: 300 },
      { label: '2024-03', value: 450 },
      { label: '2024-04', value: 90 },
      { label: '2024-05', value: 780 },
      { label: '2024-06', value: 380 },
      { label: '2024-07', value: 190 },
      { label: '2024-08', value: 470 },
      { label: '2024-09', value: 400 },
      { label: '2024-10', value: 900 },
      { label: '2024-11', value: 410 },
      { label: '2024-12', value: 170 },
    ],
    '2025': [
      { label: '2025-01', value: 860 },
      { label: '2025-02', value: 480 },
      { label: '2025-03', value: 510 },
      { label: '2025-04', value: 280 },
      { label: '2025-05', value: 280 },
      { label: '2025-06', value: 480 },
      { label: '2025-07', value: 200 },
      { label: '2025-08', value: 410 },
      { label: '2025-09', value: 480 },
      { label: '2025-10', value: 960 },
      { label: '2025-11', value: 480 },
      { label: '2025-12', value: 50 },
    ],
  },
  conversion: {
    '2024': [
      { label: '2024-01', value: 400 },
      { label: '2024-02', value: 300 },
      { label: '2024-03', value: 450 },
      { label: '2024-04', value: 90 },
      { label: '2024-05', value: 780 },
      { label: '2024-06', value: 380 },
      { label: '2024-07', value: 190 },
      { label: '2024-08', value: 470 },
      { label: '2024-09', value: 400 },
      { label: '2024-10', value: 900 },
      { label: '2024-11', value: 410 },
      { label: '2024-12', value: 170 },
    ],
    '2025': [
      { label: '2025-01', value: 860 },
      { label: '2025-02', value: 480 },
      { label: '2025-03', value: 510 },
      { label: '2025-04', value: 280 },
      { label: '2025-05', value: 280 },
      { label: '2025-06', value: 480 },
      { label: '2025-07', value: 200 },
      { label: '2025-08', value: 410 },
      { label: '2025-09', value: 480 },
      { label: '2025-10', value: 960 },
      { label: '2025-11', value: 480 },
      { label: '2025-12', value: 50 },
    ],
  },
  withdrawal_reason: {
    '2025': MOCK_WITHDRAWAL_REASONS.map((r) => ({
      label: r.name,
      name: r.name,
      value: r.value,
      fill: r.fill,
    })),
  },
  withdrawal_detail: {
    '2025':
      MOCK_WITHDRAWAL_DETAIL_BY_REASON['다른 부트캠프를 이용하게 되었어요.'],
  },
}

export const MOCK_YEARLY_MEMBER_DATA: Record<MemberViewType, MemberStatData[]> =
  {
    subscribers: [
      { label: '2023', value: 860 },
      { label: '2024', value: 280 },
      { label: '2025', value: 960 },
    ],
    withdrawals: [
      { label: '2023', value: 210 },
      { label: '2024', value: 120 },
      { label: '2025', value: 45 },
    ],
    conversion: [
      { label: '2023', value: 210 },
      { label: '2024', value: 110 },
      { label: '2025', value: 35 },
    ],
    withdrawal_reason: [],
    withdrawal_detail: [{ label: '2025', value: 2300 }],
  }
