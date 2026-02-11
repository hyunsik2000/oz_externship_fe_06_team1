import { useCallback, useEffect, useState } from 'react'
import { API_PATHS } from '@/constants/api'
import type { HistoryItem, HistoryListResponse } from '@/types/history'
import { useAxios } from './useAxios'

export function useExamHistory() {
  const { sendRequest, isLoading } = useAxios()
  const [submissions, setSubmissions] = useState<HistoryItem[]>([])

  const refetch = useCallback(async () => {
    try {
      const data = await sendRequest<HistoryListResponse>({
        method: 'GET',
        url: API_PATHS.SUBMISSIONS.LIST,
        errorTitle: '응시 내역 조회에 실패했습니다.',
      })

      if (data?.results) {
        setSubmissions(data.results)
      }
    } catch {
      // 에러는 useAxios에서 전역 에러 스토어로 처리
    }
  }, [sendRequest])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return {
    submissions,
    isLoading,
    refetch,
  }
}
