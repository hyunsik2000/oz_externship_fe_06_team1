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
    case 'multiple_choice':
      return <MultipleChoiceForm />
    case 'ox':
      return <OXForm />
    case 'ordering':
      return <OrderingForm />
    case 'short_answer':
      return <ShortAnswerForm />
    case 'fill_blank':
      return <FillBlankForm />
    default:
      return (
        <div className="bg-grey-50 text-grey-400 rounded p-10 text-center text-sm">
          준비 중입니다.
        </div>
      )
  }
}
