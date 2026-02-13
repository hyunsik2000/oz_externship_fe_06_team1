import { useCallback, useEffect, useState } from 'react'
import type {
  MemberWithdrawalDetailType,
  MemberWithdrawalItemType,
} from '@/types'
import { useAuthStore, useToastStore } from '@/store'
import { withdrawalApi } from '@/api/withdrawal'

export function useMemberWithdrawal() {
  const { showToast } = useToastStore()
  const accessToken = useAuthStore((state) => state.accessToken)

  const [data, setData] = useState<MemberWithdrawalItemType[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const [filters, setFilters] = useState({
    role: 'all',
    keyword: '',
    page: 1,
  })

  const fetchList = useCallback(async () => {
    if (!accessToken) return

    setIsLoading(true)
    try {
      const response = await withdrawalApi.getList({
        page: filters.page,
        role: filters.role === 'all' ? undefined : filters.role,
        search: filters.keyword || undefined,
      })

      setData(response.data.results)
      setTotalCount(response.data.count)
    } finally {
      setIsLoading(false)
    }
  }, [filters.page, filters.role, filters.keyword, accessToken])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  const [selectedDetail, setSelectedDetail] =
    useState<MemberWithdrawalDetailType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openDetail = async (id: number) => {
    try {
      setIsLoading(true)
      const response = await withdrawalApi.getDetail(id)
      setSelectedDetail(response.data)
      setIsModalOpen(true)
    } catch {
      showToast({
        variant: 'error',
        message: '상세 정보를 불러오지 못했습니다.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const closeDetail = () => {
    setIsModalOpen(false)
    setSelectedDetail(null)
  }

  const handleRecover = async (id: number) => {
    try {
      await withdrawalApi.cancel(id)
      showToast({
        variant: 'success',
        message: '회원이 성공적으로 복구되어 리스트에서 제외되었습니다.',
      })
      closeDetail()
      await fetchList()
    } catch {
      showToast({
        variant: 'error',
        message: '복구 처리 중 오류가 발생했습니다.',
      })
    }
  }

  return {
    filters,
    setFilters,
    data,
    totalCount,
    applyFilters: fetchList,
    isModalOpen,
    selectedDetail,
    openDetail,
    closeDetail,
    isLoading,
    handleRecover,
  }
}
