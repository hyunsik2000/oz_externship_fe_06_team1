import React from 'react'
import { Check, Triangle } from 'lucide-react'
import {
  dropdownTriggerVariants,
  dropdownMenuVariants,
  dropdownItemVariants,
} from '@/constants/variants'
import { cn } from '@/lib/cn'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import type { DropdownOption } from '@/types'

interface DropdownProps {
  options: DropdownOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  variant?: 'outline' | 'memberFilter' | 'ghost'
  size?: 'sm' | 'md'
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = '옵션을 선택하세요',
  className,
  disabled,
  variant = 'outline',
  size = 'md',
}: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  useOutsideClick(dropdownRef, () => setIsOpen(false), isOpen)

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue)
    setIsOpen(false)
  }

  return (
    <div
      className={cn(
        'relative',
        variant !== 'ghost' ? 'w-full' : 'w-fit',
        className
      )}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          dropdownTriggerVariants({
            disabled: !!disabled,
            open: isOpen,
            variant,
            size,
          })
        )}
      >
        <span className={cn(!selectedOption && 'text-grey-400')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <Triangle
          size={8}
          fill="currentColor"
          className={cn(
            'text-grey-400 ml-2 transition-transform duration-200',
            isOpen ? 'rotate-0' : 'rotate-180',
            variant === 'ghost' && 'text-grey-800'
          )}
        />
      </button>

      {isOpen && (
        <ul className={cn(dropdownMenuVariants())}>
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(dropdownItemVariants({ selected: isSelected }))}
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
