import { useState, useEffect } from 'react'
import { useAxios } from '@/hooks'
import { useAlertStore, useToastStore } from '@/store'
import { Modal, Button, Input, Dropdown, AlertModal } from '@/components/common'
import { getTodayDate } from '@/utils'
import { TIME_OPTIONS } from '@/constants/time-options'
import { API_PATHS } from '@/constants/api'
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
  const { sendRequest } = useAxios()
  const { showAlert } = useAlertStore()
  const { showToast } = useToastStore()
  const [cohortOptions, setCohortOptions] = useState<
    { label: string; value: string }[]
  >([])

  const [formData, setFormData] = useState({
    course: '',
    cohort: '',
    duration: '60',
    startDate: getTodayDate(),
    startTime: '',
    endDate: getTodayDate(),
    endTime: '',
  })

  const [isWarningOpen, setIsWarningOpen] = useState(false)

  // 과정 변경 시 기수 목록 조회
  useEffect(() => {
    const fetchCohorts = async () => {
      if (!formData.course) {
        setCohortOptions([])
        return
      }
      try {
        const response = await sendRequest<
          { id: number; number: number; course_id: number }[]
        >({
          method: 'GET',
          url: API_PATHS.COHORT.LIST(formData.course),
        })
        if (response) {
          setCohortOptions(
            response.map((item) => ({
              label: `${item.number}기`,
              value: formData.course,
            }))
          )
        }
      } catch {
        // 에러 모달 처리
      }
    }
    fetchCohorts()
  }, [formData.course, sendRequest])

  // 모달 열릴 때 초기화
  useEffect(() => {
    if (isOpen) {
      setFormData({
        course: '',
        cohort: '',
        duration: '60',
        startDate: getTodayDate(),
        startTime: '',
        endDate: getTodayDate(),
        endTime: '',
      })
    }
  }, [isOpen])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      if (field === 'course') {
        return { ...prev, [field]: value, cohort: '' }
      }
      return { ...prev, [field]: value }
    })
  }

  const handleSubmit = async () => {
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

    if (startDate === endDate && startTime === endTime) {
      showAlert({
        type: 'warning',
        title: '시간 설정 오류',
        description: '시작 시간과 종료 시간은 같을 수 없습니다.',
      })
      return
    }

    const requestBody = {
      exam_id: initialData.id,
      cohort_id: Number(cohort),
      duration_time: Number(duration),
      open_at: `${startDate} ${startTime}:00`,
      close_at: `${endDate} ${endTime}:00`,
    }

    const response = await sendRequest(
      {
        method: 'POST',
        url: API_PATHS.DEPLOYMENT.CREATE,
        data: requestBody,
      },
      {
        onError: (error) => {
          if (error.status === 404) {
            showAlert({
              type: 'warning',
              title: '시험 배포 실패',
              description: '해당 과정의 기수를 찾을 수 없습니다.',
            })
          } else if (error.status === 409) {
            showAlert({
              type: 'warning',
              title: '시험 배포 실패',
              description: '해당 기수의 시험을 이미 배포했습니다.',
            })
          }
          return true
        },
      }
    )
    if (response) {
      showToast({
        message: '시험이 성공적으로 배포되었습니다.',
        variant: 'success',
      })
      onClose()
    }
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
                  { value: '1', label: '초격차 백엔드 부트캠프' },
                  { value: '2', label: '초격차 프론트엔드 부트캠프' },
                  { value: '3', label: '풀스택 개발자 과정' },
                ]}
                className="text-grey-600 w-3/5 [&_button]:!h-9"
              />
            </DeployRow>

            <DeployRow label="기수">
              <Dropdown
                value={formData.cohort}
                onChange={(val) => handleChange('cohort', val)}
                placeholder="기수 선택"
                options={cohortOptions}
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
                  placeholder="시간 선택"
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
                  placeholder="시간 선택"
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
