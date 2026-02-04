import { useEffect, useMemo } from 'react'
import { Button, Dropdown, Modal } from '@/components/common'

export type Option = { label: string; value: string }

export type PermissionValue = {
  role: string
  course: string
  cohort: string
}

export type ModifyPermissionModalProps = {
  open: boolean
  onClose: () => void
  roleOptions: Option[]
  courseOptions: Option[]
  cohortOptions: Option[]
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
  courseOptions,
  cohortOptions,
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
  const courseLabel = useMemo(
    () => courseOptions.find((o) => o.value === value.course)?.label ?? '',
    [courseOptions, value.course]
  )
  const cohortLabel = useMemo(
    () => cohortOptions.find((o) => o.value === value.cohort)?.label ?? '',
    [cohortOptions, value.cohort]
  )

  const summary = useMemo(() => {
    const parts = [roleLabel, courseLabel, cohortLabel].filter(Boolean)
    return parts.join(' > ')
  }, [roleLabel, courseLabel, cohortLabel])

  const canSubmit = Boolean(value.role && value.course && value.cohort)

  return (
    <Modal isOpen={open} onClose={onClose} size="filter" showCloseButton>
      <div ref={rootRef} className="flex h-full flex-col">
        <Modal.Header className="border-b-0 px-10 pt-8 pb-2">
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
            <SelectRow
              label="과정"
              placeholder="과정을 선택해주세요"
              options={courseOptions}
              value={value.course}
              onChange={(course) => onChange({ ...value, course })}
            />
            <SelectRow
              label="기수"
              placeholder="기수를 선택해주세요"
              options={cohortOptions}
              value={value.cohort}
              onChange={(cohort) => onChange({ ...value, cohort })}
            />
          </div>

          <div className="mt-6">
            <p className="text-grey-700 text-sm">
              현재 변경할 권한은{' '}
              <span className="text-primary-700 font-semibold">
                {summary || '선택된 항목이 없습니다'}
              </span>{' '}
              입니다.
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer className="bg-white px-10 pb-6">
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
