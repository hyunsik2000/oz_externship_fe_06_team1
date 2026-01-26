import { Input } from '@/components/common/Input'
import { X } from 'lucide-react'
import PlusSquare from '@/assets/icons/plusSquare.svg?react'
import { FormSectionLayout } from './CommonSections'
import { Dropdown } from '@/components/common/Dropdown'

export interface OrderingFormProps {
  options: string[]
  setOptions: (options: string[]) => void
  correctAnswers: number[]
  setCorrectAnswers: (answers: number[]) => void
  handleRemoveOption: (index: number) => void
  handleAddOption: () => void
}

export const OrderingForm = ({
  options,
  setOptions,
  correctAnswers,
  setCorrectAnswers,
  handleRemoveOption,
  handleAddOption,
}: OrderingFormProps) => {
  // 보기 개수에 맞춰 기본값(0, 1, 2...) 생성
  const currentOrders =
    correctAnswers.length === options.length
      ? correctAnswers
      : options.map((_, i) => i)

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
          const assignedRank = currentOrders[index] ?? index

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
                  const newOrders = [...currentOrders]
                  const switchIndex = newOrders.findIndex(
                    (rank) => rank === targetRank
                  )
                  if (switchIndex !== -1) {
                    newOrders[switchIndex] = assignedRank
                  }
                  newOrders[index] = targetRank

                  setCorrectAnswers(newOrders)
                }}
                className="w-[60px] [&_button]:!h-[30px] [&_button]:!w-[50px] [&_button]:!text-sm"
              />

              {/* 삭제 버튼 */}
              <button
                onClick={() => handleRemoveOption(index)}
                className="text-grey-400 cursor-pointer outline-none"
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
