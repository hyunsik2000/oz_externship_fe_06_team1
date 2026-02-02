import { useEffect } from 'react'
import { Modal, Button } from '@/components/common'
import type { QuestionType, Question } from '@/types/question'
import { cn } from '@/lib/cn'
import { QuestionTypeForm } from '@/components/detail-exam/problem-modal/problem-forms'
import {
  QuestionInputSection,
  PointSection,
  ExplanationSection,
} from '@/components/detail-exam/problem-modal/problem-forms/common-sections'

import { QUESTION_TYPES } from '@/constants/Question/question-types'
import { useProblemFormStore } from '@/store/problem-form/useProblemFormStore'

interface ProblemModalProps {
  isOpen: boolean
  onClose: () => void
  mode?: 'create' | 'edit' // '추가' | '수정' 중 하나
  initialData?: Question // 수정 시 사용할 초기 데이터
}

export default function ProblemModal({
  isOpen,
  onClose,
  mode = 'create',
  initialData,
}: ProblemModalProps) {
  // Store에서 상태와 초기화 함수 가져오기
  const {
    reset,
    initializeForEdit,
    // 공통 필드는 ProblemModal에서 관리
    type,
    setType,
    question,
    setQuestion,
    point,
    setPoint,
    explanation,
    setExplanation,
  } = useProblemFormStore()

  // 모달 열릴 때 수정인지 추가인지에 따라 초기화 로직 수행
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        initializeForEdit(initialData)
      } else {
        reset()
        useProblemFormStore.getState().setMode(mode)
      }
    }
  }, [isOpen, mode, initialData, reset, initializeForEdit])

  // 제출 로직에서 store 데이터를 조합하여 requestBody 생성
  // const handleSubmit = () => {
  //    const requestBody = useProblemFormStore.getState().toRequestBody()
  //    console.log('Submission Data:', requestBody)
  //    // TODO: API 호출 (create or put)
  //    onClose()
  // }

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton size="ml">
      <div className="flex h-[90vh]">
        {/* 왼쪽 섹션: 탭 메뉴 */}
        <Modal.Header className="border-grey-300 h-full w-[220px] border-r px-0">
          <div className="px-5 pb-5">
            <p className="pb-1 text-lg font-semibold">
              {mode === 'edit' ? '문제 수정하기' : '문제 추가하기'}
            </p>
            <p className="text-grey-600 text-[10px] font-normal">
              문제 유형을 선택하여 문제를 {mode === 'edit' ? '수정' : '등록'}
              해주세요.
            </p>
          </div>
          <nav className="flex flex-col">
            {QUESTION_TYPES.map((qType) => {
              const isSelected = type === qType.value
              return (
                <button
                  key={qType.value}
                  onClick={() => setType(qType.value as QuestionType)}
                  className={cn(
                    'mb-2 flex cursor-pointer items-center gap-3 px-8 py-2',
                    isSelected
                      ? 'bg-primary-50 text-primary-600 border-primary-600 font-bold'
                      : 'text-grey-500 hover:bg-grey-50 border-transparent'
                  )}
                >
                  <span
                    className={cn(
                      'h-[3px] w-[3px] rounded-full font-normal',
                      isSelected ? 'bg-primary-700' : 'bg-grey-600'
                    )}
                  />
                  <span
                    className={cn(
                      'text-sm font-normal',
                      isSelected ? 'text-primary-700' : 'text-grey-600'
                    )}
                  >
                    {qType.label}
                  </span>
                </button>
              )
            })}
          </nav>
        </Modal.Header>

        {/* 오른쪽 섹션: 폼 입력 영역 */}
        <div className="flex w-[540px] flex-col text-left">
          <Modal.Body className="scrollbar-hide flex flex-1 flex-col gap-10 overflow-y-auto px-5 py-15">
            {/* 공통 1: 문제 입력 */}
            <QuestionInputSection value={question} onChange={setQuestion} />

            {/* 유형별 : 보기 등록 */}
            <QuestionTypeForm />

            {/* 공통 2: 배점 선택 */}
            <PointSection value={point} onChange={setPoint} />

            {/* 공통 3: 해설 등록 */}
            <ExplanationSection value={explanation} onChange={setExplanation} />
          </Modal.Body>

          {/* 푸터: 등록 버튼 */}
          <div className="flex justify-end pt-4 pr-8 pb-8">
            <Button
              variant="primary"
              className="flex h-[36px] w-[55px] rounded-sm font-normal"
              // onClick={handleSubmit}
            >
              {mode === 'edit' ? '수정' : '추가'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
