import { apiClient } from '@/api/instance'
import { API_PATHS } from '@/constants/api'
import type {
  MemberWithdrawalItemType,
  MemberWithdrawalDetailType,
  PaginatedWithdrawalResponse,
} from '@/types'

export const withdrawalApi = {
  getList: (params: {
    page?: number
    page_size?: number
    role?: string
    search?: string
    sort?: string
  }) =>
    apiClient.get<PaginatedWithdrawalResponse<MemberWithdrawalItemType>>(
      API_PATHS.WITHDRAWAL.LIST,
      { params }
    ),

  getDetail: (id: number | string) =>
    apiClient.get<MemberWithdrawalDetailType>(API_PATHS.WITHDRAWAL.DETAIL(id)),

  cancel: (id: number | string) =>
    apiClient.delete(API_PATHS.WITHDRAWAL.DETAIL(id)),
}
