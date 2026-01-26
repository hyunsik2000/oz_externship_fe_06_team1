import reactLogo from '@/assets/react.svg'
import type { QuestionListResponse } from '@/types/question'

export default function DetailExamHeader({
  data,
}: {
  data: QuestionListResponse
}) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2 pt-6 pl-6">
        <img src={reactLogo} alt="과목 로고" className="h-8 w-8 rounded" />
        <p className="text-grey-600 text-xl font-semibold">{data.title}</p>
        <p className="text-grey-600 text-sm">
          과목 : {data.subject.title} 문제 수 : {data.questions.length}
        </p>
      </div>
      <div className="flex shrink-0 flex-col">
        <span className="text-grey-600 text-sm">
          등록일시: {data.created_at}
        </span>
        <span className="text-grey-600 text-sm">
          수정일시: {data.updated_at}
        </span>
      </div>
    </div>
  )
}
