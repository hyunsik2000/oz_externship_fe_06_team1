import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { modalVariants } from '@/constants/variants'
import { cn } from '@/lib/cn'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useRef } from 'react'

interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  showCloseButton: boolean
  blur?: boolean
}

export function Modal({
  isOpen,
  onClose,
  children,
  size,
  showCloseButton = true,
  blur = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useOutsideClick(modalRef, onClose, isOpen)

  if (!isOpen) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4',
        blur && 'animate-in fade-in backdrop-blur-sm duration-200'
      )}
    >
      <div
        ref={modalRef}
        className={cn(
          modalVariants({ size }),
          'animate-in zoom-in-95 duration-200'
        )}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="text-grey-400 hover:text-grey-600 absolute top-5 right-5 z-110 transition-colors"
          >
            <X size={24} />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

Modal.Header = function ModalHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('border-grey-100 border-b px-8 py-6', className)}>
      <h2 className="text-grey-800 text-xl font-bold">{children}</h2>
    </div>
  )
}

Modal.Body = function ModalBody({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex-1 overflow-y-auto p-8', className)}>
      {children}
    </div>
  )
}

Modal.Footer = function ModalFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn('bg-grey-50 flex justify-end gap-2 px-8 py-4', className)}
    >
      {children}
    </div>
  )
}
