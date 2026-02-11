import { useMemo } from 'react'
import { Button, Modal, SelectRow } from '@/components/common'

export type SelectOption = { label: string; value: string }

export type CourseCohortFilterValue = {
  course: string
  cohort: string
}

export type CourseCohortFilterModalProps = {
  open: boolean
  onClose: () => void
  courseOptions: SelectOption[]
  cohortOptions: SelectOption[]
  value: CourseCohortFilterValue
  onChange: (next: CourseCohortFilterValue) => void
  onSubmit: () => void
}

export function CourseCohortFilterModal({
  open,
  onClose,
  courseOptions,
  cohortOptions,
  value,
  onChange,
  onSubmit,
}: CourseCohortFilterModalProps) {
  const courseLabel = useMemo(
    () => courseOptions.find((o) => o.value === value.course)?.label ?? '',
    [courseOptions, value.course]
  )
  const cohortLabel = useMemo(
    () => cohortOptions.find((o) => o.value === value.cohort)?.label ?? '',
    [cohortOptions, value.cohort]
  )

  const canSubmit = Boolean(value.course && value.cohort)

  return (
    <Modal isOpen={open} onClose={onClose} size="filter" showCloseButton>
      <Modal.Header className="border-b-0 px-10 pt-10 pb-2">
        <h2 className="text-grey-900 text-xl font-bold">과정별 필터링</h2>
        <p className="text-grey-600 mt-2 text-[15px]">
          필터를 적용할 과정과 기수를 선택해주세요.
        </p>
      </Modal.Header>

      <Modal.Body className="px-10 pt-6 pb-4">
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
              })
            }
          />
        </div>

        <div className="mt-8">
          <p className="text-grey-800 text-sm">
            <span>현재 선택된 과정은 </span>
            <span className="text-primary-700 font-bold">
              {courseLabel || '(과정)'} {cohortLabel ? `> ${cohortLabel}` : ''}
            </span>
            <span> 입니다.</span>
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer className="flex justify-end border-t-0 px-10 pb-10">
        <Button
          variant="primary"
          className="h-10 w-20 rounded-sm text-sm font-bold"
          disabled={!canSubmit}
          onClick={onSubmit}
        >
          조회
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
