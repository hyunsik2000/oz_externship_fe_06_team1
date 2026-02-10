import type { AxiosError } from 'axios'
import { apiClient } from '@/api'
import { API_PATHS } from '@/constants/api'

// 토큰 재발급을 시도하고 성공하면 원래 요청을 재시도합니다.
export async function handle401Error(error: AxiosError) {
  const originalRequest = error.config
  // 요청 설정이 없거나 이미 재시도한 요청인 경우 바로 에러 반환
  if (!originalRequest || originalRequest._retry) {
    return Promise.reject(error)
  }
  // 재시도 플래그 설정
  originalRequest._retry = true
  // 토큰 재발급 시도
  try {
    await apiClient.post(API_PATHS.AUTH.REFRESH_TOKEN)

    return apiClient(originalRequest)
  } catch {
    alert('다시 로그인 해주세요')
    window.location.href = '/login'
    return new Promise(() => {})
  }
}
