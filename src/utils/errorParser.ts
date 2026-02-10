import { AxiosError } from 'axios'

export interface ParsedErrorInfo {
  status: number
  title: string
  message: string
}

// error의 에러 정보를 반환하는 함수

interface ErrorResponse {
  detail?: string | string[]
  error_detail?: string | Record<string, string[]>
}

export const errorParser = (error: AxiosError): ParsedErrorInfo => {
  const status = error.response?.status || 500
  const errorData = (error.response?.data || {}) as ErrorResponse

  const errorDetail = errorData?.error_detail || errorData?.detail

  let title = ''
  if (status >= 500) title = '서버 오류'
  else if (status === 401) title = '인증 오류'
  else if (status === 403) title = '권한 오류'
  else if (status === 404) title = '찾을 수 없음'
  else title = '요청 오류'

  let message = ''
  if (errorDetail && typeof errorDetail === 'object') {
    // { field: [msg1, msg2] } 형태의 상세 에러 처리
    message = Object.entries(errorDetail)
      .map(([field, messages]) => {
        const msg = Array.isArray(messages) ? messages.join(', ') : messages
        return `${field} : ${msg}`
      })
      .join('\n')
  } else {
    message =
      (typeof errorDetail === 'string' ? errorDetail : null) ||
      (Array.isArray(errorDetail) ? errorDetail.join(', ') : null) ||
      '오류가 발생했습니다.'
  }

  if (error.message === 'Network Error') {
    title = '연결 오류'
    message = '네트워크 연결 상태를 확인해주세요.'
  }

  return { status, title, message }
}
