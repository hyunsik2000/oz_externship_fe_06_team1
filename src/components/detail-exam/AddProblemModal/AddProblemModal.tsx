import { useState } from 'react'
import { Modal } from '@/components/common/Modal'
import { Button } from '@/components/common/Button'
import type { QuestionType } from '@/types/question'
import { cn } from '@/lib/cn'

// 분리된 컴포넌트 임포트
import {
  QuestionInputSection,
  PromptInputSection,
  PointSection,
  ExplanationSection,
} from './ProblemForms'

import { QuestionTypeForm } from './ProblemForms/renderTypeForm'

interface AddProblemModalProps {
  isOpen: boolean
  onClose: () => void
}

import { QUESTION_TYPES } from '@/constants/Question/question-types'

export default function AddProblemModal({
  isOpen,
  onClose,
}: AddProblemModalProps) {
  const [type, setType] = useState<QuestionType>('multiple_choice')
  const [question, setQuestion] = useState('')
  const [prompt, setPrompt] = useState('')
  const [point, setPoint] = useState(5)
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([2])
  const [shortAnswer, setShortAnswer] = useState('')
  const [explanation, setExplanation] = useState('')

  // 로직 핸들러
  const toggleAnswer = (index: number) => {
    setCorrectAnswers((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
    setCorrectAnswers(
      correctAnswers
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i))
    )
  }

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, ''])
    }
  }

  // const handleSubmit = () => {
  //   let formattedCorrectAnswer = ''

  //   if (type === 'multiple_choice') {
  //     formattedCorrectAnswer = correctAnswers.join(',')
  //   } else if (type === 'true_false') {
  //     formattedCorrectAnswer = correctAnswers[0] === 0 ? 'O' : 'X'
  //   } else if (type === 'ordering') {
  //     formattedCorrectAnswer = correctAnswers.join(',')
  //   } else if (type === 'short_answer') {
  //     formattedCorrectAnswer = shortAnswer
  //   }

  //   const requestBody = {
  //     type,
  //     question,
  //     prompt,
  //     options: type === 'multiple_choice' || type === 'ordering' ? options : [],
  //     blank_count: 0,
  //     correct_answer: formattedCorrectAnswer,
  //     point,
  //     explanation,
  //   }

  //   console.log('Backend RequestBody:', requestBody)

  //   // TODO: 실제 POST 요청 코드 (예: axios.post('/admin/exams/{examId}/questions/', requestBody))
  //   onClose()
  // }

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton size="ml">
      <div className="flex h-[90vh]">
        {/* 왼쪽 섹션: 탭 메뉴 */}
        <Modal.Header className="border-grey-300 h-full w-[220px] border-r px-0">
          <div className="px-5 pb-5">
            <p className="pb-1 text-lg font-semibold">문제 추가하기</p>
            <p className="text-grey-600 text-[10px] font-normal">
              문제 유형을 선택하여 문제를 등록해주세요.
            </p>
          </div>
          <nav className="flex flex-col">
            {QUESTION_TYPES.map((qType) => {
              const isSelected = type === qType.value
              return (
                <button
                  key={qType.value}
                  onClick={() => setType(qType.value as QuestionType)}
                  className={cn(
                    'mb-2 flex cursor-pointer items-center gap-3 px-8 py-2',
                    isSelected
                      ? 'bg-primary-50 text-primary-600 border-primary-600 font-bold'
                      : 'text-grey-500 hover:bg-grey-50 border-transparent'
                  )}
                >
                  <span
                    className={cn(
                      'h-[3px] w-[3px] rounded-full font-normal',
                      isSelected ? 'bg-primary-700' : 'bg-grey-600'
                    )}
                  />
                  <span
                    className={cn(
                      'text-sm font-normal',
                      isSelected ? 'text-primary-700' : 'text-grey-600'
                    )}
                  >
                    {qType.label}
                  </span>
                </button>
              )
            })}
          </nav>
        </Modal.Header>

        {/* 오른쪽 섹션: 폼 입력 영역 */}
        <div className="flex w-[570px] flex-col text-left">
          <Modal.Body className="flex flex-1 flex-col gap-10 overflow-y-auto px-5 py-15">
            {/* 공통 1: 문제 입력 */}
            <QuestionInputSection value={question} onChange={setQuestion} />

            {/* 유형별 : 보기 등록 */}
            <QuestionTypeForm
              type={type}
              options={options}
              setOptions={setOptions}
              correctAnswers={correctAnswers}
              setCorrectAnswers={setCorrectAnswers}
              toggleAnswer={toggleAnswer}
              handleRemoveOption={handleRemoveOption}
              handleAddOption={handleAddOption}
              shortAnswer={shortAnswer}
              setShortAnswer={setShortAnswer}
            />

            {/* 공통 2: 배점 선택 */}
            <PointSection value={point} onChange={setPoint} />

            {/* 공통 3: 지시사항 */}
            <PromptInputSection value={prompt} onChange={setPrompt} />

            {/* 공통 4: 해설 등록 */}
            <ExplanationSection value={explanation} onChange={setExplanation} />
          </Modal.Body>

          {/* 푸터: 등록 버튼 */}
          <div className="flex justify-end pt-4 pr-8 pb-8">
            <Button
              variant="primary"
              className="flex h-[36px] w-[55px] rounded-sm font-normal"
              // onClick={handleSubmit}
            >
              추가
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
