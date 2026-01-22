import React from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/cn'

export type DropdownOption = {
  value: string
  label: string
}

interface DropdownProps {
  options: DropdownOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = '옵션을 선택하세요',
  className,
  disabled,
}: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    if (onChange) onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={cn('relative w-full', className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm transition-all outline-none',
          'border-grey-300 text-grey-800',
          disabled
            ? 'bg-grey-50 text-grey-400 cursor-not-allowed'
            : 'hover:bg-grey-50 cursor-pointer',
          isOpen && 'border-primary-500 ring-primary-500 ring-1'
        )}
      >
        <span className={cn(!selectedOption && 'text-grey-400')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            'text-grey-400 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <ul
          className={cn(
            'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white py-1 shadow-lg outline-none',
            'border-grey-100 animate-in fade-in-0 zoom-in-95 duration-100',
            'scrollbar-thin scrollbar-thumb-grey-300 scrollbar-track-transparent'
          )}
        >
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'flex cursor-pointer items-center justify-between px-3 py-2.5 text-sm transition-colors select-none',
                  isSelected
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-grey-700 hover:bg-grey-50'
                )}
              >
                <span>{option.label}</span>
                {isSelected && <Check size={16} className="text-primary-500" />}
              </li>
            )
          })}
          {options.length === 0 && (
            <div className="text-grey-400 px-3 py-2 text-sm">
              옵션이 없습니다.
            </div>
          )}
        </ul>
      )}
    </div>
  )
}
