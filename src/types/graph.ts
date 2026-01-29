export type BarChartDataType = {
  subject: string
  score: number
}

export type LineChartDataType = {
  name: string
  score: number
}

export type ScatterChartDataType = {
  time: number
  score: number
}

export type ChartResponseType =
  | { type: 'bar'; data: BarChartDataType[] }
  | { type: 'line'; data: LineChartDataType[] }
  | { type: 'scatter'; data: ScatterChartDataType[] }
  | { type: 'none'; data: [] }
