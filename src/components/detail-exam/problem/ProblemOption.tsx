import type { QuestionType } from '@/types/question'
import { Input } from '@/components/common/Input'
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

interface ProblemOptionProps {
  type: QuestionType
  options: string[] | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answer: any
  prompt?: string
}

export function ProblemOption({
  type,
  options,
  answer,
  prompt,
}: ProblemOptionProps) {
  const renderOptions = () => {
    const isCorrectAnswer = (option: string) => {
      if (Array.isArray(answer)) {
        return answer.includes(option)
      }
      return answer === option
    }

    switch (type) {
      case 'SINGLE_CHOICE':
      case 'MULTI_SELECT':
        return (
          <div className="flex flex-col gap-11">
            {(options || []).map((option, i) => {
              const alphabet = String.fromCharCode(65 + i)
              const isCorrect = isCorrectAnswer(option)

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
      case 'OX':
        return (
          <div className="flex flex-col gap-11">
            {['O', 'X'].map((option, i) => {
              const alphabet = String.fromCharCode(65 + i)
              const isCorrect = isCorrectAnswer(option)

              return (
                <div
                  key={'ox' + i}
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
      case 'ORDERING':
        return (
          <div className="flex flex-col gap-5 rounded-[8px] border border-[#d9d9d9] px-8 py-4 text-sm">
            {(answer || options || []).map((option: string, i: number) => (
              <div key={'ordering' + i} className="flex items-center">
                <div className="flex items-center gap-1">
                  <span>({String.fromCharCode(65 + i)})</span>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>
        )
      case 'SHORT_ANSWER':
        return (
          <Input
            type="text"
            className="border-grey-300 text-primary-700 h-[35px] w-2/3 rounded-lg border p-2 font-semibold outline-none"
            value={answer}
            readOnly
          />
        )
      case 'FILL_IN_BLANK': {
        const lines = (prompt || '').split('\n')
        const answers = Array.isArray(answer) ? answer : [answer]
        let blankIndex = 0

        return (
          <div className="flex flex-col gap-6">
            <div className="border-grey-300 flex w-2/3 flex-col gap-4 rounded-[8px] border p-6 text-sm">
              <div className="flex flex-col gap-2">
                {lines.map((line, lineIdx) => {
                  const parts = line.split('__')
                  return (
                    <p key={'fill' + lineIdx}>
                      {parts.map((part, partIdx) => (
                        <span key={'blank' + partIdx}>
                          {part}
                          {partIdx < parts.length - 1 && (
                            <span className="text-primary-700 font-semibold">
                              ({String.fromCharCode(65 + blankIndex++)})
                              ________
                            </span>
                          )}
                        </span>
                      ))}
                    </p>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-4 pl-6">
              {answers.map((ans, index) => (
                <div key={'answer' + index} className="flex items-center gap-2">
                  <span className="text-grey-400 px-1 text-sm font-bold">
                    ({String.fromCharCode(65 + index)})
                  </span>
                  <Input
                    type="text"
                    className="border-grey-300 text-primary-700 h-[35px] min-w-[150px] rounded-lg border p-2 font-semibold outline-none"
                    value={ans}
                    readOnly
                  />
                </div>
              ))}
            </div>
          </div>
        )
      }
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
