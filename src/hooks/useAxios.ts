import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/api'
import type { AxiosRequestConfig } from 'axios'

//React Quer를 사용하는 커스텀 Axios 훅

export function useAxios() {
  // 리액트 쿼리의 useMutation을 사용하여 API 호출하여 Error 발생시 전역 에러 핸들링을 할 수 있도록
  const mutation = useMutation<any, any, AxiosRequestConfig>({
    mutationFn: async (config: AxiosRequestConfig) => {
      const response = await apiClient.request(config)
      return response.data
    },
  })

  const sendRequest = useCallback(
    async <T>(config: AxiosRequestConfig): Promise<T> => {
      return mutation.mutateAsync(config)
    },
    [mutation]
  )

  return {
    sendRequest,
    isLoading: mutation.isPending,
  }
}
