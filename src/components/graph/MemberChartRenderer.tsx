import { MemberBarChart } from './MemberBarChart'
import type { MemberChartResponseType } from '@/types/graph'
import { MemberPieChart } from './MemberPieChart'
import { WithdrawalDetailChart } from './WithdrawalDetailChart'

export function MemberChartRenderer(props: MemberChartResponseType) {
  if (props.type === 'none') {
    return (
      <div className="text-grey-400 border-grey-100 flex h-full items-center justify-center rounded-lg border-2 border-dashed">
        데이터가 없습니다. 기간을 선택하고 조회를 눌러주세요.
      </div>
    )
  }

  switch (props.type) {
    case 'bar':
      if (!props.config) return null

      return (
        <MemberBarChart
          data={props.data}
          color={props.config.color}
          hoverColor={props.config.hoverColor}
          viewMode={props.config.viewMode}
          selectedYear={props.config.selectedYear}
          onYearChange={props.config.onYearChange}
        />
      )

    case 'pie':
      return <MemberPieChart data={props.data} />

    case 'composed':
      return <WithdrawalDetailChart data={props.data} />

    default:
      return null
  }
}
