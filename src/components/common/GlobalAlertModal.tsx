import { AlertModal } from '@/components/common'
import { useAlertStore } from '@/store/useAlertStore'

export function GlobalAlertModal() {
  const {
    isOpen,
    type,
    title,
    description,
    confirmText,
    onConfirm,
    onClose,
    hideAlert,
  } = useAlertStore()

  const handleClose = () => {
    hideAlert()
    onClose?.()
  }

  const handleConfirm = () => {
    onConfirm?.()
    hideAlert()
  }

  return (
    <AlertModal
      isOpen={isOpen}
      onClose={handleClose}
      type={type}
      title={title}
      description={description}
      confirmText={confirmText}
      onConfirm={handleConfirm}
    />
  )
}
