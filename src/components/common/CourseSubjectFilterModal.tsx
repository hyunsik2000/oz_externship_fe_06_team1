// src/components/common/CourseSubjectFilterModal.tsx
import { useEffect, useMemo, useRef, useState } from 'react'
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
    <div className="grid grid-cols-[52px_1fr] items-center gap-4">
      <span className="text-sm font-semibold text-gray-700">{label}</span>

      <div ref={wrapRef} className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            if (disabled) return
            setIsOpen((prev) => !prev)
          }}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm',
            disabled
              ? 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400'
              : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300'
          )}
        >
          <span className={cn('truncate', !selected && 'text-gray-400')}>
            {selected?.label ?? placeholder}
          </span>

          {/* caret */}
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
          <div className="absolute top-[44px] left-0 z-10 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-md">
            {options.length === 0 ? (
              <div className="px-3 py-2.5 text-sm text-gray-400">
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
                          'flex w-full items-center justify-between px-3 py-2 text-left text-sm',
                          isSelected
                            ? 'bg-gray-50 font-semibold text-gray-900'
                            : 'text-gray-700 hover:bg-gray-50'
                        )}
                        onClick={() => {
                          onChange(opt.value)
                          setIsOpen(false)
                        }}
                      >
                        <span className="truncate">{opt.label}</span>
                        {isSelected && (
                          <span className="text-primary-600">
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
  const panelRef = useRef<HTMLDivElement | null>(null)

  // 바깥 클릭 닫기
  useOutsideClick(panelRef, onClose, open)

  // ESC 닫기
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

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div
        ref={panelRef}
        className="w-full max-w-[560px] rounded-xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
        role="dialog"
        aria-modal="true"
      >
        {/* header */}
        <div className="flex items-start justify-between px-8 pt-7">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              과정-과목별 필터링
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              필터를 적용할 과정-기수와 과목을 선택해주세요.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md hover:bg-gray-100"
            aria-label="닫기"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* body */}
        <div className="px-8 pt-6 pb-7">
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

          {/* summary */}
          <div className="mt-6">
            <p className="text-sm text-gray-700">현재 선택된 과정은</p>
            <p className="mt-1 text-sm text-gray-700">
              <span className="text-primary-700 font-semibold">
                {summary || '선택된 항목이 없습니다'}
              </span>
              <span> 입니다.</span>
            </p>
          </div>

          {/* actions */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              disabled={!canSubmit}
              onClick={onSubmit}
              className={cn(
                'h-10 rounded-md px-5 text-sm font-semibold text-white',
                'bg-primary-700 hover:bg-primary-800',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            >
              조회
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
