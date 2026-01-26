import EmptyFace from '@/assets/icons/EmptyFace.svg?react'
import ProblemHeader from './ProblemHeader'

export default function EmptyProblems() {
  return (
    <div className="mx-auto flex h-[600px] w-[1060px] flex-col rounded-xl border border-[#D9D9D9] bg-white p-7 shadow-sm">
      <ProblemHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <EmptyFace />
        <div className="flex flex-col gap-2 text-center">
          <h3 className="text-grey-800 text-lg font-semibold">
            등록된 문제가 없습니다.
          </h3>
          <p className="text-grey-600">
            수강생들이 학습할 수 있도록 문제를 등록해주세요!
          </p>
        </div>
      </div>
    </div>
  )
}
