import { useEffect } from 'react'
import { useErrorStore, useAlertStore, useToastStore } from '@/store'
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
      useToastStore.getState().showToast({
        message: message || '해당 과정을 진행하는 중 오류가 발생하였습니다.',
        variant: 'error',
      })
    }

    // 출력 후 스토어 비우기
    clearError()
  }, [error, clearError, showAlert])

  return null
}
