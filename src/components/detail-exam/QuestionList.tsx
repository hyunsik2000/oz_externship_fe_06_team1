import type { QuestionsList, Question } from '@/types/question'
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
import 'swiper/css'
import { useState } from 'react'
import ProblemModal from '@/components/detail-exam/problem-modal/ProblemModal'
import { AlertModal, Button } from '@/components/common'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useQuestionActions } from '@/hooks/problem-form/useQuestionActions'

interface QuestionListProps {
  data: QuestionsList
  currentIndex: number
  onSwiper: (swiper: SwiperClass) => void
  onSlideChange: (swiper: SwiperClass) => void
  onNext: () => void
  onPrev: () => void
  onSuccess?: () => void
}

export function QuestionList({
  data,
  currentIndex,
  onSwiper,
  onSlideChange,
  onNext,
  onPrev,
  onSuccess,
}: QuestionListProps) {
  const questionCount = data.questions.length
  const totalScore = data.questions.reduce((sum, q) => sum + q.point, 0)

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [selectedQuestion, setSelectedQuestion] = useState<
    Question | undefined
  >(undefined)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState<number | null>(null)

  const { deleteQuestion, isLoading: isDeleting } = useQuestionActions()

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

  // 문제 삭제 확인 모달 열기
  const handleOpenDeleteModal = (id: number) => {
    setQuestionToDelete(id)
    setIsDeleteModalOpen(true)
  }

  // 문제 삭제 처리
  const handleConfirmDelete = async () => {
    if (questionToDelete) {
      const success = await deleteQuestion(questionToDelete)
      if (success) {
        setIsDeleteModalOpen(false)
        onSuccess?.()
      }
    }
  }

  if (questionCount === 0) {
    return <EmptyProblems examId={data.id} onSuccess={onSuccess} />
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
              <SwiperSlide key={question.question_id}>
                <div className="text-grey-800 flex h-full flex-col gap-2 rounded-xl border border-[#D9D9D9] bg-white p-7 font-semibold">
                  {/* 1. 문제 헤더 영역 */}
                  <ProblemHeader
                    type={question.type}
                    onAdd={handleOpenAddModal}
                    onEdit={() => handleOpenEditModal(question)}
                    onDelete={() => handleOpenDeleteModal(question.question_id)}
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
                      prompt={question.prompt}
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
          disabled={currentIndex === questionCount - 1}
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
        questionCount={questionCount}
        totalScore={totalScore}
        examId={data.id}
        onSuccess={onSuccess}
      />

      {/* 문제 삭제 확인 모달 */}
      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        type="danger"
        title="문제를 삭제하시겠습니까?"
        description="삭제된 문제는 복구할 수 없습니다."
        onConfirm={handleConfirmDelete}
        confirmText={isDeleting ? '삭제 중...' : '삭제'}
        cancelText="취소"
      />
    </>
  )
}
