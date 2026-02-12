import { useEffect, useRef, useState } from 'react'
import { AlertModal, Button, Modal } from '@/components/common'
import { type ExamDeploymentItemType } from '@/types'
import { Row2, Row4, TableWrap } from '../exam-attempt'
import { formatDate } from '@/utils'

type ExamDeploymentDetailModalProps = {
  isOpen: boolean
  onClose: () => void
  detail: ExamDeploymentItemType | null
  onDeleteConfirm?: (id: number) => void
}

export function ExamDeploymentDetailModal({
  isOpen,
  onClose,
  detail,
  onDeleteConfirm,
}: ExamDeploymentDetailModalProps) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const deleteConfirmRootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) setDeleteConfirmOpen(false)
  }, [])

  if (!detail) return null

  const {
    id,
    exam_access_url,
    access_code,
    cohort,
    submit_count,
    not_submitted_count,
    duration_time,
    open_at,
    close_at,
    created_at,
    exam,
    subject,
  } = detail

  const totalMemberCount = (submit_count || 0) + (not_submitted_count || 0)

  const handleDelete = () => {
    onDeleteConfirm?.(detail.id)
    setDeleteConfirmOpen(false)
    onClose()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="attemptDetail"
        showCloseButton
        ignoreRefs={[deleteConfirmRootRef]}
        outsideCloseEnabled={!deleteConfirmOpen}
      >
        <Modal.Body className="flex h-full flex-col px-10 pt-10 pb-8 text-left">
          <div className="border-grey-100 mb-8 border-b pb-4">
            <h2 className="text-grey-900 text-xl font-bold">
              쪽지시험 배포 상세 조회
            </h2>
          </div>

          <div className="flex grow flex-col space-y-10 overflow-y-auto pr-1">
            <section className="space-y-4">
              <h3 className="text-grey-800 text-sm font-bold">쪽지시험 정보</h3>
              <TableWrap>
                <Row2 label="쪽지시험 ID" value={exam?.id || '-'} />
                <Row2 label="쪽지시험 명" value={exam?.title || '-'} />
                <Row2 label="과목" value={subject?.name || '-'} />
                <Row2 label="시험 문항" value="-" />
              </TableWrap>
            </section>

            <section className="space-y-4">
              <h3 className="text-grey-800 text-sm font-bold">배포 정보</h3>
              <TableWrap>
                <Row2 label="배포 ID" value={id} />
                <Row2
                  label="시험 응시 링크"
                  value={
                    <a
                      href={exam_access_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary-600 hover:text-primary-700 break-all underline"
                    >
                      {exam_access_url || '-'}
                    </a>
                  }
                />
                <Row2 label="시험 참가 코드" value={access_code || '-'} />
                <Row4
                  leftLabel="응시 대상 과정"
                  leftValue={subject?.name || '-'}
                  rightLabel="응시 대상 기수"
                  rightValue={`${cohort?.number || 0}기`}
                />
                <Row4
                  leftLabel="응시 인원 정보"
                  leftValue={`${submit_count || 0} / ${totalMemberCount} 명`}
                  rightLabel="시험 시간"
                  rightValue={`${duration_time || 0}분`}
                />
                <Row2 label="시작 일시" value={formatDate(open_at)} />
                <Row2 label="종료 일시" value={formatDate(close_at)} />
                <Row2 label="배포 생성 일시" value={formatDate(created_at)} />
              </TableWrap>
            </section>

            <div className="flex justify-end pt-4">
              <Button
                variant="danger"
                className="h-10 w-16 rounded-sm font-bold"
                onClick={() => setDeleteConfirmOpen(true)}
              >
                삭제
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div ref={deleteConfirmRootRef}>
        <AlertModal
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          type="danger"
          title="해당 배포 내역을 삭제하시겠습니까?"
          description={`해당 시험이 활성화되어 있을 경우 즉시 비활성화 되며,\n응시 링크와 참가코드는 만료됩니다.\n해당 배포 내 응시데이터 또한 즉시 삭제되며 되돌릴 수 없습니다.`}
          confirmText="확인"
          showCancel={false}
          onConfirm={handleDelete}
        />
      </div>
    </>
  )
}
