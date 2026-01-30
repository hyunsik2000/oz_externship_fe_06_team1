import { Button, Modal } from '@/components/common'
import WarningIcon from '@/assets/icons/Warnning.svg?react'

interface WarningModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  message?: string
  subMessage?: string
}

export const WarningModal = ({
  isOpen,
  onClose,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  message = '경고 알림',
  subMessage = '다시 한번 확인 해주세요.',
}: WarningModalProps) => {
  const isConfirmMode = !!onConfirm

  return (
    <Modal isOpen={isOpen} size="sm2" onClose={onClose} showCloseButton>
      <div className="flex flex-col items-center justify-center gap-3.5 text-center">
        <Modal.Header className="pt-8 pb-0">
          <div className="bg-error-400/12 flex h-[60px] w-[60px] items-center justify-center rounded-full">
            <WarningIcon className="translate-x-[1px] -translate-y-[1px]" />{' '}
            {/* SVG 아이콘 미세 위치 조정*/}
          </div>
        </Modal.Header>

        <Modal.Body className="p-0">
          <p className="mb-3 max-w-[350px] text-lg leading-[20px] font-semibold">
            {message}
          </p>
          <p className="text-grey-600 mx-auto mb-1.5 max-w-[250px] text-base leading-[20px]">
            {subMessage}
          </p>
        </Modal.Body>

        <Modal.Footer className="mb-7 gap-2 p-0">
          {isConfirmMode && (
            <Button
              onClick={onClose}
              variant="outline"
              className="rounded-[3px] font-normal"
            >
              {cancelText}
            </Button>
          )}
          <Button
            onClick={onConfirm ?? onClose}
            variant="danger"
            className="rounded-[3px] font-normal"
          >
            {confirmText}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  )
}
