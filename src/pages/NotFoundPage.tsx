import NotFoundIcon from '@/assets/404.svg?react'
import { Button } from '@/components/common/Button'
import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <div className="flex w-full flex-col p-8 text-center">
      <NotFoundIcon className="mx-auto h-auto max-w-full" />
      <p className="text-grey-800 mb-6 text-3xl font-bold">
        죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.
      </p>
      <div className="flex h-28 flex-col items-center gap-8 text-center">
        <p className="text-grey-600 px-2 text-sm sm:px-4 md:px-16 md:text-base lg:px-32">
          방문하시려는 페이지의 주소가 잘못 입력되었거나, 삭제되어 사용하실 수
          없습니다.
          <br />
          입력하신 주소가 정확한지 다시 한번 확인해 주세요.
        </p>
        <Link to="/">
          <Button size="lg" variant="confirm" className="w-32 py-2">
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  )
}
