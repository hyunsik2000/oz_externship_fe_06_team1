export type ApiErrorMode = 'toast' | 'modal' | 'none'

export interface RequestErrorParams {
  status: number
  errorCode?: string
  title?: string
  message: string
  mode?: ApiErrorMode
}

// API 요청 중 발생한 에러를 통합 관리하기 위한 전용 에러 클래스
export class RequestError extends Error {
  status: number
  errorCode?: string
  title?: string
  mode: ApiErrorMode
  isHandled: boolean = false // 지역적으로 처리되었는지 여부

  constructor({
    status,
    errorCode,
    title,
    message,
    mode = 'modal',
  }: RequestErrorParams) {
    super(message)
    this.name = 'RequestError'
    this.status = status
    this.errorCode = errorCode
    this.title = title
    this.mode = mode
  }
}
