import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/common'
import { cn } from '@/lib/cn'
import type { Question } from '@/types/question'

type SolveQuestionListProps = {
  questions: Question[]
  pickedAnswerByQuestionId?: Record<number, string | string[]>
}

export function SolveQuestionList({
  questions,
  pickedAnswerByQuestionId,
}: SolveQuestionListProps) {
  const [index, setIndex] = useState(0)

  const total = questions.length
  const current = useMemo(() => questions[index], [questions, index])

  if (total === 0) {
    return (
      <div className="text-grey-600 flex h-full w-full items-center justify-center">
        문제가 없습니다.
      </div>
    )
  }

  const pickedRaw = pickedAnswerByQuestionId?.[current.question_id]
  const picked = Array.isArray(pickedRaw) ? pickedRaw[0] : pickedRaw

  const correct = Array.isArray(current.correct_answer)
    ? current.correct_answer[0]
    : current.correct_answer

  const options = current.options ?? []

  const isPickedCorrect = Boolean(picked) && picked === correct
  const explanationBg = picked
    ? isPickedCorrect
      ? 'bg-success-100 opacity-40'
      : 'bg-error-100 opacity-40'
    : 'bg-white'

  const isFirst = index === 0
  const isLast = index === total - 1

  const goPrev = () => setIndex((v) => Math.max(0, v - 1))
  const goNext = () => setIndex((v) => Math.min(total - 1, v + 1))

  return (
    <div className="flex w-full items-center justify-center gap-10">
      <Button
        size="icon"
        onClick={goPrev}
        disabled={isFirst}
        className="h-12 w-12 rounded-full border-transparent bg-transparent disabled:opacity-30"
      >
        <ChevronLeft className="text-grey-600 h-10 w-10" />
      </Button>

      <div className="flex flex-col items-center">
        <div className="border-grey-300 relative flex min-h-[600px] w-[1060px] flex-col rounded-xl border bg-white p-7 pb-14 shadow-2xs">
          <div className="flex flex-1 flex-col justify-center">
            <div className="mb-4 flex items-center gap-3">
              <div className="text-grey-800 text-xl font-bold">
                {index + 1}.<span className="ml-4">{current.question}</span>
              </div>

              <span className="bg-grey-100 text-grey-700 rounded px-2 py-1 text-xs font-medium">
                {current.point}점
              </span>

              <span className="bg-grey-100 text-grey-700 rounded px-2 py-1 text-xs font-medium">
                단일선택
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {options.length === 0 ? (
                <div className="text-grey-500 text-sm">
                  선택지가 없는 문제입니다.
                </div>
              ) : (
                options.map((opt, i) => {
                  const isCorrect = opt === correct
                  const isPicked = picked ? opt === picked : false
                  const isWrongPicked =
                    Boolean(picked) && isPicked && !isCorrect

                  return (
                    <div
                      key={`${current.question_id}-${i}`}
                      className="ml-10 flex items-center gap-3"
                    >
                      <span className="border-grey-400 flex h-4 w-4 items-center justify-center rounded-full border">
                        <span
                          className={cn(
                            'h-2 w-2 rounded-full',
                            isCorrect && 'bg-success-400',
                            isWrongPicked && 'bg-error-400',
                            !isCorrect && !isWrongPicked && 'bg-grey-300'
                          )}
                        />
                      </span>

                      <span
                        className={cn(
                          'text-grey-800',
                          isCorrect && 'text-success-400 font-semibold',
                          isWrongPicked && 'text-error-400 font-semibold'
                        )}
                      >
                        {opt}
                      </span>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <div
            className={cn(
              'text-grey-800 text-md flex min-h-[65px] items-center rounded-md px-4 py-3',
              explanationBg
            )}
          >
            <div className="w-full">{current.explanation}</div>
          </div>
        </div>

        <div className="text-grey-600 absolute bottom-6 left-7 text-sm">
          {index + 1}/{total}
        </div>
      </div>

      <Button
        size="icon"
        onClick={goNext}
        disabled={isLast}
        className="h-12 w-12 rounded-full border-transparent bg-transparent disabled:opacity-30"
      >
        <ChevronRight className="text-grey-600 h-10 w-10" />
      </Button>
    </div>
  )
}
