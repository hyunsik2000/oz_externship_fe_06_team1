export type ExamBarChartDataType = {
  subject: string
  score: number
}

export type ExamLineChartDataType = {
  name: string
  score: number
}

export type ExamScatterChartDataType = {
  time: number
  score: number
}

export type ExamChartResponseType =
  | { type: 'bar'; data: ExamBarChartDataType[] }
  | { type: 'line'; data: ExamLineChartDataType[] }
  | { type: 'scatter'; data: ExamScatterChartDataType[] }
  | { type: 'none'; data: [] }

export type MemberChartConfig = {
  color: string
  hoverColor: string
  viewMode: string
  selectedYear: string
  onYearChange: (y: string) => void
}

type BaseStatDataType = {
  value: number
}

export type BarStatDataType = BaseStatDataType & {
  label: string
}

export type PieStatDataType = BaseStatDataType & {
  name: string
  fill: string
  label?: string
}

export type MemberChartResponseType =
  | {
      type: 'bar' | 'composed'
      data: BarStatDataType[]
      config: MemberChartConfig
    }
  | {
      type: 'pie'
      data: PieStatDataType[]
      config?: MemberChartConfig
    }
  | { type: 'none'; data: []; config?: never }
