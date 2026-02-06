import { useEffect } from 'react'
import { useErrorStore } from '@/store'
import { useAlertStore } from '@/store'

// 전역 에러 상태를 감시하여 UI를 트리거

export function ErrorCatcher() {
  const { error, clearError } = useErrorStore()
  const { showAlert } = useAlertStore()

  useEffect(() => {
    // 등록된 store의 에러를 출력 (모달이나 toast)
    if (!error) return

    const { status, message, mode, title } = error

    if (status >= 500) {
      showAlert({
        type: 'danger',
        title: title || '시스템 오류',
        description: message || '서버와의 통신이 원활하지 않습니다.',
        onClose: () => clearError(),
      })
    } else {
      if (mode === 'modal') {
        showAlert({
          type: 'warning',
          title: title ?? '경고',
          description: message ?? '알 수 없는 오류가 발생했습니다.',
        })
      } else if (mode === 'toast') {
        // 토스트 연동 시 여기에 추가 예정
      }
    }

    // 출력 후 스토어 비우기
    clearError()
  }, [error])

  return null
}
