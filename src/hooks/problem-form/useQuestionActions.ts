import { useAxios } from '@/hooks/useAxios'
import { API_PATHS } from '@/constants/api'
import { useProblemFormStore } from '@/store/problem-form/useProblemFormStore'

export const useQuestionActions = () => {
  const { sendRequest, isLoading } = useAxios()
  const {
    type,
    question,
    prompt,
    options,
    blankCount,
    correctAnswers,
    point,
    explanation,
  } = useProblemFormStore()

  // 백엔드 전송용 페이로드 생성
  const requestPayload = () => {
    // 타입 매핑 (프론트 -> 백엔드)
    const backendTypeMap: Record<string, string> = {
      SINGLE_CHOICE: 'multiple_choice',
      MULTI_SELECT: 'multiple_choice',
      OX: 'ox',
      ORDERING: 'ordering',
      SHORT_ANSWER: 'short_answer',
      FILL_IN_BLANK: 'fill_blank',
    }
    const backendType = backendTypeMap[type]

    // 정답 포맷팅
    let formattedCorrectAnswer: string | string[] = ''
    switch (type) {
      case 'SINGLE_CHOICE':
      case 'MULTI_SELECT': {
        const indices = Array.isArray(correctAnswers)
          ? correctAnswers
          : [correctAnswers]
        formattedCorrectAnswer = indices.map((idx: number) => options[idx])
        break
      }
      case 'OX':
        // "O", "X" 단일 값으로 전송
        formattedCorrectAnswer = Array.isArray(correctAnswers)
          ? correctAnswers[0]
          : correctAnswers
        break
      case 'ORDERING': {
        const indexedOptions = options.map((opt, idx) => ({
          opt,
          rank: correctAnswers[idx],
        }))
        formattedCorrectAnswer = indexedOptions
          .sort((a, b) => a.rank - b.rank)
          .map((item) => item.opt)
        break
      }
      case 'SHORT_ANSWER':
        formattedCorrectAnswer = correctAnswers
        break
      case 'FILL_IN_BLANK':
        formattedCorrectAnswer = correctAnswers
        break
    }

    return {
      type: backendType,
      question,
      prompt: prompt || '',
      options: ['OX', 'SHORT_ANSWER', 'FILL_IN_BLANK'].includes(type)
        ? []
        : options,
      blank_count:
        type === 'FILL_IN_BLANK'
          ? Array.isArray(correctAnswers)
            ? correctAnswers.length
            : 1
          : 0,
      correct_answer: formattedCorrectAnswer,
      point,
      explanation,
    }
  }

  const createQuestion = async (examId: number) => {
    const payload = requestPayload()
    return await sendRequest({
      method: 'POST',
      url: API_PATHS.QUESTION.CREATE(examId),
      data: payload,
    })
  }

  const updateQuestion = async (questionId: number) => {
    const payload = requestPayload()
    return await sendRequest({
      method: 'PUT',
      url: API_PATHS.QUESTION.UPDATE(questionId),
      data: payload,
    })
  }

  const deleteQuestion = async (questionId: number) => {
    return await sendRequest({
      method: 'DELETE',
      url: API_PATHS.QUESTION.DELETE(questionId),
    })
  }

  return { createQuestion, updateQuestion, deleteQuestion, isLoading }
}
