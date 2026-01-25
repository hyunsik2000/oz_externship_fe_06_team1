import { useState } from 'react'
import type { Swiper as SwiperClass } from 'swiper'
import QuestionList from './QuestionList'
import DetailExamFooter from './DetailExamFooter'
import DetailExamHeader from './DetailExamHeader'
import {
  MOCK_EMPTY_QUESTION_LIST_RESPONSE,
  // MOCK_QUESTION_LIST_RESPONSE,
} from '@/mocks/exam-data/QuestionList'

export default function DetailExamContainer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null)

  // const data = MOCK_QUESTION_LIST_RESPONSE // 문제 데이터가 있을 때
  const data = MOCK_EMPTY_QUESTION_LIST_RESPONSE // 문제 데이터가 없을 때

  const totalQuestions = data.questions.length
  const isEmpty = totalQuestions === 0

  const handleNext = () => {
    if (swiperRef && !isEmpty) {
      swiperRef.slideNext()
    }
  }

  const handlePrev = () => {
    if (swiperRef && !isEmpty) {
      swiperRef.slidePrev()
    }
  }

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.activeIndex)
  }

  return (
    <div className="bg-grey-50 border-grey-300 flex h-[780px] w-full min-w-[1200px] flex-col gap-2 overflow-hidden rounded border p-5">
      <DetailExamHeader data={data} />
      <div className="flex flex-1 items-center justify-center">
        <QuestionList
          data={data}
          currentIndex={currentIndex}
          onSwiper={setSwiperRef}
          onSlideChange={handleSlideChange}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
      {!isEmpty && (
        <DetailExamFooter
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
        />
      )}
    </div>
  )
}
