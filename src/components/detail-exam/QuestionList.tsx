import type { QuestionListResponse, Question } from '@/types/question'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'
import {
  ProblemAnswer,
  ProblemExplain,
  ProblemHeader,
  ProblemOption,
  ProblemTitle,
  EmptyProblems,
} from '@/components/detail-exam/problem'
import { Button } from '@/components/common'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import { useState } from 'react'
import ProblemModal from '@/components/detail-exam/problem-modal/ProblemModal'

interface QuestionListProps {
  data: QuestionListResponse
  currentIndex: number
  onSwiper: (swiper: SwiperClass) => void
  onSlideChange: (swiper: SwiperClass) => void
  onNext: () => void
  onPrev: () => void
}

export function QuestionList({
  data,
  currentIndex,
  onSwiper,
  onSlideChange,
  onNext,
  onPrev,
}: QuestionListProps) {
  const totalQuestions = data.questions.length

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [selectedQuestion, setSelectedQuestion] = useState<
    Question | undefined
  >(undefined)

  // 문제 추가 모달 열기
  const handleOpenAddModal = () => {
    setModalMode('create')
    setIsModalOpen(true)
  }

  // 문제 수정 모달 열기
  const handleOpenEditModal = (question: Question) => {
    setModalMode('edit')
    setSelectedQuestion(question)
    setIsModalOpen(true)
  }

  if (totalQuestions === 0) {
    return <EmptyProblems />
  }

  return (
    <>
      <div className="mx-auto flex items-center justify-center gap-10">
        {/* 이전 버튼 */}
        <Button
          size="icon"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="h-12 w-12 rounded-full border-transparent bg-transparent disabled:opacity-0"
        >
          <ChevronLeft className="text-grey-600 h-10 w-10" />
        </Button>

        {/* Swiper 컨테이너 */}
        <div className="h-[600px] w-[1060px] overflow-hidden">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSwiper={onSwiper}
            onSlideChange={onSlideChange}
            allowTouchMove={false}
            className="h-full"
          >
            {data.questions.map((question, i) => (
              <SwiperSlide key={question.id}>
                <div className="text-grey-800 flex h-full flex-col gap-2 rounded-xl border border-[#D9D9D9] bg-white p-7 font-semibold">
                  {/* 1. 문제 헤더 영역 */}
                  <ProblemHeader
                    type={question.type}
                    onAdd={handleOpenAddModal}
                    onEdit={() => handleOpenEditModal(question)}
                    // onDelete={} 삭제 로직 필요 시 추가
                  />

                  <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-3">
                    {/* 2. 문제 제목 영역 */}
                    <ProblemTitle
                      index={i + 1}
                      title={`${question.question} (${question.point}점)`}
                    />

                    {/* 3. 문제 정답 영역 */}
                    <ProblemAnswer answer={question.correct_answer} />

                    {/* 4. 문제 옵션 영역 */}
                    <ProblemOption
                      type={question.type}
                      options={question.options}
                      answer={question.correct_answer}
                    />

                    {/* 5. 문제 해설 영역 */}
                    <ProblemExplain explain={question.explanation} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 다음 버튼 */}
        <Button
          size="icon"
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
          className="h-12 w-12 rounded-full border-transparent bg-transparent disabled:opacity-0"
        >
          <ChevronRight className="text-grey-600 h-10 w-10" />
        </Button>
      </div>

      {/* 문제 추가/수정 모달 */}
      <ProblemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={selectedQuestion}
      />
    </>
  )
}
