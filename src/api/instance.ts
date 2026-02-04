import { getCookie } from '@/utils'
import { useAlertStore } from '@/store/useAlertStore'
import { handle401Error } from '@/api/interceptors/handle401Error'
import axios from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    errorTitle?: string
  }
}

export const apiClient = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken')
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
    const errorData = error.response?.data
    const errorDetail = errorData?.error_detail
    const customTitle = error.config?.errorTitle

    // 401 에러는 별도 핸들러에서 처리
    if (status === 401) {
      return handle401Error(error)
    }

    let message = ''

    if (errorDetail && typeof errorDetail === 'object') {
      // { field: [msg1, msg2] } 형태의 에러 상세 처리
      message = Object.entries(errorDetail)
        .map(([field, messages]) => {
          const msg = Array.isArray(messages) ? messages.join(', ') : messages
          return `${field}: ${msg}`
        })
        .join('\n')
    } else {
      message =
        (typeof errorDetail === 'string' ? errorDetail : null) ||
        '오류가 발생했습니다.'
    }

    // 상태 코드별 기본 타이틀 및 타입 설정
    let title = customTitle || '오류 발생'
    let type: 'warning' | 'danger' = 'warning'

    if (status >= 500) {
      title = customTitle || '서버 내부 오류'
      type = 'danger'
    } else if (status === 403) {
      title = customTitle || '권한이 없습니다.'
    } else if (status === 400) {
      title = customTitle || '유효성 검사 실패'
    } else if (status === 404) {
      title = customTitle || '정보를 찾을 수 없습니다.'
    }

    // 전역 알림 모달 띄우기
    useAlertStore.getState().showAlert({
      type: type,
      title: title,
      description: message,
    })

    return Promise.reject(error)
  }
)
