import { useEffect, useState } from 'react'
import { API_PATHS } from '@/constants/api'
import type { AdminAccountDetail, MemberDetail } from '@/types/member'
import { useAxios } from './useAxios'
import {
  mapApiRoleToMemberRole,
  mapApiStatusToMemberStatus,
} from '@/utils/accountMapping'

function mapGender(apiGender?: string): '남' | '여' | '미설정' {
  if (apiGender === 'MALE') return '남'
  if (apiGender === 'FEMALE') return '여'
  return '미설정'
}

function getCourseName(entry: {
  course?: string | { id?: number; name?: string; course_name?: string }
  cohort?: number | { id?: number; number?: number }
  course_name?: string
}): string {
  if (entry.course_name && typeof entry.course_name === 'string')
    return entry.course_name
  const c = entry.course
  if (typeof c === 'string') return c
  if (c && typeof c === 'object')
    return (
      (c as { name?: string; course_name?: string }).name ??
      (c as { name?: string; course_name?: string }).course_name ??
      ''
    )
  return ''
}

function getCohortDisplay(entry: {
  course?: string | { id?: number; name?: string; course_name?: string }
  cohort?: number | { id?: number; number?: number }
}): string {
  const co = entry.cohort
  if (typeof co === 'number') return `${co}기`
  if (co && typeof co === 'object' && 'number' in co)
    return co.number != null ? `${co.number}기` : ''
  return ''
}

function mapAccountDetailToMemberDetail(
  item: AdminAccountDetail | null
): MemberDetail | null {
  if (!item) return null

  const assigned = item.assigned_courses ?? []
  const ongoingCourses = assigned
    .map(getCourseName)
    .filter((name): name is string => name.length > 0)
  const cohorts = assigned
    .map(getCohortDisplay)
    .filter((s): s is string => s.length > 0)

  return {
    id: item.id,
    nickname: item.nickname ?? '',
    name: item.name ?? '-',
    email: item.email,
    phone: item.phone_number || undefined,
    birthDate: item.birthday ?? '-',
    role: mapApiRoleToMemberRole(item.role),
    status: mapApiStatusToMemberStatus(item.status),
    joinedAt: item.created_at ?? '-',
    gender: mapGender(item.gender),
    profileImageUrl: item.profile_img_url,
    ongoingCourses,
    cohorts,
  }
}

export function useAdminAccountDetail(accountId: number | null) {
  const { sendRequest, isLoading } = useAxios()
  const [detail, setDetail] = useState<MemberDetail | null>(null)

  useEffect(() => {
    if (!accountId) {
      setDetail(null)
      return
    }

    const fetchDetail = async () => {
      try {
        const data = await sendRequest<AdminAccountDetail>({
          method: 'GET',
          url: API_PATHS.ACCOUNTS.DETAIL(accountId),
          errorTitle: '회원 상세 조회에 실패했습니다.',
        })
        setDetail(mapAccountDetailToMemberDetail(data))
      } catch {
        setDetail(null)
      }
    }

    void fetchDetail()
  }, [sendRequest, accountId])

  return {
    detail,
    isLoading,
  }
}
