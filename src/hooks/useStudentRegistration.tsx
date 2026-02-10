import { useCallback, useEffect, useState } from 'react'
import { API_PATHS } from '@/constants/api'
import { useAxios } from '@/hooks/useAxios'
import { useToastStore } from '@/store/useToastStore'
import type {
  StudentRegistrationActionRequest,
  StudentRegistrationActionResponse,
  StudentRegistrationApiQueryStatus,
  StudentRegistrationApiStatus,
  StudentRegistrationItemType,
  StudentRegistrationListQuery,
  StudentRegistrationListResponse,
} from '@/types'

const PAGE_SIZE = 10

const API_TO_UI_STATUS: Record<
  StudentRegistrationApiStatus,
  StudentRegistrationItemType['status']
> = {
  PENDING: 'Submitted',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  CANCELED: 'Canceled',
}

const UI_TO_API_QUERY_STATUS: Partial<
  Record<
    StudentRegistrationItemType['status'] | 'all',
    StudentRegistrationApiQueryStatus
  >
> = {
  Submitted: 'pending',
  Accepted: 'accepted',
  Rejected: 'rejected',
  Canceled: 'canceled',
}

function formatDateTime(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

function mapApiResultToItem(
  result: StudentRegistrationListResponse['results'][number]
): StudentRegistrationItemType {
  return {
    id: result.id,
    course_name: result.course.name,
    cohort: result.cohort.number,
    user_name: result.user.name,
    email: result.user.email,
    birth_date: result.user.birthday,
    status: API_TO_UI_STATUS[result.status],
    requested_at: formatDateTime(result.created_at),
  }
}

export function useStudentRegistration() {
  const { sendRequest } = useAxios()
  const showToast = useToastStore((state) => state.showToast)

  const [items, setItems] = useState<StudentRegistrationItemType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isActionLoading, setIsActionLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [filters, setFilters] = useState({
    status: 'all' as StudentRegistrationItemType['status'] | 'all',
    keyword: '',
  })

  const [appliedFilters, setAppliedFilters] = useState({
    status: 'all' as StudentRegistrationItemType['status'] | 'all',
    keyword: '',
  })

  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: 'confirm' as 'confirm' | 'danger',
    title: null as React.ReactNode,
    confirmText: '',
    onConfirm: () => {},
  })

  const toggleOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const fetchList = useCallback(async () => {
    setIsLoading(true)
    try {
      const status = UI_TO_API_QUERY_STATUS[appliedFilters.status]
      const params: StudentRegistrationListQuery = {
        page: currentPage,
        page_size: PAGE_SIZE,
      }

      if (appliedFilters.keyword.trim()) {
        params.search = appliedFilters.keyword.trim()
      }

      if (status) {
        params.status = status
      }

      const response = await sendRequest<StudentRegistrationListResponse>({
        method: 'GET',
        url: API_PATHS.MEMBER.STUDENT_REGISTRATION,
        params,
        errorTitle: '수강생 등록 신청 목록 조회 실패',
      })

      setItems(response.results.map(mapApiResultToItem))
      setTotalCount(response.count)
      setSelectedIds([])
    } catch (error) {
      console.error(error)
      showToast({
        variant: 'error',
        message: '수강생 등록 신청 목록을 불러오지 못했습니다.',
      })
    } finally {
      setIsLoading(false)
    }
  }, [
    appliedFilters.keyword,
    appliedFilters.status,
    currentPage,
    sendRequest,
    showToast,
  ])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  const applyFilters = () => {
    setAppliedFilters(filters)
    setCurrentPage(1)
    setSelectedIds([])
  }

  const toggleAll = () => {
    const submittableItems = items.filter((i) => i.status === 'Submitted')
    const submittableIds = submittableItems.map((i) => i.id)

    if (
      selectedIds.length === submittableIds.length &&
      submittableIds.length > 0
    ) {
      setSelectedIds([])
    } else {
      setSelectedIds(submittableIds)
    }
  }

  const closeModal = () => setModalConfig((p) => ({ ...p, isOpen: false }))

  const processEnrollmentAction = async (
    action: 'accept' | 'reject',
    enrollmentIds: number[]
  ) => {
    if (isActionLoading || enrollmentIds.length === 0) return

    setIsActionLoading(true)
    try {
      const endpoint =
        action === 'accept'
          ? API_PATHS.MEMBER.STUDENT_REGISTRATION_ACCEPT
          : API_PATHS.MEMBER.STUDENT_REGISTRATION_REJECT

      const response = await sendRequest<StudentRegistrationActionResponse>({
        method: 'POST',
        url: endpoint,
        data: {
          enrollments: enrollmentIds,
        } satisfies StudentRegistrationActionRequest,
        errorTitle:
          action === 'accept'
            ? '수강생 등록 신청 승인 실패'
            : '수강생 등록 신청 반려 실패',
      })

      await fetchList()

      showToast({
        variant: 'success',
        message:
          response.detail ||
          (action === 'accept'
            ? '수강생 등록 신청이 승인되었습니다.'
            : '수강생 등록 신청이 반려되었습니다.'),
      })
    } catch (error) {
      console.error(error)
      showToast({
        variant: 'error',
        message:
          action === 'accept'
            ? '승인 처리 중 오류가 발생했습니다.'
            : '반려 처리 중 오류가 발생했습니다.',
      })
    } finally {
      setIsActionLoading(false)
    }
  }

  const handleOpenModal = (targetStatus: 'Accepted' | 'Rejected') => {
    if (selectedIds.length === 0) {
      return alert('항목을 선택해주세요.')
    }

    const submittableItems = items.filter(
      (item) => selectedIds.includes(item.id) && item.status === 'Submitted'
    )

    if (submittableItems.length === 0) {
      return alert('변경 가능한(대기중인) 항목이 없습니다.')
    }

    const isApprove = targetStatus === 'Accepted'
    const action: 'accept' | 'reject' = isApprove ? 'accept' : 'reject'
    const enrollmentIds = submittableItems.map((item) => item.id)

    const config = {
      type: isApprove ? ('confirm' as const) : ('danger' as const),
      confirmText: isApprove ? '승인' : '반려',
      colorClass: isApprove ? 'text-success-400' : 'text-error-400',
    }

    setModalConfig({
      isOpen: true,
      type: config.type,
      confirmText: config.confirmText,
      title: (
        <span>
          선택한{' '}
          <span className={config.colorClass}>{submittableItems.length}개</span>
          의 요청을{' '}
          <span className={config.colorClass}>{config.confirmText} 상태</span>로
          변경하시겠습니까?
        </span>
      ),
      onConfirm: () => processEnrollmentAction(action, enrollmentIds),
    })
  }

  const openApproveModal = () => handleOpenModal('Accepted')
  const openRejectModal = () => handleOpenModal('Rejected')

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  return {
    isLoading,
    isActionLoading,
    filters,
    items,
    totalCount,
    totalPages,
    currentPage,
    selectedIds,
    modalConfig,
    setCurrentPage,
    setFilters,
    applyFilters,
    toggleOne,
    toggleAll,
    closeModal,
    openApproveModal,
    openRejectModal,
  }
}
