import type { Member } from '@/types/member'

export const MOCK_MEMBER_LIST: Member[] = [
  {
    id: 1,
    nickname: 'teddy',
    name: '권테디',
    email: 'teddy519@example.com',
    birthDate: '2021-05-19',
    role: 'Admin',
    status: 'Activated',
    joinedAt: '2025-12-01',
  },
  {
    id: 2,
    nickname: 'oz-user',
    name: '홍길동',
    email: 'hong@example.com',
    birthDate: '1998-11-02',
    role: 'User',
    status: 'Disabled',
    joinedAt: '2025-11-14',
  },
  {
    id: 3,
    nickname: 'tester',
    name: '김테스트',
    email: 'test@example.com',
    birthDate: '2000-01-09',
    role: 'Manager',
    status: 'Withdraw',
    joinedAt: '2025-10-07',
  },
]

export const MOCK_MEMBER_LIST_RESPONSE = {
  members: MOCK_MEMBER_LIST,
}
