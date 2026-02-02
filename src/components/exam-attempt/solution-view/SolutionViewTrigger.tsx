import { useMemo, useState } from 'react'
import type { QuestionListResponse } from '@/types/question'
import {
  SolutionViewButton,
  SolutionViewModal,
} from '@/components/exam-attempt'

type SolutionViewTriggerProps = {
  data?: QuestionListResponse | null
  pickedAnswerByQuestionId?: Record<number, string | string[]>
}

export function SolutionViewTrigger({
  data,
  pickedAnswerByQuestionId,
}: SolutionViewTriggerProps) {
  const [open, setOpen] = useState(false)

  const devFallbackData: QuestionListResponse | null = useMemo(() => {
    if (!import.meta.env.DEV) return null

    return {
      id: 1,
      thumbnail_img_url: '',
      title: 'TypeScript 쪽지시험',
      subject: { id: 1, title: 'TypeScript' },
      created_at: '2025-02-01T00:00:00Z',
      updated_at: '2025-02-01T00:00:00Z',
      questions: [
        {
          id: 101,
          type: 'multiple_choice',
          question:
            'TypeScript 타입 호환성 규칙상, 안전하게 허용되는 상·하위 타입 간 값 할당 방식은 무엇인가요?',
          prompt:
            'TypeScript 타입 호환성 규칙상, 안전하게 허용되는 상·하위 타입 간 값 할당 방식은 무엇인가요?',
          options: [
            '상위 타입 값을 하위 타입 변수에 할당',
            '하위 타입 값을 상위 타입 변수에 할당',
            '서로소 유니온 타입 값을 일반 유니온 타입 변수에 할당',
            '하위 타입 값을 상위 타입 변수에 할당',
          ],
          blank_count: 0,
          correct_answer:
            '서로소 유니온 타입 값을 일반 유니온 타입 변수에 할당',
          point: 10,
          explanation:
            '하위 타입을 상위 타입으로 취급하는 업캐스팅은 대부분 안전하게 허용됩니다.',
        },
        {
          id: 102,
          type: 'multiple_choice',
          question: 'TypeScript에서 타입 단언(as)을 사용할 때 주의할 점은?',
          prompt: 'TypeScript에서 타입 단언(as)을 사용할 때 주의할 점은?',
          options: [
            '컴파일러가 런타임에 타입을 자동 검증한다',
            '런타임 검증이 아니며 개발자가 책임진다',
            '타입 단언은 항상 더 안전한 타입으로만 가능하다',
            '타입 단언은 타입을 변경하지 않고도 값이 바뀐다',
          ],
          blank_count: 0,
          correct_answer: '런타임 검증이 아니며 개발자가 책임진다',
          point: 10,
          explanation:
            'as는 컴파일 단계에서만 영향을 주며, 런타임에 값이 검증되거나 변환되지 않습니다.',
        },
      ],
    }
  }, [])

  const resolvedData = data ?? devFallbackData

  const devPicked: Record<number, string | string[]> | undefined =
    useMemo(() => {
      if (!import.meta.env.DEV) return pickedAnswerByQuestionId
      if (pickedAnswerByQuestionId) return pickedAnswerByQuestionId

      return {
        101: '상위 타입 값을 하위 타입 변수에 할당',
        102: '런타임 검증이 아니며 개발자가 책임진다',
      }
    }, [pickedAnswerByQuestionId])

  return (
    <>
      <SolutionViewButton onClick={() => setOpen(true)} />
      <SolutionViewModal
        isOpen={open}
        onClose={() => setOpen(false)}
        data={resolvedData}
        pickedAnswerByQuestionId={devPicked}
      />
    </>
  )
}
