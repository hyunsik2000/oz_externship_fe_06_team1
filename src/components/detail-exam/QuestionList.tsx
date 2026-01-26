import type { QuestionListResponse } from '@/types/question'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'
import {
  ProblemAnswer,
  ProblemExplain,
  ProblemHeader,
  ProblemOption,
  ProblemTitle,
} from './problem'
import { Button } from '@/components/common/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import EmptyProblems from './problem/EmptyProblems'

interface QuestionListProps {
  data: QuestionListResponse
  currentIndex: number
  onSwiper: (swiper: SwiperClass) => void
  onSlideChange: (swiper: SwiperClass) => void
  onNext: () => void
  onPrev: () => void
}

export default function QuestionList({
  data,
  currentIndex,
  onSwiper,
  onSlideChange,
  onNext,
  onPrev,
}: QuestionListProps) {
  const totalQuestions = data.questions.length

  if (totalQuestions === 0) {
    return <EmptyProblems />
  }

  return (
    <div className="mx-auto flex items-center justify-center gap-10">
      {/* 이전 버튼 */}
      <Button
        variant="outline"
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
                <ProblemHeader type={question.type} />

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
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={currentIndex === totalQuestions - 1}
        className="h-12 w-12 rounded-full border-transparent bg-transparent disabled:opacity-0"
      >
        <ChevronRight className="text-grey-600 h-10 w-10" />
      </Button>
    </div>
  )
}
