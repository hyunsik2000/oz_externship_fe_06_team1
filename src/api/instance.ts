import { handle401Error } from '@/api/interceptors/handle401Error'
import axios from 'axios'
import { RequestError, type ApiErrorMode } from '@/types'
import { errorParser } from '@/utils'
import { useAuthStore } from '@/store'
import { API_PATHS } from '@/constants/api'

declare module 'axios' {
  export interface AxiosRequestConfig {
    errorTitle?: string
    errorMode?: ApiErrorMode
    _retry?: boolean
  }
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (config) => {
    const isAuthRequest =
      config.url?.includes(API_PATHS.AUTH.LOGIN) ||
      config.url?.includes(API_PATHS.AUTH.REFRESH_TOKEN)

    if (isAuthRequest) {
      return config
    }
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status
    const config = error.config

    const isRefreshRequest = config?.url?.includes(API_PATHS.AUTH.REFRESH_TOKEN)

    // 401 에러 처리
    if (status === 401) {
      // 리프레시 토큰 요청 자체가 만료/실패한 경우 -> 로그인 페이지 강제 이동시키기
      if (isRefreshRequest) {
        alert('다시 로그인 해주세요.')
        window.location.href = '/login'
        return new Promise(() => {})
      }
      // 일반 요청 실패 -> 토큰 재발급 시도
      return handle401Error(error)
    }

    const {
      status: errorStatus,
      title: errorTitle,
      message,
    } = errorParser(error)

    const requestError = new RequestError({
      status: errorStatus,
      message: message,
      title: config?.errorTitle || errorTitle,
      mode: config?.errorMode || 'modal',
    })

    return Promise.reject(requestError)
  }
)
