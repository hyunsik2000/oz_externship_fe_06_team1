import { Button, FilterButton, Input } from '@/components/common'
import { ExamListLayout } from '@/components/layout'
import ExamList from '@/components/table/ExamList'
import { useState } from 'react'
import ExamModal from '@/components/detail-exam/exam-modal/ExamModal'
import { MOCK_EXAM_LIST_RESPONSE } from '@/mocks/data/table-data/ExamList'

export function ExamListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <ExamListLayout
        title="쪽지시험 조회"
        toolbar={
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex gap-2">
              <Input
                placeholder="검색어를 입력하세요"
                className="h-9 w-[250px]"
              />
              <Button
                variant="secondary"
                onClick={() => {}} // TODO: 검색 기능 추가
                className="h-9 w-[70px] rounded-sm text-sm font-normal"
              >
                조회
              </Button>
            </div>
            <FilterButton />
          </div>
        }
        footer={
          <div className="flex w-full justify-end gap-2">
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              className="h-[36px] w-[55px] rounded-sm text-sm font-normal"
            >
              생성
            </Button>
          </div>
        }
      >
        <ExamList data={MOCK_EXAM_LIST_RESPONSE.exams} />
      </ExamListLayout>

      <ExamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="create"
      />
    </>
  )
}
