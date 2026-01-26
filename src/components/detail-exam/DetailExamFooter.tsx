interface DetailExamFooterProps {
  currentIndex: number
  totalQuestions: number
}

export default function DetailExamFooter({
  currentIndex,
  totalQuestions,
}: DetailExamFooterProps) {
  return (
    <div className="flex justify-between">
      <span className="text-grey-600 text-sm">
        {currentIndex + 1}/{totalQuestions}
      </span>
    </div>
  )
}
