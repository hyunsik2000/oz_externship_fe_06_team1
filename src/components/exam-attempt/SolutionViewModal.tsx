import { Modal } from '@/components/common'
import type { QuestionListResponse } from '@/types/question'
import {
  SolveViewLayout,
  SolveViewContainer,
} from '@/components/exam-attempt/solution-view'

type SolutionViewModalProps = {
  isOpen: boolean
  onClose: () => void
  data: QuestionListResponse
  pickedAnswerByQuestionId?: Record<number, string>
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
          <SolveViewContainer
            data={data}
            pickedAnswerByQuestionId={pickedAnswerByQuestionId}
          />
        </SolveViewLayout>
      </Modal.Body>
    </Modal>
  )
}
