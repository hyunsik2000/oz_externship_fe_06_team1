import { useEffect, useState } from 'react'
import { API_PATHS } from '@/constants/api'
import type { HistoryItem } from '@/types/history'
import { useAxios } from './useAxios'

export function useExamHistoryDetail(submissionId: number | null) {
  const { sendRequest, isLoading } = useAxios()
  const [detail, setDetail] = useState<HistoryItem | null>(null)

  useEffect(() => {
    if (!submissionId) {
      setDetail(null)
      return
    }

    const fetchDetail = async () => {
      try {
        const data = await sendRequest<HistoryItem>({
          method: 'GET',
          url: API_PATHS.SUBMISSIONS.DETAIL(submissionId),
          errorTitle: '응시 내역 상세 조회에 실패했습니다.',
        })
        setDetail(data)
      } catch {
        // 에러는 useAxios에서 전역 에러 스토어로 처리
        setDetail(null)
      }
    }

    void fetchDetail()
  }, [sendRequest, submissionId])

  return {
    detail,
    isLoading,
  }
}
