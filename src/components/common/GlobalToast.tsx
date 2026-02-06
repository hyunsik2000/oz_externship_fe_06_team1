import { useEffect } from 'react'
import { Toast } from '@/components/common'
import { useToastStore } from '@/store/useToastStore'

export function GlobalToast() {
  const { isOpen, variant, message, duration, hideToast } = useToastStore()

  useEffect(() => {
    if (!isOpen) return

    const timer = setTimeout(() => {
      hideToast()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, hideToast, isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed right-[30px] bottom-[30px] z-[9999]">
      <Toast variant={variant} message={message} onClose={hideToast} />
    </div>
  )
}
