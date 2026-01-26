import AddProblem from '@/assets/icons/AddProblem.svg?react'
import PutProblem from '@/assets/icons/PutProblem.svg?react'
import DeleteProblem from '@/assets/icons/DeleteProblem.svg?react'
import type { QuestionType } from '@/types/question'

const TYPE_LABELS: Record<QuestionType, string> = {
  multiple_choice: '다지선다형',
  true_false: '참/거짓형 (O/X)',
  ordering: '순서정렬',
  short_answer: '주관식(단답형)',
  fill_in_the_blank: '빈칸식',
}

export default function ProblemHeader({ type }: { type?: QuestionType }) {
  if (!type) {
    return (
      <section className="flex items-center justify-end">
        <button type="button" className="cursor-pointer">
          <AddProblem />
        </button>
      </section>
    )
  }

  const label = TYPE_LABELS[type]

  return (
    <section className="flex items-center justify-between">
      <h2 className="text-grey-600 text-sm font-normal">{label}</h2>
      <div className="flex items-center gap-2">
        <button type="button" className="cursor-pointer">
          <AddProblem />
        </button>
        <button type="button" className="cursor-pointer">
          <PutProblem />
        </button>
        <button type="button" className="cursor-pointer">
          <DeleteProblem />
        </button>
      </div>
    </section>
  )
}
