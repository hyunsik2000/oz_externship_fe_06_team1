import { FormSectionLayout } from './common-sections'
import { useProblemFormStore } from '@/store/ProblemForm/useProblemFormStore'

export function ShortAnswerForm() {
  const { correctAnswers, setCorrectAnswers } = useProblemFormStore()
  const answerText = (correctAnswers as string) || ''

  return (
    <FormSectionLayout
      title="답안 입력"
      additionalDescription="필수 입력값입니다."
      noContainer
    >
      <textarea
        className="border-grey-300 text-grey-600 placeholder:text-grey-600 focus:border-primary-500 h-[70px] w-full resize-none border p-2 text-sm font-normal transition-colors outline-none"
        value={answerText}
        onChange={(e) => setCorrectAnswers(e.target.value)}
        placeholder="답안을 입력해주세요"
      />
    </FormSectionLayout>
  )
}
