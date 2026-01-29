import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { cn } from '@/lib/cn'

type Option = { label: string; value: string }

type FilterValue = {
  course: string
  cohort: string
  subject: string
}

type Props = {
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
  const [isOpen, setIsOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useOutsideClick(wrapRef, () => setIsOpen(false), isOpen)

  const selected = options.find((o) => o.value === value)

  return (
    <div className="grid grid-cols-[56px_1fr] items-center gap-4">
      <span className="text-grey-700 text-sm font-semibold">{label}</span>

      <div ref={wrapRef} className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            if (disabled) return
            setIsOpen((prev) => !prev)
          }}
          className={cn(
            'flex h-11 w-full items-center justify-between rounded-md border px-4 text-sm',
            disabled
              ? 'border-grey-200 bg-grey-50 text-grey-400 cursor-not-allowed'
              : 'border-grey-200 text-grey-700 hover:border-grey-300 bg-white'
          )}
        >
          <span className={cn('truncate', !selected && 'text-grey-400')}>
            {selected?.label ?? placeholder}
          </span>

          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M5 7l5 6 5-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className={cn(disabled ? 'opacity-40' : 'opacity-60')}
            />
          </svg>
        </button>

        {isOpen && (
          <div className="border-grey-200 absolute top-[46px] left-0 z-[110] w-full overflow-hidden rounded-md border bg-white shadow-md">
            {options.length === 0 ? (
              <div className="text-grey-400 px-4 py-3 text-sm">
                선택 가능한 항목이 없습니다.
              </div>
            ) : (
              <ul className="max-h-56 overflow-auto py-1">
                {options.map((opt) => {
                  const isSelected = opt.value === value
                  return (
                    <li key={opt.value}>
                      <button
                        type="button"
                        className={cn(
                          'flex w-full items-center justify-between px-4 py-2 text-left text-sm',
                          isSelected
                            ? 'bg-grey-50 text-grey-800 font-semibold'
                            : 'text-grey-700 hover:bg-grey-50'
                        )}
                        onClick={() => {
                          onChange(opt.value)
                          setIsOpen(false)
                        }}
                      >
                        <span className="truncate">{opt.label}</span>
                        {isSelected && (
                          <span className="text-primary-700">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                d="M16 6l-7.5 8L4 10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )}
      </div>
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
    <Modal isOpen={open} onClose={onClose} showCloseButton>
      <Modal.Header className="border-grey-100">
        과정-과목별 필터링
      </Modal.Header>

      <Modal.Body className="px-10 pt-8 pb-6">
        <p className="text-grey-500 mt-1 text-sm">
          필터를 적용할 과정-기수와 과목을 선택해주세요.
        </p>
        <div className="space-y-4">
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

        <div className="mt-8">
          <p className="text-grey-700 text-sm">현재 선택된 과정은</p>
          <p className="text-grey-700 mt-1 text-sm">
            <span className="text-primary-700 font-semibold">
              {summary || '선택된 항목이 없습니다'}
            </span>
            <span> 입니다.</span>
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer className="bg-white px-10 pb-9">
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
