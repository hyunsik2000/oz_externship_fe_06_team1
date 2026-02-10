import { useEffect } from 'react'
import { useErrorStore, useAlertStore } from '@/store'
// 전역 에러 상태를 감시하여 UI를 트리거

export function ErrorCatcher() {
  const { error, clearError } = useErrorStore()
  const { showAlert } = useAlertStore()

  useEffect(() => {
    if (!error) return

    const { status, message, mode, title } = error

    const alertType = status >= 500 ? 'danger' : 'warning'

    if (mode === 'modal') {
      showAlert({
        type: alertType,
        title: title || '오류',
        description: message || '',
      })
    } else if (mode === 'toast') {
      // toast 기능 구현 시 연동
    }

    // 출력 후 스토어 비우기
    clearError()
  }, [error])

  return null
}
