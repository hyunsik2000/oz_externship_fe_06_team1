import { useEffect, useState } from 'react'
import { API_PATHS } from '@/constants/api'
import type {
  AdminAccountListResponse,
  AdminAccountListItem,
  Member,
} from '@/types/member'
import { useAxios } from './useAxios'
import {
  mapApiRoleToMemberRole,
  mapApiStatusToMemberStatus,
} from '@/utils/accountMapping'

const DEFAULT_PAGE_SIZE = 20

function mapAccountToMember(item: AdminAccountListItem): Member {
  const role = mapApiRoleToMemberRole(item.role)
  const status = mapApiStatusToMemberStatus(item.status)
  return {
    id: item.id,
    nickname: item.nickname ?? '',
    name: item.name ?? '-',
    email: item.email,
    phone: item.phone_number,
    birthDate: item.birthday ?? '-',
    role,
    status,
    joinedAt: item.created_at ?? '-',
  }
}

export function useAdminAccounts(options?: {
  page?: number
  page_size?: number
}) {
  const { sendRequest, isLoading } = useAxios()
  const [members, setMembers] = useState<Member[]>([])
  const [totalCount, setTotalCount] = useState(0)

  const page = options?.page ?? 1
  const pageSize = options?.page_size ?? DEFAULT_PAGE_SIZE

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await sendRequest<AdminAccountListResponse>({
          method: 'GET',
          url: API_PATHS.ACCOUNTS.LIST,
          params: { page, page_size: pageSize },
          errorTitle: '유저 목록 조회에 실패했습니다.',
        })

        if (data?.results) {
          setMembers(data.results.map(mapAccountToMember))
          setTotalCount(data.count ?? data.results.length)
        } else {
          setMembers([])
          setTotalCount(0)
        }
      } catch {
        setMembers([])
        setTotalCount(0)
      }
    }

    void fetchAccounts()
  }, [sendRequest, page, pageSize])

  return {
    members,
    totalCount,
    isLoading,
  }
}
