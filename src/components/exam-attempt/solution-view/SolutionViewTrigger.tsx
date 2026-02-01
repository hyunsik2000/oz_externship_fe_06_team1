import { useState } from 'react'
import type { QuestionListResponse } from '@/types/question'
import {
  SolutionViewButton,
  SolutionViewModal,
} from '@/components/exam-attempt'

type SolutionViewTriggerProps = {
  data?: QuestionListResponse | null
  pickedAnswerByQuestionId?: Record<number, string>
  className?: string
}

export function SolutionViewTrigger({
  data = null,
  pickedAnswerByQuestionId,
  className,
}: SolutionViewTriggerProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <SolutionViewButton onClick={() => setOpen(true)} className={className} />
      <SolutionViewModal
        isOpen={open}
        onClose={() => setOpen(false)}
        data={data}
        pickedAnswerByQuestionId={pickedAnswerByQuestionId}
      />
    </>
  )
}
