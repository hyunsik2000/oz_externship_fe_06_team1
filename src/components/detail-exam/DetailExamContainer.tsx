import { useState } from 'react'
import type { Swiper as SwiperClass } from 'swiper'
import QuestionList from './QuestionList'
import DetailExamFooter from './DetailExamFooter'
import DetailExamHeader from './DetailExamHeader'
import type { QuestionListResponse } from '@/types/question'

interface DetailExamContainerProps {
  data: QuestionListResponse
}

export default function DetailExamContainer({
  data,
}: DetailExamContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null)
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
    <div className="bg-grey-50 border-grey-300 flex flex-col gap-2 rounded border p-5">
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
