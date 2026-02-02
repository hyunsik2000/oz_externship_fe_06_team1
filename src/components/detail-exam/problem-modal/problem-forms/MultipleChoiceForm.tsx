import { Input } from '@/components/common'
import { X, Check } from 'lucide-react'
import PlusSquare from '@/assets/icons/plusSquare.svg?react'
import { FormSectionLayout } from '@/components/detail-exam/problem-modal/problem-forms/common-sections'
import { useProblemFormStore } from '@/store/problem-form/useProblemFormStore'

export function MultipleChoiceForm() {
  const { options, setOptions, correctAnswers, setCorrectAnswers } =
    useProblemFormStore()

  // correctAnswers는 number[] 타입으로 가정
  const currentCorrectAnswers = (correctAnswers as number[]) || []

  const toggleAnswer = (index: number) => {
    setCorrectAnswers(
      currentCorrectAnswers.includes(index)
        ? currentCorrectAnswers.filter((i) => i !== index)
        : [...currentCorrectAnswers, index]
    )
  }

  const handleRemoveOption = (index: number) => {
    // 보기 삭제 시, 보기 목록과 정답 인덱스 모두 업데이트 필요
    setOptions(options.filter((_, i) => i !== index))
    setCorrectAnswers(
      currentCorrectAnswers
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i))
    )
  }

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, ''])
    }
  }

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
        const isCorrect = currentCorrectAnswers.includes(index)
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
