import { useState } from 'react'
import { DetailExamContainer } from '@/components/detail-exam'
import ExamModal from '@/components/detail-exam/exam-modal/ExamModal'
import { AlertModal, Button } from '@/components/common'
import { ExamHistoryLayout } from '@/components/layout'
import { MOCK_QUESTION_LIST_RESPONSE } from '@/mocks/data/exam-data/QuestionList'

export function DetailExamPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const examData = MOCK_QUESTION_LIST_RESPONSE
  const BUTTON_STYLE = 'h-[36px] w-[55px] rounded-sm font-normal text-sm'

  const handleDelete = () => {
    // 추후에 DELETE API 호출 할 곳
    setIsDeleteModalOpen(false)
  }

  return (
    <>
      <ExamHistoryLayout
        title="쪽지시험 상세조회"
        headerRight={
          <div className="flex gap-2">
            <Button
              variant="success"
              onClick={() => setIsModalOpen(true)}
              className={BUTTON_STYLE}
            >
              수정
            </Button>
            <Button
              variant="danger"
              onClick={() => setIsDeleteModalOpen(true)}
              className={BUTTON_STYLE}
            >
              삭제
            </Button>
          </div>
        }
      >
        <DetailExamContainer data={examData} />
      </ExamHistoryLayout>

      <ExamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="edit"
        initialData={{
          title: examData.title,
          subject_name: examData.subject.title,
          logo_url: examData.thumbnail_img_url,
        }}
      />

      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        type="danger"
        title="해당 쪽지시험을 정말 삭제하시겠습니까?"
        description="쪽지시험 삭제시 되돌릴 수 없으며, 시험에 포함된 문제 내역까지 모두 삭제됩니다."
        onConfirm={handleDelete}
        confirmText="삭제"
        cancelText="취소"
      />
    </>
  )
}
