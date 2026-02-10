import { useState, useCallback } from 'react'
import { apiClient } from '@/api'
import { useErrorStore } from '@/store'
import { RequestError } from '@/types'
import type { AxiosRequestConfig } from 'axios'

export function useAxios() {
  const [isLoading, setIsLoading] = useState(false)
  const setError = useErrorStore((state) => state.setError)

  /**
   * API 요청 함수
   * @param config Axios 요청 설정
   * @param options 에러 처리 옵션
   * @returns API 응답 데이터
   */
  const sendRequest = useCallback(
    async <T>(
      config: AxiosRequestConfig,
      options?: {
        onError?: (error: RequestError) => boolean | void
      }
    ): Promise<T> => {
      setIsLoading(true)
      try {
        const response = await apiClient.request(config)
        return response.data as T
      } catch (error) {
        const requestError = error as RequestError

        // 1. 컴포넌트 레벨에서 전달받은 에러 핸들러 실행
        let isHandledLocally = false
        if (options?.onError) {
          isHandledLocally = options.onError(requestError) === true
        }

        // 2. 전역 에러 처리 fallback
        if (
          !isHandledLocally &&
          !requestError.isHandled &&
          requestError.mode !== 'none'
        ) {
          setError(requestError)
        }

        throw requestError
      } finally {
        setIsLoading(false)
      }
    },
    [setError]
  )

  return {
    sendRequest,
    isLoading,
  }
}
