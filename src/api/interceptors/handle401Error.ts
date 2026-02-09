import type { AxiosError } from 'axios'
import { apiClient } from '@/api'
import { API_PATHS } from '@/constants/api'

// 토큰 재발급을 시도하고 성공하면 원래 요청을 재시도합니다.
export async function handle401Error(error: AxiosError) {
  const originalRequest = error.config

  if (!originalRequest) {
    return Promise.reject(error)
  }

  try {
    // 1. 토큰 재발급 시도
    await apiClient.post(API_PATHS.AUTH.REFRESH_TOKEN)
    // 2. 재발급 성공 시 원래 요청 재시도
    return apiClient(originalRequest)
  } catch (refreshError) {
    // 3. 재발급 실패 시 로그인 페이지로 '완전 이동' (window.location)
    alert('로그인이 만료되었습니다.')
    window.location.href = '/login'
    return Promise.reject(refreshError)
  }
}
