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

    // 401은 인증 흐름이므로 별도 처리 유지 + 리프레시 요청이 401 에러 나면 즉시 error
    if (status === 401 && !isRefreshRequest) {
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
