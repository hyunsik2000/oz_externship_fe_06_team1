import { Modal } from '@/components/common'
import type { QuestionListResponse } from '@/types/question'
import {
  SolveViewLayout,
  SolveViewContainer,
} from '@/components/exam-attempt/solution-view'

type SolutionViewModalProps = {
  isOpen: boolean
  onClose: () => void
  data?: QuestionListResponse | null
  pickedAnswerByQuestionId?: Record<number, string | string[]>
}

export function SolutionViewModal({
  isOpen,
  onClose,
  data,
  pickedAnswerByQuestionId,
}: SolutionViewModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="solution" showCloseButton>
      <Modal.Body className="p-0">
        <SolveViewLayout>
          {data ? (
            <SolveViewContainer
              data={data}
              pickedAnswerByQuestionId={pickedAnswerByQuestionId}
            />
          ) : (
            <div className="text-grey=500 flex h-full w-full items-center justify-center">
              풀이 데이터를 불러오는 중...
            </div>
          )}
        </SolveViewLayout>
      </Modal.Body>
    </Modal>
  )
}
