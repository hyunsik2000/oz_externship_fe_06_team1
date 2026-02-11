import { useEffect, useState } from 'react'
import { API_PATHS } from '@/constants/api'
import type {
  ExamSubmissionDetail,
  ExamSubmissionDetailApi,
} from '@/types/history'
import { useAxios } from './useAxios'

function mapApiToDetail(
  api: ExamSubmissionDetailApi | null,
  submissionId: number
): ExamSubmissionDetail | null {
  if (!api) return null
  const exam = api.exam ?? {}
  const student = api.student ?? {}
  const result = api.result ?? {}
  return {
    submission_id: submissionId,
    nickname: student.nickname ?? '',
    name: student.name ?? '',
    course_name: student.course_name ?? '',
    cohort_number: student.cohort_number ?? 0,
    exam_title: exam.exam_title ?? '',
    subject_name: exam.subject_name ?? '',
    score: result.score ?? 0,
    cheating_count: result.cheating_count ?? 0,
    started_at: '',
    finished_at: '',
    correct_answer_count: result.correct_answer_count,
    total_question_count: result.total_question_count,
    open_at: exam.open_at,
    close_at: exam.close_at,
    duration_time: exam.duration_time,
    elapsed_time: result.elapsed_time,
  }
}

export function useExamHistoryDetail(submissionId: number | null) {
  const { sendRequest, isLoading } = useAxios()
  const [detail, setDetail] = useState<ExamSubmissionDetail | null>(null)

  useEffect(() => {
    if (!submissionId) {
      setDetail(null)
      return
    }

    const fetchDetail = async () => {
      try {
        const data = await sendRequest<ExamSubmissionDetailApi>({
          method: 'GET',
          url: API_PATHS.SUBMISSIONS.DETAIL(submissionId),
          errorTitle: '응시 내역 상세 조회에 실패했습니다.',
        })
        setDetail(mapApiToDetail(data, submissionId))
      } catch {
        // 에러는 useAxios에서 전역 에러 스토어로 처리
        setDetail(null)
      }
    }

    void fetchDetail()
  }, [sendRequest, submissionId])

  return {
    detail,
    isLoading,
  }
}
