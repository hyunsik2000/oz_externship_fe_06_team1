import { Check } from 'lucide-react'

interface CustomCheckboxProps {
  checked: boolean
  onChange: () => void
}

export function CustomCheckbox({ checked, onChange }: CustomCheckboxProps) {
  return (
    <button type="button" onClick={onChange} className="cursor-pointer">
      {checked ? (
        <div className="bg-primary-700 flex h-4 w-4 items-center justify-center rounded-xs">
          <Check size={12} className="text-white" />
        </div>
      ) : (
        <div className="border-grey-300 h-4 w-4 rounded-xs border bg-white" />
      )}
    </button>
  )
}
