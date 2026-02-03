import type { PieStatDataType } from '@/types/graph'
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Legend,
  type PieLabelRenderProps,
  Sector,
  type PieSectorShapeProps,
} from 'recharts'

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null)
    return null

  const radius =
    Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5
  const x = Number(cx) + radius * Math.cos(-(midAngle ?? 0) * RADIAN)
  const y = Number(cy) + radius * Math.sin(-(midAngle ?? 0) * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="18"
      fontWeight="bold"
    >
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  )
}

const RenderPieShape = (props: PieSectorShapeProps) => {
  return (
    <Sector
      {...props}
      fill={props.payload?.fill}
      stroke="#fff"
      strokeWidth={2}
      style={{ outline: 'none' }}
    />
  )
}

interface MemberPieChartProps {
  data: PieStatDataType[]
}

export function MemberPieChart({ data }: MemberPieChartProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-10 shadow-sm">
      <h4 className="text-grey-800 mb-4 text-center font-bold">
        회원 탈퇴 사유 그래프
      </h4>

      <div className="h-[650px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="40%"
              cy="50%"
              innerRadius={0}
              outerRadius={200}
              dataKey="value"
              stroke="#fff"
              strokeWidth={2}
              shape={RenderPieShape}
              labelLine={false}
              label={renderCustomizedLabel}
              isAnimationActive
            />

            <Tooltip
              contentStyle={{
                borderRadius: '10px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />

            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconType="square"
              iconSize={14}
              wrapperStyle={{
                paddingRight: '80px',
                fontSize: '18px',
                color: '#666666',
                lineHeight: '2.5',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
