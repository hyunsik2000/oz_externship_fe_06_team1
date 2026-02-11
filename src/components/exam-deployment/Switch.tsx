import { cn } from '@/lib/cn'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function Switch({
  checked,
  onChange,
  disabled,
  className,
}: SwitchProps) {
  const toggle = () => {
    if (!disabled) {
      onChange(!checked)
    }
  }

  return (
    <button
      type="button"
      role="switch"
      disabled={disabled}
      onClick={toggle}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out outline-none',
        checked ? 'bg-success-400' : 'bg-grey-300',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out',
          checked ? 'translate-x-5.5' : 'translate-x-0.5'
        )}
      />
    </button>
  )
}
