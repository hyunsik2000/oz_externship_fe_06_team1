import { AxiosError } from 'axios'

export interface ParsedErrorInfo {
  status: number
  message: string
}

// error의 에러 정보를 반환하는 함수

export const errorParser = (error: AxiosError): ParsedErrorInfo => {
  const status = error.response?.status || 500
  const errorData = error.response?.data as any
  const errorDetail = errorData?.error_detail

  let message = ''

  if (errorDetail && typeof errorDetail === 'object') {
    // { field: [msg1, msg2] } 형태의 에러 상세 처리
    message = Object.entries(errorDetail)
      .map(([field, messages]) => {
        const msg = Array.isArray(messages) ? messages.join(', ') : messages
        return `${field} : ${msg}`
      })
      .join('\n')
  } else {
    message =
      (typeof errorDetail === 'string' ? errorDetail : null) ||
      '오류가 발생했습니다.'
  }

  return { status, message }
}
