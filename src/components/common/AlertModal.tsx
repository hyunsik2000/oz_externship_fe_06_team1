import { AlertTriangle, CircleAlert, CircleCheck } from 'lucide-react'
import { Button, Modal } from '@/components/common'
import { cn } from '@/lib/cn'
import type { AlertType } from '@/types'

type AlertModalProps = {
  isOpen: boolean
  onClose: () => void
  type: AlertType
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
}

export function AlertModal({
  isOpen,
  onClose,
  type,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
}: AlertModalProps) {
  const alertConfig = {
    success: {
      icon: (
        <CircleCheck
          size={44}
          strokeWidth={2}
          fill="currentColor"
          stroke="var(--color-primary-300)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
      iconBg: 'bg-primary-300',
      iconColor: 'text-primary-600',
      buttonVariant: 'confirm' as const,
      showCancel: false,
    },
    warning: {
      icon: (
        <CircleAlert
          size={44}
          strokeWidth={2}
          fill="currentColor"
          stroke="var(--color-warning-100)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
      iconBg: 'bg-warning-100',
      iconColor: 'text-warning-400',
      buttonVariant: 'warning' as const,
      showCancel: false,
    },
    danger: {
      icon: (
        <AlertTriangle
          size={40}
          strokeWidth={1.75}
          fill="currentColor"
          stroke="var(--color-error-100)"
        />
      ),
      iconBg: 'bg-error-100',
      iconColor: 'text-error-400',
      buttonVariant: 'danger' as const,
      showCancel: true,
    },
    confirm: {
      icon: <CircleCheck size={40} strokeWidth={2} />,
      iconBg: 'bg-success-100',
      iconColor: 'text-success-400',
      buttonVariant: 'success' as const,
      showCancel: true,
    },
  }

  const currentConfig = alertConfig[type]

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton>
      <Modal.Body className="flex flex-col items-center px-10 pt-12 pb-8 text-center">
        <div
          className={cn(
            'animate-in zoom-in-50 mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-transform',
            currentConfig.iconBg,
            currentConfig.iconColor
          )}
        >
          {currentConfig.icon}
        </div>

        <h3 className="text-grey-800 mb-2 text-xl font-bold break-keep">
          {title}
        </h3>
        {description && (
          <p className="text-grey-400 mb-8 text-sm leading-relaxed break-keep">
            {description}
          </p>
        )}

        <div className="flex w-full justify-center gap-3">
          {currentConfig.showCancel && (
            <Button variant="outline" className="w-20" onClick={onClose}>
              {cancelText}
            </Button>
          )}
          <Button
            variant={currentConfig.buttonVariant}
            className="w-20"
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            {confirmText}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
