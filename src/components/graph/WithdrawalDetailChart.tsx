import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface WithdrawalDetailData {
  label: string
  value: number
}

export function WithdrawalDetailChart({
  data,
}: {
  data: WithdrawalDetailData[]
}) {
  const DEFAULT_BAR = '#d7cbf7'
  const DEFAULT_LINE = '#986be9'

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
      >
        <CartesianGrid vertical={false} stroke="#dddddd" />
        <XAxis
          dataKey="label"
          axisLine={{ stroke: '#666666' }}
          tick={{ fontSize: 10, fill: '#666666' }}
          dy={10}
        />
        <YAxis
          domain={[0, 1000]}
          ticks={[0, 200, 400, 600, 800, 1000]}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: '#666666' }}
        />
        <Tooltip />
        <Bar dataKey="value" fill={DEFAULT_BAR} barSize={50} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={DEFAULT_LINE}
          strokeWidth={3}
          dot={{ r: 6, fill: '#b69cf1', stroke: '#522193', strokeWidth: 2 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
