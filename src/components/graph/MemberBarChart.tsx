import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Rectangle,
} from 'recharts'
import { Dropdown } from '@/components/common'
import type { BarStatDataType } from '@/types'

interface MemberBarChartProps {
  data: BarStatDataType[]
  color: string
  hoverColor: string
  viewMode: string
  selectedYear: string
  onYearChange: (year: string) => void
}

export function MemberBarChart({
  data,
  color,
  hoverColor,
  viewMode,
  selectedYear,
  onYearChange,
}: MemberBarChartProps) {
  const hasData = data && data.length > 0

  return (
    <div className="relative h-full w-full">
      {viewMode === 'monthly' && (
        <div className="absolute -top-12 right-0 z-20">
          <Dropdown
            options={[
              { label: '2025', value: '2025' },
              { label: '2024', value: '2024' },
              { label: '2023', value: '2023' },
            ]}
            value={selectedYear}
            onChange={onYearChange}
            className="h-8 w-24 text-xs"
          />
        </div>
      )}

      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            barSize={60}
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
            <Bar
              dataKey="value"
              fill={color}
              activeBar={<Rectangle fill={hoverColor} stroke="none" />}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-grey-400 border-grey-100 flex h-full items-center justify-center rounded-lg border-2 border-dashed">
          해당 연도의 데이터가 존재하지 않습니다.
        </div>
      )}
    </div>
  )
}
