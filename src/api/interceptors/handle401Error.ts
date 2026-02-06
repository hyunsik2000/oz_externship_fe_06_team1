import type { AxiosError } from 'axios'
import { API_PATHS } from '@/constants/api'
import { logout } from '@/utils'
import { apiClient } from '@/api'
import { useAuthStore } from '@/store'

// 토큰 재발급을 시도하고 성공하면 원래 요청을 재시도합니다.
export async function handle401Error(error: AxiosError) {
  const originalRequest = error.config

  if (!originalRequest) {
    return Promise.reject(error)
  }

  // 이미 한 번 지난 시도가 재발급 요청이면 로그아웃 -> 무한 루프 방지
  if (originalRequest.url === API_PATHS.AUTH.REFRESH_TOKEN) {
    logout()
    return Promise.reject(error)
  }

  try {
    // Access Token 재발급 요청
    const response = await apiClient.post(API_PATHS.AUTH.REFRESH_TOKEN)

    const newAccessToken = response.data.access_token
    if (newAccessToken) {
      useAuthStore.getState().setAccessToken(newAccessToken)

      // 실패한 요청의 헤더를 새 토큰으로 교체
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      }

      // 실패한 요청 재시도
      return apiClient(originalRequest)
    }
  } catch (err) {
    logout()
    return Promise.reject(err)
  }
  logout()
  return Promise.reject(error)
}
