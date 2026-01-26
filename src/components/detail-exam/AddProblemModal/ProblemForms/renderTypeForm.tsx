import type { QuestionType } from '@/types/question'
import {
  MultipleChoiceForm,
  OXForm,
  OrderingForm,
  ShortAnswerForm,
} from './index'

interface QuestionTypeFormProps {
  type: QuestionType
  options: string[]
  setOptions: (options: string[]) => void
  correctAnswers: number[]
  setCorrectAnswers: (answers: number[]) => void
  toggleAnswer: (index: number) => void
  handleRemoveOption: (index: number) => void
  handleAddOption: () => void
  shortAnswer: string
  setShortAnswer: (answer: string) => void
}

export const QuestionTypeForm = ({
  type,
  options,
  setOptions,
  correctAnswers,
  setCorrectAnswers,
  toggleAnswer,
  handleRemoveOption,
  handleAddOption,
  shortAnswer,
  setShortAnswer,
}: QuestionTypeFormProps) => {
  switch (type) {
    case 'multiple_choice':
      return (
        <MultipleChoiceForm
          options={options}
          setOptions={setOptions}
          correctAnswers={correctAnswers}
          toggleAnswer={toggleAnswer}
          handleRemoveOption={handleRemoveOption}
          handleAddOption={handleAddOption}
        />
      )
    case 'ox':
      return (
        <OXForm
          correctAnswer={correctAnswers[0] === 0 ? 'O' : 'X'}
          setCorrectAnswer={(ans) => setCorrectAnswers([ans === 'O' ? 0 : 1])}
        />
      )
    case 'ordering':
      return (
        <OrderingForm
          options={options}
          setOptions={setOptions}
          correctAnswers={correctAnswers}
          setCorrectAnswers={setCorrectAnswers}
          handleRemoveOption={handleRemoveOption}
          handleAddOption={handleAddOption}
        />
      )
    case 'short_answer':
      return (
        <ShortAnswerForm
          correctAnswer={shortAnswer}
          setCorrectAnswer={setShortAnswer}
        />
      )
    default:
      return (
        <div className="bg-grey-50 text-grey-400 rounded p-10 text-center text-sm">
          준비 중입니다.
        </div>
      )
  }
}
