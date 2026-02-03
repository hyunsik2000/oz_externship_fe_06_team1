import { useState, useEffect } from 'react'
import { API_PATHS } from '@/constants/api'
import { MOCK_STUDENTS_BY_TERM } from '@/mocks/data/graph-data'
import type { ExamChartResponseType } from '@/types'
import {
  DASHBOARD_VIEWS,
  type ViewType,
} from '@/constants/dashboard/examDashboardConfig'

export function useExamDashboard() {
  const [viewType, setViewType] = useState<ViewType>(DASHBOARD_VIEWS.SCORE)

  const [filters, setFilters] = useState({
    camp: '',
    term: '',
    student: '',
    subject: '',
  })

  const [chartResponse, setChartResponse] = useState<ExamChartResponseType>({
    type: 'none',
    data: [],
  })

  const [alertConfig, setAlertConfig] = useState({ isOpen: false, title: '' })

  useEffect(() => {
    setFilters({ camp: '', term: '', student: '', subject: '' })
    setChartResponse({ type: 'none', data: [] })
  }, [viewType])

  const fetchData = async () => {
    type ActiveChartType = Exclude<ExamChartResponseType['type'], 'none'>
    let requestConfig: { url: string; type: ActiveChartType } | null = null

    if (viewType === 'score') {
      if (!filters.student) {
        setAlertConfig({ isOpen: true, title: '수강생을 선택해주세요.' })
        return
      }
      requestConfig = {
        url: API_PATHS.GRAPH.STUDENT_SCORES(filters.student),
        type: 'bar',
      }
    } else {
      if (!filters.camp) {
        setAlertConfig({ isOpen: true, title: '과정을 선택해주세요.' })
        return
      }

      if (!filters.subject) {
        requestConfig = {
          url: API_PATHS.GRAPH.TERM_AVERAGE(filters.camp),
          type: 'line',
        }
      } else {
        requestConfig = {
          url: API_PATHS.GRAPH.SUBJECT_SCATTER(filters.subject),
          type: 'scatter',
        }
      }
    }

    if (!requestConfig) return

    try {
      const res = await fetch(requestConfig.url)
      const data = await res.json()

      setChartResponse({
        type: requestConfig.type,
        data: data,
      } as ExamChartResponseType)
    } catch (error) {
      console.error('데이터 로드 실패:', error)
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

  return {
    viewType,
    setViewType,
    filters,
    setFilters,
    chartResponse,
    alertConfig,
    setAlertConfig,
    fetchData,
    handleTermChange,
  }
}
