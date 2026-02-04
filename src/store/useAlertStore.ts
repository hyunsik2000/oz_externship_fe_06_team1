import { create } from 'zustand'
import type { AlertType } from '@/types'

interface AlertState {
  isOpen: boolean
  type: AlertType
  title: string
  description: string
  confirmText: string
  onConfirm?: () => void
  onClose?: () => void
}

interface AlertActions {
  showAlert: (params: {
    type?: AlertType
    title: string
    description?: string
    confirmText?: string
    onConfirm?: () => void
    onClose?: () => void
  }) => void
  hideAlert: () => void
}

export const useAlertStore = create<AlertState & AlertActions>((set) => ({
  isOpen: false,
  type: 'warning',
  title: '',
  description: '',
  confirmText: '확인',

  showAlert: ({
    type = 'warning',
    title,
    description = '',
    confirmText = '확인',
    onConfirm,
    onClose,
  }) =>
    set({
      isOpen: true,
      type,
      title,
      description,
      confirmText,
      onConfirm,
      onClose,
    }),

  hideAlert: () => set({ isOpen: false }),
}))
