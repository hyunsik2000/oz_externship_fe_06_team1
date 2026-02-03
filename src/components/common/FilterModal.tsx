import { useEffect } from 'react'
import { Button, Modal } from '@/components/common'
import type { DropdownOption } from '@/types'
import { FilterSelectRow } from './FilterSelectRow'

export interface FilterRowConfig {
  id: string | number
  label?: string
  placeholder: string
  options: DropdownOption[]
  value: string
  onChange: (next: string) => void
  disabled?: boolean
}

export interface FilterModalProps {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  rows: FilterRowConfig[]
  summary?: string
  onSubmit: () => void
  submitLabel?: string
  canSubmit?: boolean
}

export function FilterModal({
  open,
  onClose,
  title,
  subtitle,
  rows,
  summary,
  onSubmit,
  submitLabel = '조회',
  canSubmit = true,
}: FilterModalProps) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      size="filter"
      showCloseButton
      className="overflow-visible"
    >
      {(title || subtitle) && (
        <Modal.Header className="border-b-0 px-10 pt-8 pb-2">
          {title && <span className="block">{title}</span>}
          {subtitle && (
            <p className="text-grey-500 mt-1 text-sm font-normal">{subtitle}</p>
          )}
        </Modal.Header>
      )}

      <Modal.Body className="overflow-visible px-10 py-5">
        <div className="space-y-3">
          {rows.map((row) => (
            <FilterSelectRow
              key={row.id}
              label={row.label}
              placeholder={row.placeholder}
              options={row.options}
              value={row.value}
              onChange={row.onChange}
              disabled={row.disabled}
            />
          ))}
        </div>

        {summary && (
          <div className="pt-8">
            <p className="text-grey-700 text-sm">현재 선택된 항목은</p>
            <p className="text-grey-700 mt-1 text-sm">
              <span className="text-primary-700 font-semibold">{summary}</span>
              <span> 입니다.</span>
            </p>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="bg-white px-10 pb-6">
        <Button
          variant="confirm"
          className="h-10 w-20"
          disabled={!canSubmit}
          onClick={onSubmit}
        >
          {submitLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
