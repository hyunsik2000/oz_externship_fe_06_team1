import { useEffect, useState } from 'react'
import { AlertModal } from '@/components/common/AlertModal'
import { ExamAverageLineChart } from '@/components/graph/ExamAverageLineChart'
import { ExamScatterChart } from '@/components/graph/ExamScatterChart'
import { StudentScoreBarChart } from '@/components/graph/StudentScoreBarChart'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { API_PATHS } from '@/constants/api'
import {
  MOCK_CAMP_OPTIONS,
  MOCK_STUDENTS_BY_TERM,
  MOCK_SUBJECT_OPTIONS,
  MOCK_TERM_OPTIONS,
} from '@/mocks/data/graph-data/ExamGraph'

export function ExamDashboardPage() {
  const [viewType, setViewType] = useState<'score' | 'avg'>('score')

  const [filters, setFilters] = useState({
    camp: '',
    term: '',
    student: '',
    subject: '',
  })

  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean
    title: string
  }>({
    isOpen: false,
    title: '',
  })

  const [chartResponse, setChartResponse] = useState<{
    type: 'bar' | 'line' | 'scatter' | 'none'
    data: any[]
  }>({ type: 'none', data: [] })

  const closeAlert = () =>
    setAlertConfig((prev) => ({ ...prev, isOpen: false }))

  useEffect(() => {
    setFilters({ camp: '', term: '', student: '', subject: '' })
    setChartResponse({ type: 'none', data: [] })
  }, [viewType])

  const fetchData = async () => {
    try {
      let url = ''
      let currentType: 'bar' | 'line' | 'scatter' = 'none' as any

      if (viewType === 'score') {
        if (!filters.student) {
          setAlertConfig({ isOpen: true, title: '수강생을 선택해주세요.' })
          return
        }
        url = API_PATHS.GRAPH.STUDENT_SCORES(filters.student)
        currentType = 'bar'
      } else {
        if (!filters.camp) {
          setAlertConfig({ isOpen: true, title: '과정을 선택해주세요.' })
          return
        }

        if (!filters.subject) {
          url = API_PATHS.GRAPH.TERM_AVERAGE(filters.camp)
          currentType = 'line'
        } else {
          url = API_PATHS.GRAPH.SUBJECT_SCATTER(filters.subject)
          currentType = 'scatter'
        }
      }

      const res = await fetch(url)
      const data = await res.json()
      setChartResponse({ type: currentType, data })
    } catch (error) {
      console.error(error)
    }
  }

  const handleTermChange = (term: string) => {
    const studentsInTerm = MOCK_STUDENTS_BY_TERM[term] || []

    setFilters((prev) => ({
      ...prev,
      term,
      student: studentsInTerm[0]?.value || '',
    }))
  }

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
            className: 'w-40',
            placeholder: '기수를 선택하세요.',
          },
          {
            id: 'student',
            options: MOCK_STUDENTS_BY_TERM[filters.term] || [],
            value: filters.student,
            onChange: (v: string) => setFilters((p) => ({ ...p, student: v })),
            className: 'w-40',
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
        titleOptions={[
          { label: '수강생 과목 별 점수 그래프', value: 'score' },
          { label: '쪽지 시험 기수 별 평균 그래프', value: 'avg' },
        ]}
        currentTitleValue={viewType}
        description={
          viewType === 'score'
            ? '수강생 과목 별 점수 막대 그래프 (그래프에는 과목 별 점수 가 조회됩니다.)'
            : '쪽지 시험 기수 별 평균 그래프 (그래프에는 최근 12기수의 쪽지시험 평균 점수가 조회됩니다.)'
        }
        chartTitle={
          viewType === 'score'
            ? '수강생 과목 별 점수 그래프'
            : '쪽지 시험 기수 별 평균 그래프'
        }
        filters={currentFilters}
        onTitleChange={(v) => setViewType(v as ViewType)}
        onSearch={fetchData}
      >
        <div className="h-full w-full">
          {chartResponse.type === 'none' || chartResponse.data.length === 0 ? (
            <div className="text-grey-400 border-grey-100 flex h-full items-center justify-center rounded-lg border-2 border-dashed">
              데이터가 없습니다. 과정을 선택하고 조회를 눌러주세요.
            </div>
          ) : (
            <>
              {chartResponse.type === 'bar' && (
                <StudentScoreBarChart data={chartResponse.data} />
              )}
              {chartResponse.type === 'line' && (
                <ExamAverageLineChart data={chartResponse.data} />
              )}
              {chartResponse.type === 'scatter' && (
                <ExamScatterChart data={chartResponse.data} />
              )}
            </>
          )}
        </div>
      </DashboardLayout>
      <AlertModal
        isOpen={alertConfig.isOpen}
        onClose={closeAlert}
        type="warning"
        title={alertConfig.title}
        onConfirm={() => {
          console.log('확인 클릭')
        }}
      />
    </>
  )
}
