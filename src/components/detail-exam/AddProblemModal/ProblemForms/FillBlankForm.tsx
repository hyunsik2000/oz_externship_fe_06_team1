import { Input } from '@/components/common/Input'
import { X } from 'lucide-react'
import PlusSquare from '@/assets/icons/plusSquare.svg?react'
import { FormSectionLayout } from './CommonSections'

export interface FillBlankFormProps {
  answers: string[]
  setAnswers: (answers: string[]) => void
  handleRemoveAnswer: (index: number) => void
  handleAddAnswer: () => void
}

export const FillBlankForm = ({
  answers,
  setAnswers,
  handleRemoveAnswer,
  handleAddAnswer,
}: FillBlankFormProps) => {
  return (
    <div className="flex flex-col gap-8">
      <FormSectionLayout
        title="지문 등록"
        description={['빈칸을 포함한 지문을 작성해주세요']}
      >
        <div className="flex flex-col gap-2">
          {answers.map((answer, index) => (
            <div key={`blank-${index}`} className="flex items-center gap-4">
              <textarea
                className="border-grey-300 text-grey-600 placeholder:text-grey-600 focus:border-primary-500 h-[70px] w-full resize-none border p-2 text-sm font-normal outline-none"
                value={answer}
                onChange={(e) => {
                  const newAnswers = [...answers]
                  newAnswers[index] = e.target.value
                  setAnswers(newAnswers)
                }}
                placeholder="문제를 입력해주세요"
              />
              {/* 삭제 버튼 */}
              <button
                onClick={() => handleRemoveAnswer(index)}
                className="text-grey-400 hover:text-error-500 cursor-pointer transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </FormSectionLayout>
      {/* 빈칸 답안 등록 */}
      <FormSectionLayout
        title="빈칸 답안 등록"
        description={['지문에 등록한 빈칸의 개수 만큼 답안을 등록해주세요.']}
        additionalDescription="정답은 최소 1개 이상 입력해야 합니다."
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
          <div key={`${answer}-${index}`} className="flex items-center gap-2">
            <span className="text-grey-600 text-[12px]">
              ({String.fromCharCode(65 + index)})
            </span>
            <Input
              className="border-grey-300 focus:border-primary-500 h-[30px] flex-1"
              value={answer}
              onChange={(e) => {
                const newAnswers = [...answers]
                newAnswers[index] = e.target.value
                setAnswers(newAnswers)
              }}
              placeholder="정답을 입력하세요"
            />
            {/* 삭제 버튼 */}
            <button
              onClick={() => handleRemoveAnswer(index)}
              className="text-grey-400 hover:text-error-500 cursor-pointer transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </FormSectionLayout>
    </div>
  )
}
