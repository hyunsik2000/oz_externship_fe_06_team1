import { Input } from '@/components/common/Input'
import { X } from 'lucide-react'
import PlusSquare from '@/assets/icons/plusSquare.svg?react'
import { FormSectionLayout } from './common-sections'
import { Dropdown } from '@/components/common/Dropdown'
import { useProblemFormStore } from '@/store/ProblemForm/useProblemFormStore'

export function OrderingForm() {
  const { options, setOptions, correctAnswers, setCorrectAnswers } =
    useProblemFormStore()

  // ordering: correctAnswers는 number[] (순서 인덱스 배열)
  const currentOrders = (correctAnswers as number[]) || []

  // 보기 개수에 맞춰 기본값(0, 1, 2...) 생성 (currentOrders가 비어있거나 싱크가 안 맞을 경우 대비)
  const displayOrders =
    currentOrders.length === options.length
      ? currentOrders
      : options.map((_, i) => i)

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
    const newLength = options.length - 1
    setCorrectAnswers(Array.from({ length: newLength }, (_, i) => i))
  }

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, ''])
      // 옵션 추가 시 순서 배열도 갱신
      setCorrectAnswers([...displayOrders, options.length])
    }
  }

  return (
    <FormSectionLayout
      title="순서 보기 등록"
      description={[
        '다지선다형 순서 정렬 문제 유형은 최대 5개까지 보기를 등록할 수 있습니다.',
        '우측 드롭다운을 사용하여 순서를 정렬해주세요.',
      ]}
      additionalDescription="보기는 최소 2개 이상 등록해야합니다."
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
      <div className="flex flex-col gap-2">
        {options.map((option, index) => {
          const assignedRank = displayOrders[index] ?? index

          return (
            <div
              key={`ordering-${index}`}
              className="flex items-center gap-3 text-sm"
            >
              {/* 보기 등록 */}
              <span className="text-grey-600 w-6">
                ({String.fromCharCode(65 + index)})
              </span>
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

              {/* 순서 선택 Dropdown*/}
              <Dropdown
                options={options.map((_, i) => ({
                  label: String(i + 1),
                  value: String(i + 1),
                }))}
                value={String(assignedRank + 1)}
                onChange={(value) => {
                  const targetRank = Number(value) - 1
                  const newOrders = [...displayOrders]

                  // targetRank를 이미 가지고 있는 아이템을 찾아서 교환 (Swap)
                  const switchIndex = newOrders.findIndex(
                    (rank) => rank === targetRank
                  )

                  if (switchIndex !== -1) {
                    newOrders[switchIndex] = assignedRank
                  }
                  newOrders[index] = targetRank

                  setCorrectAnswers(newOrders)
                }}
                placeholder="1"
                className="w-[60px] [&_button]:!h-[30px] [&_button]:!w-[50px] [&_button]:!text-sm"
              />

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
      </div>
    </FormSectionLayout>
  )
}
