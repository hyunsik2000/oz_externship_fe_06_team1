import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

interface QuizScatterChartProps {
  data: { time: number; score: number }[]
}

export function ExamScatterChart({ data }: QuizScatterChartProps) {
  return (
    <div className="relative h-full w-full">
      <span className="text-grey-600 absolute -top-6 left-10 text-[11px]">
        점수
      </span>
      <span className="text-grey-600 absolute -right-4 -bottom-2 text-[11px]">
        응시시간(분)
      </span>

      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 40, bottom: 20, left: 10 }}>
          <CartesianGrid vertical={false} stroke="#dddddd" />

          <XAxis
            type="number"
            dataKey="time"
            name="time"
            unit="분"
            domain={[0, 12]}
            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            axisLine={{ stroke: '#666666' }}
            tickLine={{ stroke: '#666666' }}
            tick={{ fontSize: 11, fill: '#666666' }}
            dy={10}
          />

          <YAxis
            type="number"
            dataKey="score"
            name="score"
            unit="점"
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#666666' }}
          />

          <ZAxis type="number" range={[100, 100]} />

          <Tooltip cursor={{ strokeDasharray: '3 3' }} />

          <Scatter
            name="수강생 점수"
            data={data}
            fill="#d7cbf7"
            stroke="#b69cf1"
            strokeWidth={1}
            fillOpacity={0.6}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
