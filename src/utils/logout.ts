import { apiClient } from '@/api'
import { API_PATHS } from '@/constants/api'
import { useAuthStore } from '@/store'

// 로그아웃 처리
export const logout = async () => {
  try {
    await apiClient.post(
      API_PATHS.AUTH.LOGOUT,
      {},
      { errorTitle: '로그아웃 실패' }
    )
  } finally {
    useAuthStore.getState().clearAuth()
    window.location.href = '/login'
  }
}
