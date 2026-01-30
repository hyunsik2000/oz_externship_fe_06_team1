import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Rectangle,
} from 'recharts'

interface StudentScoreBarChartProps {
  data: { subject: string; score: number }[]
}

export function StudentScoreBarChart({ data }: StudentScoreBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        barSize={50}
      >
        <CartesianGrid vertical={false} stroke="#dddddd" />

        <XAxis
          dataKey="subject"
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

        <Bar
          dataKey="score"
          fill="#d7cbf7"
          radius={[0, 0, 0, 0]}
          activeBar={<Rectangle fill="#b69cf1" stroke="none" />}
          isAnimationActive
          animationDuration={300}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
