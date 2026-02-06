import { useMemo, useState } from 'react'
import type { MemberRegistrationItemType } from '@/types'

export function useStudentRegistration(
  initialData: MemberRegistrationItemType[]
) {
  const [items, setItems] = useState(initialData)

  const [filters, setFilters] = useState({
    status: 'all',
    keyword: '',
  })

  const [appliedFilters, setAppliedFilters] = useState({
    status: 'all',
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

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchStatus =
        appliedFilters.status === 'all' || item.status === appliedFilters.status

      const matchKeyword =
        item.user_name.includes(appliedFilters.keyword) ||
        item.course_name.includes(appliedFilters.keyword) ||
        item.email.includes(appliedFilters.keyword)

      return matchStatus && matchKeyword
    })
  }, [items, appliedFilters])

  const applyFilters = () => {
    setAppliedFilters(filters)
    setSelectedIds([])
  }

  const toggleAll = () => {
    const submittableItems = filteredItems.filter(
      (i) => i.status === 'Submitted'
    )
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

  const updateStatus = (newStatus: MemberRegistrationItemType['status']) => {
    setItems((prev) =>
      prev.map((item) =>
        selectedIds.includes(item.id) && item.status === 'Submitted'
          ? { ...item, status: newStatus }
          : item
      )
    )
    setSelectedIds([])
  }

  const handleOpenModal = (targetStatus: 'Accepted' | 'Rejected') => {
    if (selectedIds.length === 0) {
      return alert('항목을 선택해주세요.')
    }

    const submittableItems = items.filter(
      (item) => selectedIds.includes(item.id) && item.status === 'Submitted'
    )

    if (submittableItems.length === 0) {
      return alert('변경 가능한(대기 중인) 항목이 없습니다.')
    }

    const isApprove = targetStatus === 'Accepted'
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
      onConfirm: () => updateStatus(targetStatus),
    })
  }

  const openApproveModal = () => handleOpenModal('Accepted')
  const openRejectModal = () => handleOpenModal('Rejected')

  return {
    filters,
    filteredItems,
    selectedIds,
    modalConfig,
    setFilters,
    applyFilters,
    toggleOne,
    toggleAll,
    closeModal,
    openApproveModal,
    openRejectModal,
  }
}
