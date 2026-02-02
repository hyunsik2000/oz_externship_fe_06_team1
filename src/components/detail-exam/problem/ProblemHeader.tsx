import AddProblem from '@/assets/icons/AddProblem.svg?react'
import PutProblem from '@/assets/icons/PutProblem.svg?react'
import DeleteProblem from '@/assets/icons/DeleteProblem.svg?react'
import type { QuestionType } from '@/types/question'

const TYPE_LABELS: Record<QuestionType, string> = {
  multiple_choice: '다지선다형',
  ox: '참/거짓형 (O/X)',
  ordering: '순서정렬',
  short_answer: '주관식(단답형)',
  fill_blank: '빈칸식',
}

interface ProblemHeaderProps {
  type?: QuestionType
  onAdd: () => void
  onEdit?: () => void
  // onDelete?: () => void
}

export function ProblemHeader({
  type,
  onAdd,
  onEdit,
  // onDelete,
}: ProblemHeaderProps) {
  if (!type) {
    return (
      <section className="flex items-center justify-end">
        <button type="button" className="cursor-pointer" onClick={onAdd}>
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
        <button type="button" className="cursor-pointer" onClick={onAdd}>
          <AddProblem />
        </button>
        <button type="button" className="cursor-pointer" onClick={onEdit}>
          <PutProblem />
        </button>
        <button type="button" className="cursor-pointer">
          <DeleteProblem />
        </button>
      </div>
    </section>
  )
}
