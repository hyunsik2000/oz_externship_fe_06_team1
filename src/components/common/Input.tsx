import type { VariantProps } from 'class-variance-authority'
import { AlertCircle } from 'lucide-react'
import * as React from 'react'
import { inputVariants } from '@/constants/variants'
import { cn } from '@/lib/cn'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string | boolean
  icon?: React.ReactNode
  required?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, label, error, icon, required, status, size, ...props },
    ref
  ) => {
    const currentStatus = error ? 'error' : status || 'default'

    return (
      <div className="space-y-1.5 text-left">
        {label && (
          <label
            className={cn(
              'text-sm font-medium',
              currentStatus === 'error' ? 'text-error-400' : 'text-grey-800'
            )}
          >
            {label}
            {required && <span className="text-error-400 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="text-grey-400 absolute top-1/2 left-3 -translate-y-1/2">
              {icon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              inputVariants({ status: currentStatus, size, className }),
              icon ? 'pl-10' : 'pl-3',
              error ? 'pr-10' : 'pr-3'
            )}
            ref={ref}
            {...props}
          />

          {error && (
            <div className="text-error-400 absolute top-1/2 right-3 -translate-y-1/2">
              <AlertCircle size={20} />
            </div>
          )}
        </div>

        {typeof error === 'string' && (
          <p className="text-error-400 text-xs font-medium">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
