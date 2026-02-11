import type { QuestionsList } from '@/types/question'
import { SolveQuestionList } from '@/components/exam-attempt/solution-view'
import TSBadgeIcon from '@/assets/icons/ts.svg?react'

type SolveViewContainerProps = {
  data: QuestionsList
  pickedAnswerByQuestionId?: Record<number, string | string[]>
}

export function SolveViewContainer({
  data,
  pickedAnswerByQuestionId,
}: SolveViewContainerProps) {
  return (
    <div className="flex h-full w-full flex-col pt-2">
      <div className="flex h-12 items-center gap-3">
        <TSBadgeIcon className="h-8 w-8" />

        <div className="flex items-center gap-5">
          <div className="text-grey-600 text-lg font-semibold">
            {data.title}
          </div>
          <div className="text-grey-600 text-sm">
            <span>과목 : {data.subject.title}</span>
            <span className="ml-3">문제 수 : {data.questions.length}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <SolveQuestionList
          questions={data.questions}
          pickedAnswerByQuestionId={pickedAnswerByQuestionId}
        />
      </div>
    </div>
  )
}
