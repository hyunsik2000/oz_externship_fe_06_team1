import { useCallback, useEffect, useState } from 'react'
import { deploymentApi } from '@/api/deployment'
import { useToastStore } from '@/store'
import type { ExamDeploymentDetailType, ExamDeploymentItemType } from '@/types'

export function useExamDeployment() {
  const { showToast } = useToastStore()
  const [data, setData] = useState<ExamDeploymentItemType[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const [filters, setFilters] = useState({
    search: '',
    page: 1,
    course: '',
    cohort: '',
  })

  const [selectedDetail, setSelectedDetail] =
    useState<ExamDeploymentDetailType | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const openDetail = async (item: ExamDeploymentItemType) => {
    try {
      setIsLoading(true)
      const response = await deploymentApi.getDetail(item.id)
      setSelectedDetail(response.data)
      setIsDetailModalOpen(true)
    } catch (error) {
      console.error('상세 조회 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const closeDetail = () => {
    setIsDetailModalOpen(false)
    setSelectedDetail(null)
  }

  const fetchList = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await deploymentApi.getList({
        page: filters.page,
        search: filters.search || undefined,
        course: filters.course || undefined,
        cohort: filters.cohort || undefined,
      })
      setData(response.data.results)
      setTotalCount(response.data.count)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  const handleToggleStatus = async (id: number, currentIsActive: boolean) => {
    const nextStatus = currentIsActive ? 'activated' : 'deactivated'

    try {
      await deploymentApi.updateStatus(id, nextStatus)
      setData((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: nextStatus as 'activated' | 'deactivated' }
            : item
        )
      )
      showToast({
        variant: 'success',
        message: `배포 상태가 ${nextStatus === 'activated' ? '활성화' : '비활성화'} 되었습니다.`,
      })
    } catch (error) {
      showToast({ variant: 'error', message: '상태 변경에 실패했습니다.' })
    }
  }

  const handleDeleteDeployment = async (id: number) => {
    try {
      await deploymentApi.delete(id)

      showToast({
        variant: 'success',
        message: '성공적으로 배포 내역이 삭제되었습니다.',
      })

      await fetchList()
    } catch (error) {
      showToast({
        variant: 'error',
        message: '배포 내역 삭제에 실패했습니다.',
      })
    }
  }

  return {
    data,
    totalCount,
    filters,
    setFilters,
    isLoading,
    applyFilters: fetchList,
    handleToggleStatus,
    isDetailModalOpen,
    selectedDetail,
    openDetail,
    closeDetail,
    handleDeleteDeployment,
  }
}
