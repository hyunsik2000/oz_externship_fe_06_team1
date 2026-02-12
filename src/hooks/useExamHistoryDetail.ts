import { useEffect, useState } from 'react'
import { API_PATHS } from '@/constants/api'
import type {
  ExamSubmissionDetail,
  ExamSubmissionDetailApi,
  ExamSubmissionQuestionApi,
} from '@/types/history'
import type { Question, QuestionsList, QuestionType } from '@/types/question'
import { useAxios } from './useAxios'

/** API type 문자열 → 프론트 QuestionType 매핑 */
const QUESTION_TYPE_MAP: Record<string, QuestionType> = {
  single_choice: 'SINGLE_CHOICE',
  multiple_choice: 'MULTI_SELECT',
  ox: 'OX',
  ordering: 'ORDERING',
  short_answer: 'SHORT_ANSWER',
  fill_blank: 'FILL_IN_BLANK',
}

function mapApiQuestionToQuestion(q: ExamSubmissionQuestionApi): Question {
  return {
    question_id: q.id,
    type: QUESTION_TYPE_MAP[q.type] ?? 'SINGLE_CHOICE',
    question: q.question,
    prompt: q.prompt ?? '',
    options: q.options ?? [],
    blank_count: 0,
    correct_answer: q.answer,
    point: q.point,
    explanation: q.explanation ?? '',
  }
}

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

function buildQuestionsList(
  api: ExamSubmissionDetailApi
): QuestionsList | null {
  if (!api.questions?.length) return null
  const exam = api.exam ?? {}
  return {
    id: 0,
    title: exam.exam_title ?? '',
    subject: { id: 0, title: exam.subject_name ?? '' },
    questions: api.questions.map(mapApiQuestionToQuestion),
    thumbnail_img_url: '',
    created_at: '',
    updated_at: '',
  }
}

function buildPickedAnswers(
  questions: ExamSubmissionQuestionApi[]
): Record<number, string | string[]> {
  const picked: Record<number, string | string[]> = {}
  for (const q of questions) {
    if (q.submitted_answer != null) {
      picked[q.id] = q.submitted_answer
    }
  }
  return picked
}

export function useExamHistoryDetail(submissionId: number | null) {
  const { sendRequest, isLoading } = useAxios()
  const [detail, setDetail] = useState<ExamSubmissionDetail | null>(null)
  const [questionsData, setQuestionsData] = useState<QuestionsList | null>(null)
  const [pickedAnswers, setPickedAnswers] = useState<Record<
    number,
    string | string[]
  > | null>(null)

  useEffect(() => {
    if (!submissionId) {
      setDetail(null)
      setQuestionsData(null)
      setPickedAnswers(null)
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

        if (data?.questions?.length) {
          setQuestionsData(buildQuestionsList(data))
          setPickedAnswers(buildPickedAnswers(data.questions))
        } else {
          setQuestionsData(null)
          setPickedAnswers(null)
        }
      } catch {
        // 에러는 useAxios에서 전역 에러 스토어로 처리
        setDetail(null)
        setQuestionsData(null)
        setPickedAnswers(null)
      }
    }

    void fetchDetail()
  }, [sendRequest, submissionId])

  return {
    detail,
    questionsData,
    pickedAnswers,
    isLoading,
  }
}
