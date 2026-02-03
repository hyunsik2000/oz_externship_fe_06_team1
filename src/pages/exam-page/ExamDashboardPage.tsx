import { AlertModal } from '@/components/common'
import { DashboardLayout } from '@/components/layout'
import { ExamChartRenderer } from '@/components/graph'
import {
  VIEW_METADATA,
  type ViewType,
} from '@/constants/dashboard/examDashboardConfig'
import { useExamDashboard } from '@/hooks/graph'
import {
  MOCK_CAMP_OPTIONS,
  MOCK_STUDENTS_BY_TERM,
  MOCK_SUBJECT_OPTIONS,
  MOCK_TERM_OPTIONS,
} from '@/mocks/data/graph-data'

export function ExamDashboardPage() {
  const {
    viewType,
    setViewType,
    filters,
    setFilters,
    chartResponse,
    alertConfig,
    setAlertConfig,
    fetchData,
    handleTermChange,
  } = useExamDashboard()

  const currentMeta = VIEW_METADATA[viewType]

  const currentFilters =
    viewType === 'score'
      ? [
          {
            id: 'camp',
            options: MOCK_CAMP_OPTIONS,
            value: filters.camp,
            onChange: (v: string) => setFilters((p) => ({ ...p, camp: v })),
            className: 'w-72',
            placeholder: '과정을 선택하세요.',
          },
          {
            id: 'term',
            options: MOCK_TERM_OPTIONS,
            value: filters.term,
            onChange: handleTermChange,
            className: 'w-48',
            placeholder: '기수를 선택하세요.',
          },
          {
            id: 'student',
            options: MOCK_STUDENTS_BY_TERM[filters.term] || [],
            value: filters.student,
            onChange: (v: string) => setFilters((p) => ({ ...p, student: v })),
            className: 'w-48',
            placeholder: '이름을 선택하세요.',
          },
        ]
      : [
          {
            id: 'camp',
            options: MOCK_CAMP_OPTIONS,
            value: filters.camp,
            onChange: (v: string) => setFilters((p) => ({ ...p, camp: v })),
            className: 'w-72',
            placeholder: '과정을 선택하세요.',
          },
          {
            id: 'subject',
            options: MOCK_SUBJECT_OPTIONS,
            value: filters.subject,
            onChange: (v: string) => setFilters((p) => ({ ...p, subject: v })),
            className: 'w-48',
            placeholder: '과목을 선택하세요.',
          },
        ]

  return (
    <>
      <DashboardLayout
        titleOptions={Object.entries(VIEW_METADATA).map(
          ([value, { label }]) => ({
            label,
            value,
          })
        )}
        currentTitleValue={viewType}
        description={currentMeta.description}
        chartTitle={currentMeta.chartTitle}
        exportData={chartResponse.data}
        filters={currentFilters}
        onTitleChange={(v) => setViewType(v as ViewType)}
        onSearch={fetchData}
      >
        <div className="h-full w-full">
          <ExamChartRenderer {...chartResponse} />
        </div>
      </DashboardLayout>

      <AlertModal
        isOpen={alertConfig.isOpen}
        onClose={() => setAlertConfig((p) => ({ ...p, isOpen: false }))}
        type="warning"
        title={alertConfig.title}
        onConfirm={() => {}}
      />
    </>
  )
}
