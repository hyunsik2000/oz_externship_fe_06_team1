import { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DetailExamContainer } from '@/components/detail-exam'
import ExamModal from '@/components/detail-exam/exam-modal/ExamModal'
import { AlertModal, Button, TableSkeleton } from '@/components/common'
import { ExamHistoryLayout } from '@/components/layout'
import { useAxios } from '@/hooks'
import { API_PATHS } from '@/constants/api'
import type { QuestionsList } from '@/types/question'
import { useToastStore } from '@/store'

export function DetailExamPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [data, setData] = useState<QuestionsList | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { sendRequest, isLoading } = useAxios()
  const BUTTON_STYLE = 'h-[36px] w-[55px] rounded-sm font-normal text-sm'

  const fetchDetail = useCallback(async () => {
    if (!id) return
    const response = await sendRequest<QuestionsList>({
      method: 'GET',
      url: API_PATHS.EXAM.DETAIL(id),
    })
    if (response) {
      setData(response)
    }
  }, [id, sendRequest])

  useEffect(() => {
    fetchDetail()
  }, [fetchDetail])

  const handleDelete = async () => {
    if (!id) return

    const success = await sendRequest(
      {
        method: 'DELETE',
        url: API_PATHS.EXAM.DETAIL(id),
      },
      {
        onError: (error) => {
          error.mode = 'toast'
          error.message = '쪽지시험 삭제에 실패했습니다.'
        },
      }
    )

    if (success) {
      useToastStore.getState().showToast({
        message: '쪽지시험이 삭제되었습니다.',
        variant: 'success',
      })
      setIsDeleteModalOpen(false)
      navigate('/exam/list')
    }
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
              disabled={isLoading || !data}
            >
              수정
            </Button>
            <Button
              variant="danger"
              onClick={() => setIsDeleteModalOpen(true)}
              className={BUTTON_STYLE}
              disabled={isLoading || !data}
            >
              삭제
            </Button>
          </div>
        }
      >
        {isLoading && !data ? (
          <TableSkeleton rows={1} rowHeight={700} />
        ) : (
          data && <DetailExamContainer data={data} onSuccess={fetchDetail} />
        )}
      </ExamHistoryLayout>

      {data && (
        <ExamModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode="edit"
          id={id}
          onSuccess={fetchDetail}
          initialData={{
            title: data.title,
            subject_id: data.subject.id,
            logo_url: data.thumbnail_img_url,
          }}
        />
      )}

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
