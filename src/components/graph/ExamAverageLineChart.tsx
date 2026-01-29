import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

interface ExamAverageLineChartProps {
  data: { name: string; score: number }[]
}

export function ExamAverageLineChart({ data }: ExamAverageLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
      >
        <CartesianGrid vertical={false} stroke="#dddddd" />

        <XAxis
          dataKey="name"
          axisLine={{ stroke: '#666666' }}
          tickLine={{ stroke: '#666666' }}
          tick={{ fontSize: 11, fill: '#666666' }}
          dy={10}
        />

        <YAxis
          domain={[0, 100]}
          ticks={[0, 20, 40, 60, 80, 100]}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#666666' }}
        />

        <Line
          type="monotone"
          dataKey="score"
          stroke="#d7cbf7"
          strokeWidth={4}
          dot={{
            r: 6,
            fill: '#d7cbf7',
            stroke: '#b69cf1',
            strokeWidth: 2,
          }}
          activeDot={{
            r: 8,
            stroke: '#986be9',
            strokeWidth: 2,
          }}
          animationDuration={500}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
