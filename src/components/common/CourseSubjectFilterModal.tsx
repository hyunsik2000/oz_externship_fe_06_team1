import { useEffect, useMemo } from 'react'
import { Button } from '@/components/common/Button'
import { Dropdown } from '@/components/common/Dropdown'
import { Modal } from '@/components/common/Modal'

export type Option = { label: string; value: string }

export type FilterValue = {
  course: string
  cohort: string
  subject: string
}

export type Props = {
  open: boolean
  onClose: () => void
  courseOptions: Option[]
  cohortOptions: Option[]
  subjectOptions: Option[]
  value: FilterValue
  onChange: (next: FilterValue) => void
  onSubmit: () => void
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

export default function CourseSubjectFilterModal({
  open,
  onClose,
  courseOptions,
  cohortOptions,
  subjectOptions,
  value,
  onChange,
  onSubmit,
}: Props) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  const courseLabel = useMemo(
    () => courseOptions.find((o) => o.value === value.course)?.label ?? '',
    [courseOptions, value.course]
  )
  const cohortLabel = useMemo(
    () => cohortOptions.find((o) => o.value === value.cohort)?.label ?? '',
    [cohortOptions, value.cohort]
  )
  const subjectLabel = useMemo(
    () => subjectOptions.find((o) => o.value === value.subject)?.label ?? '',
    [subjectOptions, value.subject]
  )

  const summary = useMemo(() => {
    const left = [courseLabel, cohortLabel].filter(Boolean).join(' ')
    if (!left && !subjectLabel) return ''
    if (left && subjectLabel) return `${left} > ${subjectLabel}`
    return left || subjectLabel
  }, [courseLabel, cohortLabel, subjectLabel])

  const canSubmit = Boolean(value.course && value.cohort && value.subject)

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      showCloseButton
      className="flex h-[400px] w-[509px] flex-col overflow-hidden"
    >
      <Modal.Header className="border-b-0 px-10 pt-8 pb-3">
        과정-과목별 필터링
        <p className="text-grey-500 mb-1 text-sm">
          필터를 적용할 과정-기수와 과목을 선택해주세요.
        </p>
      </Modal.Header>

      <Modal.Body className="min-h-0 flex-1 overflow-y-auto px-10 pt-1 pb-5">
        <div className="space-y-3">
          <SelectRow
            label="과정"
            placeholder="과정을 선택해주세요"
            options={courseOptions}
            value={value.course}
            onChange={(course) =>
              onChange({
                course,
                cohort: '',
                subject: '',
              })
            }
          />
          <SelectRow
            label="기수"
            placeholder="기수를 선택해주세요"
            options={cohortOptions}
            value={value.cohort}
            disabled={!value.course}
            onChange={(cohort) =>
              onChange({
                ...value,
                cohort,
                subject: '',
              })
            }
          />
          <SelectRow
            label="과목"
            placeholder="과목을 선택해주세요"
            options={subjectOptions}
            value={value.subject}
            disabled={!value.course || !value.cohort}
            onChange={(subject) => onChange({ ...value, subject })}
          />
        </div>

        <div className="mt-3 pl-2">
          <p className="text-grey-700 text-sm">현재 선택된 과정은</p>
          <p className="text-grey-700 mt-1 text-sm">
            <span className="text-primary-700 font-semibold">
              {summary || '선택된 항목이 없습니다'}
            </span>
            <span> 입니다.</span>
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer className="bg-white px-10 pb-6">
        <Button
          variant="confirm"
          className="h-10 w-20"
          disabled={!canSubmit}
          onClick={onSubmit}
        >
          조회
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
