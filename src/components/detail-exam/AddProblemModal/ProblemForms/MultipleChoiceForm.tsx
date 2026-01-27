import { Input } from '@/components/common/Input'
import { X, Check } from 'lucide-react'
import PlusSquare from '@/assets/icons/plusSquare.svg?react'
import { FormSectionLayout } from './CommonSections'

export interface MultipleChoiceFormProps {
  options: string[]
  setOptions: (options: string[]) => void
  correctAnswers: number[]
  toggleAnswer: (index: number) => void
  handleRemoveOption: (index: number) => void
  handleAddOption: () => void
}

export const MultipleChoiceForm = ({
  options,
  setOptions,
  correctAnswers,
  toggleAnswer,
  handleRemoveOption,
  handleAddOption,
}: MultipleChoiceFormProps) => {
  return (
    <FormSectionLayout
      title="문제 보기 등록"
      description={[
        '다지선다형 문제 유형은 최대 5개까지 보기를 등록할 수 있습니다.',
        '정답 보기는 체크박스를 체크하여 등록해주세요.',
      ]}
      additionalDescription="최소 1개 이상의 정답을 체크해야합니다."
      extra={
        <button
          onClick={handleAddOption}
          className="text-primary-700 flex cursor-pointer items-center gap-1 text-[11px]"
        >
          <PlusSquare className="h-[13px] w-[13px]" />
          추가하기
        </button>
      }
    >
      {options.map((option, index) => {
        const isCorrect = correctAnswers.includes(index)
        return (
          <div key={`choice-${index}`} className="flex items-center gap-3">
            <span className="text-grey-600 text-xs">{index + 1}.</span>
            <Input
              className="h-[30px] flex-1"
              value={option}
              onChange={(e) => {
                const newOps = [...options]
                newOps[index] = e.target.value
                setOptions(newOps)
              }}
              placeholder="보기 내용을 입력하세요"
            />
            {/* 정답 체크 */}
            <button
              type="button"
              onClick={() => toggleAnswer(index)}
              className="cursor-pointer"
            >
              {isCorrect ? (
                <div className="bg-primary-700 flex h-4 w-4 items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              ) : (
                <div className="border-grey-300 h-4 w-4 border bg-white" />
              )}
            </button>
            {/* 삭제 버튼 */}
            <button
              onClick={() => handleRemoveOption(index)}
              className="text-grey-600 hover:text-error-400 cursor-pointer transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        )
      })}
    </FormSectionLayout>
  )
}
