import { useState, useEffect } from 'react'
import { Modal, Button, Input, Dropdown, AlertModal } from '@/components/common'
import {
  getTodayDate,
  getNearest30MinTime,
  // formatCorrectTime,
} from '@/utils'
import { TIME_OPTIONS } from '@/constants/time-options'
import { DeployRow } from '@/components/table/data-table/deploy-modal/DeployRow'

interface ExamDeployModalProps {
  isOpen: boolean
  onClose: () => void
  initialData: {
    id: number
    title: string
    subject_name: string
  }
}

export default function ExamDeploymentModal({
  isOpen,
  onClose,
  initialData,
}: ExamDeployModalProps) {
  const [formData, setFormData] = useState({
    course: '',
    cohort: '',
    duration: '60',
    startDate: getTodayDate(),
    startTime: getNearest30MinTime(),
    endDate: getTodayDate(),
    endTime: getNearest30MinTime(),
  })

  const [isWarningOpen, setIsWarningOpen] = useState(false)

  // 모달 열릴 때 초기화
  useEffect(() => {
    if (isOpen) {
      setFormData({
        course: '',
        cohort: '',
        duration: '60',
        startDate: getTodayDate(),
        startTime: getNearest30MinTime(),
        endDate: getTodayDate(),
        endTime: getNearest30MinTime(),
      })
    }
  }, [isOpen])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    const { course, cohort, duration, startDate, startTime, endDate, endTime } =
      formData

    if (
      !course ||
      !cohort ||
      !duration ||
      !startDate ||
      !startTime ||
      !endDate ||
      !endTime
    ) {
      setIsWarningOpen(true)
      return
    }

    // const cohortId = parseInt(cohort.replace(/[^0-9]/g, ''), 10)
    // const requestBody = {
    //   exam_id: initialData.id,
    //   cohort_id: cohortId,
    //   duration_time: parseInt(duration, 10),
    //   open_at: formatCorrectTime(startDate, startTime),
    //   close_at: formatCorrectTime(endDate, endTime),
    // }

    // console.log(requestBody)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton
      size="ml"
      className="!overflow-visible"
    >
      <div className="flex h-full w-full flex-col gap-8 !overflow-visible p-8">
        <Modal.Header className="border-none p-0">
          <span className="text-grey-800 text-lg font-semibold">
            쪽지시험 배포
          </span>
          <div className="text-grey-600 mt-2 flex flex-col text-sm font-normal">
            <p>시험명 : {initialData.title ?? '-'}</p>
            <p>과목명 : {initialData.subject_name ?? '-'}</p>
          </div>
        </Modal.Header>

        <Modal.Body className="!overflow-visible p-0">
          <div className="border-grey-300 flex flex-col border-t">
            <DeployRow label="과정">
              <Dropdown
                value={formData.course}
                onChange={(val) => handleChange('course', val)}
                placeholder="과정을 선택해주세요"
                options={[
                  { value: 'frontend', label: '프론트엔드 부트캠프' },
                  { value: 'backend', label: '백엔드 부트캠프' },
                ]}
                className="text-grey-600 w-3/5 [&_button]:!h-9"
              />
            </DeployRow>

            <DeployRow label="기수">
              <Dropdown
                value={formData.cohort}
                onChange={(val) => handleChange('cohort', val)}
                placeholder="기수 선택"
                options={[
                  { value: '12기', label: '12기' },
                  { value: '13기', label: '13기' },
                  { value: '14기', label: '14기' },
                  { value: '15기', label: '15기' },
                  { value: '16기', label: '16기' },
                  { value: '17기', label: '17기' },
                  { value: '18기', label: '18기' },
                ]}
                className="text-grey-600 w-[120px] [&_button]:!h-9"
              />
            </DeployRow>

            <DeployRow label="시험 시간">
              <div className="flex items-center gap-2">
                <Input
                  value={formData.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                  className="h-9 w-[100px]"
                />
                <span className="text-grey-600 text-sm">분</span>
              </div>
            </DeployRow>

            <DeployRow label="시작 일시">
              <div className="flex items-center gap-3">
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  className="h-9 w-[180px] cursor-pointer"
                  onClick={(e) => e.currentTarget.showPicker?.()}
                />
                <Dropdown
                  value={formData.startTime}
                  onChange={(val) => handleChange('startTime', val)}
                  options={TIME_OPTIONS}
                  className="text-grey-600 w-[150px] [&_button]:!h-9"
                />
              </div>
            </DeployRow>

            <DeployRow label="종료 일시">
              <div className="flex items-center gap-3">
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  className="h-9 w-[180px] cursor-pointer"
                  onClick={(e) => e.currentTarget.showPicker?.()}
                />
                <Dropdown
                  value={formData.endTime}
                  onChange={(val) => handleChange('endTime', val)}
                  options={TIME_OPTIONS}
                  className="text-grey-600 w-[150px] [&_button]:!h-9"
                />
              </div>
            </DeployRow>
          </div>
        </Modal.Body>

        <Modal.Footer className="bg-white p-0">
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="w-[80px] rounded-sm text-sm font-normal"
          >
            생성
          </Button>
        </Modal.Footer>
      </div>

      <AlertModal
        isOpen={isWarningOpen}
        onClose={() => setIsWarningOpen(false)}
        title="모든 항목을 입력해 주세요."
        description="배포 정보를 빠짐없이 입력해야 시험 생성이 가능합니다."
        type="warning"
        confirmText="확인"
        onConfirm={() => setIsWarningOpen(false)}
      />
    </Modal>
  )
}
