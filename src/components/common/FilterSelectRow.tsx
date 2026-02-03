import { Dropdown } from '@/components/common'
import type { DropdownOption } from '@/types'

export interface FilterSelectRowProps {
  label?: string
  placeholder: string
  value: string
  options: DropdownOption[]
  disabled?: boolean
  onChange: (next: string) => void
}

export function FilterSelectRow({
  label,
  placeholder,
  value,
  options,
  disabled = false,
  onChange,
}: FilterSelectRowProps) {
  if (!label) {
    return (
      <Dropdown
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full"
      />
    )
  }

  return (
    <div className="grid grid-cols-[45px_1fr] items-center gap-2">
      <span className="text-grey-700 text-sm font-semibold">{label}</span>
      <div className="flex-1">
        <Dropdown
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
