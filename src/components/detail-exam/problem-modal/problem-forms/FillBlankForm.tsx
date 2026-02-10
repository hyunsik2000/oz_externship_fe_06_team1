import { Input } from '@/components/common/Input'
import { X } from 'lucide-react'
import PlusSquare from '@/assets/icons/plusSquare.svg?react'
import {
  FormSectionLayout,
  PromptInputSection,
} from '@/components/detail-exam/problem-modal/problem-forms/common-sections'
import { useProblemFormStore } from '@/store/problem-form/useProblemFormStore'

export function FillBlankForm() {
  const { correctAnswers, setCorrectAnswers, prompt, setPrompt } =
    useProblemFormStore()

  // fill_blank에서 correctAnswers는 string[] -- store에 정의된 대로
  const answers = (correctAnswers as string[]) || []

  // 핸들러 구현
  const handleAddAnswer = () => {
    setCorrectAnswers([...answers, ''])
  }

  const handleRemoveAnswer = (index: number) => {
    setCorrectAnswers(answers.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-8">
      {/* 지문 입력 섹션 */}
      <PromptInputSection value={prompt} onChange={setPrompt} />

      {/* 빈칸 답안 등록 */}
      <FormSectionLayout
        title="빈칸 답안 등록"
        description={['지문에 등록한 빈칸의 개수 만큼 답안을 등록해주세요.']}
        extra={
          <button
            onClick={() => handleAddAnswer()}
            className="text-primary-700 flex cursor-pointer items-center gap-1 text-[11px]"
          >
            <PlusSquare className="h-[13px] w-[13px]" />
            추가하기
          </button>
        }
      >
        {answers.map((answer, index) => (
          <div key={`blank-${index}`} className="flex items-center gap-2">
            <span className="text-grey-600 text-sm">
              ({String.fromCharCode(65 + index)})
            </span>
            <div className="flex-1">
              <Input
                id={`correctAnswers-${index}`}
                className="h-[30px]"
                value={answer}
                onChange={(e) => {
                  const newAnswers = [...answers]
                  newAnswers[index] = e.target.value
                  setCorrectAnswers(newAnswers)
                }}
                placeholder="정답을 입력하세요"
              />
            </div>
            {/* 삭제 버튼 */}
            <button
              onClick={() => handleRemoveAnswer(index)}
              className="text-grey-600 hover:text-error-400 cursor-pointer transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </FormSectionLayout>
    </div>
  )
}
