import { create } from 'zustand'

type ToastVariant = 'success' | 'error'

interface ToastState {
  isOpen: boolean
  variant: ToastVariant
  message: string
  duration: number
}

interface ToastActions {
  showToast: (params: {
    variant?: ToastVariant
    message: string
    duration?: number
  }) => void
  hideToast: () => void
}

export const useToastStore = create<ToastState & ToastActions>((set) => ({
  isOpen: false,
  variant: 'success',
  message: '',
  duration: 3000,

  showToast: ({ variant = 'success', message, duration = 3000 }) =>
    set({ isOpen: true, variant, message, duration }),

  hideToast: () => set({ isOpen: false }),
}))
