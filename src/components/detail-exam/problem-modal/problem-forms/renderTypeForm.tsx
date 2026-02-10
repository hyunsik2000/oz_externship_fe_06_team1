import {
  FillBlankForm,
  MultipleChoiceForm,
  OXForm,
  OrderingForm,
  ShortAnswerForm,
} from '@/components/detail-exam/problem-modal/problem-forms'
import { useProblemFormStore } from '@/store/problem-form/useProblemFormStore'

export function QuestionTypeForm() {
  const { type } = useProblemFormStore()

  switch (type) {
    case 'SINGLE_CHOICE':
    case 'MULTI_SELECT':
      return <MultipleChoiceForm />
    case 'OX':
      return <OXForm />
    case 'ORDERING':
      return <OrderingForm />
    case 'SHORT_ANSWER':
      return <ShortAnswerForm />
    case 'FILL_IN_BLANK':
      return <FillBlankForm />
    default:
      return (
        <div className="bg-grey-50 text-grey-400 rounded p-10 text-center text-sm">
          준비 중입니다.
        </div>
      )
  }
}
