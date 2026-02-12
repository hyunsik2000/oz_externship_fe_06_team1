// import memberImg from '@/assets/MemberImg.jpeg'
// import type {
//   MemberWithdrawalItemType,
//   MemberWithdrawalDetailType,
// } from '@/types'

// const DEFAULT_IMG = memberImg

// export let MOCK_WITHDRAWAL_DATA: MemberWithdrawalItemType[] = [
//   {
//     id: 1,
//     user: {
//       id: 101,
//       name: '권테디',
//       nickname: 'teddy',
//       email: 'teddy519@example.com',
//       phone: '010-1111-2222',
//       birth_date: '2021.05.19',
//       gender: '남',
//       role: 'Admin',
//       joined_at: '2025.12.01',
//       profile_image_url: DEFAULT_IMG,
//       status: 'Withdraw',
//     },
//     reason: 'other_bootcamp',
//     reason_display: '다른 부트캠프를 이용하게 되었어요.',
//     withdrawn_at: '2026.02.01 11:22:28',
//   },
//   {
//     id: 2,
//     user: {
//       id: 102,
//       name: '김오즈',
//       nickname: 'ozadmin',
//       email: 'ozcoding@gmail.com',
//       phone: '010-2222-3333',
//       birth_date: '2000.08.03',
//       gender: '여',
//       role: 'Staff',
//       joined_at: '2025.02.01',
//       profile_image_url: '',
//       status: 'Withdraw',
//     },
//     reason: 'low_frequency',
//     reason_display: '이용 빈도가 너무 낮아요.',
//     withdrawn_at: '2026.02.01 11:30:15',
//   },
//   {
//     id: 3,
//     user: {
//       id: 103,
//       name: '홍길동',
//       nickname: 'hong',
//       email: 'hong@oz.com',
//       phone: '010-3333-4444',
//       birth_date: '1998.11.02',
//       gender: '남',
//       role: 'Student',
//       joined_at: '2024.12.31',
//       profile_image_url: '',
//       status: 'Withdraw',
//     },
//     reason: 'completed',
//     reason_display: '수료',
//     withdrawn_at: '2026.02.01 11:45:00',
//   },
//   {
//     id: 4,
//     user: {
//       id: 104,
//       name: '박오즈',
//       nickname: 'parkoz',
//       email: 'park@oz.com',
//       phone: '010-4444-5555',
//       birth_date: '2000.08.03',
//       gender: '여',
//       role: 'General',
//       joined_at: '2025.01.26',
//       profile_image_url: '',
//       status: 'Withdraw',
//     },
//     reason: 'content_lack',
//     reason_display: '원하는 콘텐츠가 부족해요.',
//     withdrawn_at: '2026.02.01 12:10:22',
//   },
//   {
//     id: 5,
//     user: {
//       id: 105,
//       name: '이길동',
//       nickname: 'leegil',
//       email: 'lee@oz.com',
//       phone: '010-5555-6666',
//       birth_date: '2000.08.03',
//       gender: '남',
//       role: 'Student',
//       joined_at: '2025.02.01',
//       profile_image_url: '',
//       status: 'Withdraw',
//     },
//     reason: 'privacy',
//     reason_display: '개인정보가 걱정돼요.',
//     withdrawn_at: '2026.02.02 09:15:30',
//   },
//   ...Array.from({ length: 25 }).map((_, index) => ({
//     id: 6 + index,
//     user: {
//       id: 106 + index,
//       name: `탈퇴유저${index + 1}`,
//       nickname: `user_nick_${index + 1}`,
//       email: `user${index + 1}@example.com`,
//       phone: `010-0000-${1000 + index}`,
//       birth_date: '1995.01.01',
//       gender: index % 2 === 0 ? '남' : '여',
//       role: index % 3 === 0 ? 'Student' : index % 3 === 1 ? 'General' : 'Staff',
//       joined_at: '2024.01.01',
//       profile_image_url: '',
//       status: 'Withdraw',
//     },
//     reason: 'etc',
//     reason_display: '기타 (직접 입력)',
//     withdrawn_at: `2026.02.05 10:00:${index < 10 ? '0' + index : index}`,
//   })),
// ]

// export const MOCK_WITHDRAWAL_DETAILS: Record<
//   number,
//   MemberWithdrawalDetailType
// > = MOCK_WITHDRAWAL_DATA.reduce(
//   (acc, item) => {
//     acc[item.id] = {
//       ...item,
//       assigned_courses: [
//         { course_name: '웹 개발 초격차 프론트엔드 부트캠프', cohort: 15 },
//       ],
//       reason_detail:
//         item.reason === 'etc'
//           ? '개인적인 사정으로 인해 더 이상 수강이 어렵습니다.'
//           : '',
//       due_date: '2026.03.01',
//     }
//     return acc
//   },
//   {} as Record<number, MemberWithdrawalDetailType>
// )

// export const MOCK_WITHDRAWAL_LIST_RESPONSE = {
//   count: MOCK_WITHDRAWAL_DATA.length,
//   next: null,
//   previous: null,
//   results: MOCK_WITHDRAWAL_DATA,
// }

// export const deleteMockWithdrawal = (id: number) => {
//   MOCK_WITHDRAWAL_DATA = MOCK_WITHDRAWAL_DATA.filter((item) => item.id !== id)
// }
