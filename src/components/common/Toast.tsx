import type { VariantProps } from 'class-variance-authority'
import { Check, X } from 'lucide-react'
import { toastVariants } from '@/constants/variants'
import { cn } from '@/lib/cn'

interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string
  onClose: () => void
}

export function Toast({ variant, message, onClose }: ToastProps) {
  const isSuccess = variant === 'success'

  return (
    <div className={cn(toastVariants({ variant }))}>
      <div
        className={cn(
          'mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white',
          isSuccess ? 'bg-success-400' : 'bg-error-400'
        )}
      >
        {isSuccess ? (
          <Check size={14} strokeWidth={3} />
        ) : (
          <span className="text-2xl leading-none font-semibold select-none">
            !
          </span>
        )}
      </div>

      <p className="text-grey-800 flex-1 text-sm font-medium">{message}</p>

      <button
        onClick={onClose}
        className={cn(
          'ml-2 rounded-md p-1 transition-colors',
          isSuccess
            ? 'text-success-400 hover:bg-green-50'
            : 'text-error-400 hover:bg-red-50'
        )}
      >
        <X size={24} />
      </button>
    </div>
  )
}
