import { DashboardLayout } from '@/components/layout'
import { AlertModal } from '@/components/common'
import { useMemberDashboard } from '@/hooks/graph/useMemberDashboard'
import {
  MEMBER_VIEW_METADATA,
  MEMBER_VIEWS,
  type MemberViewType,
} from '@/constants/dashboard/memberDashboardConfig'
import { MemberChartRenderer } from '@/components/graph/MemberChartRenderer'
import type { MemberChartResponseType } from '@/types'
import { MOCK_WITHDRAWAL_REASONS } from '@/mocks/data/graph-data'

export function MemberDashboardPage() {
  const {
    viewType,
    setViewType,
    filters,
    setFilters,
    chartResponse,
    alertConfig,
    setAlertConfig,
    fetchData,
  } = useMemberDashboard()

  const meta = MEMBER_VIEW_METADATA[viewType]

  const exportData = chartResponse.data.map((item) => ({
    '기준 날짜/연도': item.label,
    '인원 수': item.value,
  }))

  const commonFilters = [
    {
      id: 'mode',
      options: [
        { label: '월간', value: 'monthly' },
        { label: '연간', value: 'yearly' },
      ],
      value: filters.mode,
      onChange: (v: string) => setFilters((p) => ({ ...p, mode: v })),
      className: 'w-32',
    },
  ]

  const withdrawalDetailFilters = [
    {
      id: 'reason',
      options: MOCK_WITHDRAWAL_REASONS.map((r) => ({
        label: r.name,
        value: r.name,
      })),
      value: filters.reason,
      onChange: (v: string) => setFilters((p) => ({ ...p, reason: v })),
      className: 'w-80',
      placeholder: '사유를 선택하세요',
    },
  ]

  const renderFilters = () => {
    if (viewType === MEMBER_VIEWS.WITHDRAWAL_DETAIL)
      return withdrawalDetailFilters
    if (viewType === MEMBER_VIEWS.WITHDRAWAL_REASON) return []
    return commonFilters
  }

  const isPieChartView = viewType === MEMBER_VIEWS.WITHDRAWAL_REASON

  return (
    <>
      <DashboardLayout
        titleOptions={Object.entries(MEMBER_VIEW_METADATA).map(
          ([value, { label }]) => ({
            label,
            value,
          })
        )}
        currentTitleValue={viewType}
        onTitleChange={(v) => setViewType(v as MemberViewType)}
        description={meta.description}
        chartTitle={
          viewType === MEMBER_VIEWS.WITHDRAWAL_REASON
            ? ''
            : viewType === MEMBER_VIEWS.WITHDRAWAL_DETAIL
              ? '회원 탈퇴 사유 상세 그래프'
              : `${filters.mode === 'monthly' ? '월간' : '연간'} ${meta.chartTitle}`
        }
        onSearch={fetchData}
        filters={renderFilters()}
        showSearchButton={!isPieChartView}
        exportData={exportData}
        chartContainerClassName={isPieChartView ? 'h-[650px]' : 'h-[500px]'}
      >
        <div className="h-full w-full">
          <MemberChartRenderer
            {...(chartResponse.type === 'none'
              ? { type: 'none', data: [] }
              : ({
                  ...chartResponse,
                  type:
                    viewType === 'withdrawal_reason'
                      ? 'pie'
                      : viewType === 'withdrawal_detail'
                        ? 'composed'
                        : 'bar',
                  config: {
                    color: meta.color,
                    hoverColor: meta.hoverColor,
                    viewMode: filters.mode,
                    selectedYear: filters.year,
                    onYearChange: (y) => setFilters((p) => ({ ...p, year: y })),
                  },
                } as MemberChartResponseType))}
          />
        </div>
      </DashboardLayout>

      <AlertModal
        isOpen={alertConfig.isOpen}
        onClose={() => setAlertConfig((p) => ({ ...p, isOpen: false }))}
        type="danger"
        title={alertConfig.title}
        description={alertConfig.description}
        onConfirm={() => setAlertConfig((p) => ({ ...p, isOpen: false }))}
        showCancel={false}
      />
    </>
  )
}
