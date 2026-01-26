import { cn } from '@/lib/cn'
import { FormSectionLayout } from './CommonSections'

export interface OXFormProps {
  correctAnswer: string // 'O' 또는 'X'
  setCorrectAnswer: (answer: string) => void
}

export const OXForm = ({ correctAnswer, setCorrectAnswer }: OXFormProps) => {
  return (
    <FormSectionLayout
      title="정답 등록"
      description={['정답 보기는 체크박스를 체크하여 등록해주세요.']}
      additionalDescription="최소 1개 이상의 정답을 체크해야합니다."
    >
      <div className="flex flex-col gap-2">
        {['O', 'X'].map((val, index) => {
          const isSelected = correctAnswer === val
          return (
            <div key={val} className="flex items-center gap-3 text-xs">
              <span className="text-grey-600 font-medium">{index + 1}.</span>
              <button
                key={val}
                type="button"
                onClick={() => setCorrectAnswer(val)}
                className={cn(
                  'flex flex-1 cursor-pointer items-center justify-start rounded border px-2 py-1',
                  isSelected
                    ? 'border-primary-700 text-primary-700 ring-0.5 ring-primary-700 bg-white'
                    : 'border-grey-300 text-grey-600 bg-white'
                )}
              >
                {val}
              </button>
            </div>
          )
        })}
      </div>
    </FormSectionLayout>
  )
}
