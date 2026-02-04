import { useState, useCallback } from 'react'
import { apiClient } from '@/api'
import type { AxiosRequestConfig } from 'axios'

export function useAxios() {
  const [isLoading, setIsLoading] = useState(false)

  const sendRequest = useCallback(async <T>(config: AxiosRequestConfig) => {
    setIsLoading(true)
    try {
      const response = await apiClient.request<T>(config)
      return response.data
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { sendRequest, isLoading }
}
