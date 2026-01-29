import {
  StudentScoreBarChart,
  ExamAverageLineChart,
  ExamScatterChart,
} from '@/components/graph'
import type { ChartResponseType } from '@/types'

export function ChartRenderer({ type, data }: ChartResponseType) {
  if (type === 'none' || data.length === 0) {
    return (
      <div className="text-grey-400 border-grey-100 flex h-full items-center justify-center rounded-lg border-2 border-dashed">
        데이터가 없습니다. 과정을 선택하고 조회를 눌러주세요.
      </div>
    )
  }

  switch (type) {
    case 'bar':
      return <StudentScoreBarChart data={data} />
    case 'line':
      return <ExamAverageLineChart data={data} />
    case 'scatter':
      return <ExamScatterChart data={data} />
    default:
      return null
  }
}
