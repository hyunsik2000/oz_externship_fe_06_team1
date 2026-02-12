import { useEffect, useMemo } from 'react'
import { Button, Dropdown, Modal } from '@/components/common'

export type Option = { label: string; value: string }

export type PermissionValue = {
  role: string
}

export type ModifyPermissionModalProps = {
  open: boolean
  onClose: () => void
  roleOptions: Option[]
  value: PermissionValue
  onChange: (next: PermissionValue) => void
  onSubmit: () => void
  rootRef?: React.RefObject<HTMLDivElement | null>
}

function SelectRow({
  label,
  placeholder,
  value,
  options,
  disabled = false,
  onChange,
}: {
  label: string
  placeholder: string
  value: string
  options: Option[]
  disabled?: boolean
  onChange: (next: string) => void
}) {
  return (
    <div className="grid grid-cols-[45px_1fr] items-center gap-2">
      <span className="text-grey-700 text-sm font-semibold">{label}</span>
      <Dropdown
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  )
}

export default function ModifyPermissionModal({
  open,
  onClose,
  roleOptions,
  value,
  onChange,
  onSubmit,
  rootRef,
}: ModifyPermissionModalProps) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  const roleLabel = useMemo(
    () => roleOptions.find((o) => o.value === value.role)?.label ?? '',
    [roleOptions, value.role]
  )

  const canSubmit = Boolean(value.role)

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      size="filter"
      showCloseButton
      className="min-h-[320px] !w-[580px]"
    >
      <div ref={rootRef} className="flex min-h-[320px] flex-col">
        <Modal.Header className="shrink-0 border-b-0 px-10 pt-8 pb-2">
          권한 변경하기
          <p className="text-grey-500 mb-1 text-sm">
            변경할 권한을 선택해주세요.
          </p>
        </Modal.Header>

        <Modal.Body className="min-h-0 flex-1 overflow-y-auto px-10 pt-1 pb-5">
          <div className="space-y-3">
            <SelectRow
              label="권한"
              placeholder="권한을 선택해주세요"
              options={roleOptions}
              value={value.role}
              onChange={(role) => onChange({ ...value, role })}
            />
          </div>

          <div className="mt-6">
            <p className="text-grey-700 text-sm">
              현재 변경할 권한은{' '}
              <span className="text-primary-700 font-semibold">
                {roleLabel || '선택된 항목이 없습니다'}
              </span>{' '}
              입니다.
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer className="mt-auto shrink-0 bg-white px-10 pt-6 pb-8">
          <Button
            variant="primary"
            size="search"
            className="h-[36px] w-[55px] rounded-[3px]"
            disabled={!canSubmit}
            onClick={onSubmit}
          >
            저장
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  )
}
