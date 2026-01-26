import type { QuestionType } from '@/types/question'
import { Input } from '@/components/common/Input'
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

interface ProblemOptionProps {
  type: QuestionType
  options?: string[]
  answer?: string | string[]
}

export default function ProblemOption({
  type,
  options,
  answer,
}: ProblemOptionProps) {
  const renderOptions = () => {
    switch (type) {
      case 'multiple_choice':
        return (
          <div className="flex flex-col gap-11">
            {(options || []).map((option, i) => {
              const alphabet = String.fromCharCode(65 + i)
              const isCorrect = Array.isArray(answer)
                ? answer.includes(option)
                : answer === option

              return (
                <div
                  key={'multiple_choice' + i}
                  className="flex cursor-pointer items-center gap-4 rounded-lg font-semibold"
                >
                  <span
                    className={cn(
                      'text-grey-600 flex h-6 w-6 items-center justify-center rounded-full bg-[#ECECEC]',
                      isCorrect && 'bg-primary-700 text-white'
                    )}
                  >
                    {isCorrect ? <Check size={16} /> : alphabet}
                  </span>
                  <span
                    className={cn(isCorrect && 'text-primary-700 font-bold')}
                  >
                    {option}
                  </span>
                </div>
              )
            })}
          </div>
        )
      case 'true_false':
        return (
          <div className="flex flex-col gap-11">
            {['O', 'X'].map((option, i) => {
              const alphabet = String.fromCharCode(65 + i)
              const isCorrect = Array.isArray(answer)
                ? answer.includes(option)
                : answer === option

              return (
                <div
                  key={'true_false' + i}
                  className="flex cursor-pointer items-center gap-4 rounded-lg font-semibold"
                >
                  <span
                    className={cn(
                      'text-grey-600 flex h-6 w-6 items-center justify-center rounded-full bg-[#ECECEC]',
                      isCorrect && 'bg-primary-700 text-white'
                    )}
                  >
                    {isCorrect ? <Check size={16} /> : alphabet}
                  </span>
                  <span className={cn(isCorrect && 'text-primary-700')}>
                    {option}
                  </span>
                </div>
              )
            })}
          </div>
        )
      case 'ordering':
        return (
          <div className="flex flex-col gap-5 rounded-[8px] border border-[#d9d9d9] px-8 py-4 text-sm">
            {(options || ['A', 'B', 'C', 'D']).map((option, i) => (
              <div key={i} className="flex items-center">
                <div className="flex items-center gap-1">
                  <span>({String.fromCharCode(65 + i)})</span>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>
        )
      case 'short_answer':
        return (
          <Input
            type="text"
            className="border-grey-300 text-primary-700 h-[35px] w-2/3 rounded-lg border p-2 font-semibold outline-none"
            value="타입단언"
          />
        )
      case 'fill_in_the_blank':
        return (
          <div className="flex flex-col gap-6">
            <div className="border-grey-300 flex w-2/3 flex-col gap-4 rounded-[8px] border p-6">
              <p>
                1. 변수나 함수의 매개변수, 반환값에 타입을 명시하는 것을{' '}
                <span className="font-semibold">(A) ________</span> 이라고 한다.
              </p>
              <p>
                2. interface 또는 type 키워드를 사용하여 객체의 구조를 정의할 수
                있는데, 이렇게 만든 타입을{' '}
                <span className="font-semibold">(B) ________</span> 이라고
                부른다.
              </p>
            </div>
            <div className="flex gap-10 pl-6">
              <div className="flex items-center gap-2">
                <span className="text-grey-400 px-1 text-sm font-bold">
                  (A)
                </span>
                <Input
                  type="text"
                  className="border-grey-300 text-primary-700 h-[35px] w-full rounded-lg border p-2 font-semibold outline-none"
                  value="타입주석"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-grey-400 px-1 text-sm font-bold">
                  (B)
                </span>
                <Input
                  type="text"
                  className="border-grey-300 text-primary-700 h-[35px] w-full rounded-lg border p-2 font-semibold outline-none"
                  value="사용자 정의 타입"
                />
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section className="text-normal text-grey-600 flex-1 py-4 font-normal">
      {renderOptions()}
    </section>
  )
}
