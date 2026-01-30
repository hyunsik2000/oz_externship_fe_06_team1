import { useMemo, useState } from 'react'
import { AlertModal } from '@/components/common/AlertModal'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import type { HistoryItem } from '@/types/history'

type Props = {
  open: boolean
  onClose: () => void
  item: HistoryItem | null
}

function SectionTitle({ children }: { children: string }) {
  return <h3 className="text-grey-800 mb-3 text-sm font-bold">{children}</h3>
}

function TableWrap({ children }: { children: React.ReactNode }) {
  return <div className="border-grey-100 border-y">{children}</div>
}

function Row2({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-grey-100 grid grid-cols-[150px_1fr] border-t first:border-t-0">
      <div className="bg-grey-50 text-grey-700 px-5 py-3 text-sm font-medium">
        {label}
      </div>
      <div className="text-grey-700 px-5 py-3 text-sm break-keep">{value}</div>
    </div>
  )
}

function Row4({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
}: {
  leftLabel: string
  leftValue: React.ReactNode
  rightLabel: string
  rightValue: React.ReactNode
}) {
  return (
    <div className="border-grey-100 grid grid-cols-[150px_minmax(0,2fr)_110px_minmax(0,1fr)] border-t first:border-t-0">
      <div className="bg-grey-50 text-grey-700 px-5 py-3 text-sm font-medium">
        {leftLabel}
      </div>
      <div className="text-grey-700 border-grey-100 border-r px-5 py-3 text-sm break-keep">
        {leftValue}
      </div>

      <div className="bg-grey-50 text-grey-700 px-3 py-3 text-sm font-medium">
        {rightLabel}
      </div>
      <div className="text-grey-700 px-4 py-3 text-sm break-keep">
        {rightValue}
      </div>
    </div>
  )
}

export function ExamAttemptDetailModal({ open, onClose, item }: Props) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const cohortText = useMemo(() => {
    if (!item) return ''
    return `${item.cohort_number}기`
  }, [item])

  const correctText = useMemo(() => '-', [])

  if (!item) return null

  return (
    <>
      <Modal isOpen={open} onClose={onClose} showCloseButton>
        <Modal.Body className="px-10 pt-8 pb-10">
          <div className="mb-8 flex items-start justify-between">
            <h2 className="text-grey-800 text-lg font-bold">
              쪽지시험 응시 상세 조회
            </h2>
          </div>

          <div className="space-y-10">
            <section>
              <SectionTitle>쪽지시험 정보</SectionTitle>
              <TableWrap>
                <Row2 label="쪽지시험 명" value={item.exam_title} />
                <Row2 label="과목" value={item.subject_name} />
                <Row2 label="시험시간" value="-" />
                <Row2 label="쪽지시험 오픈 시간" value="-" />
                <Row2 label="쪽지시험 마감 시간" value="-" />
              </TableWrap>
            </section>

            <section>
              <SectionTitle>시험 응시 정보</SectionTitle>
              <TableWrap>
                <Row2 label="응시 ID" value={item.history_id} />
                <Row2 label="닉네임" value={item.nickname} />
                <Row2 label="이름" value="-" />

                <Row4
                  leftLabel="과정"
                  leftValue={item.course_name}
                  rightLabel="기수"
                  rightValue={cohortText}
                />

                <Row4
                  leftLabel="점수"
                  leftValue={`${item.score}점`}
                  rightLabel="정답수 / 총 문제 수"
                  rightValue={correctText}
                />

                <Row2 label="응시 시간" value="-" />
                <Row2 label="부정행위 수" value={item.cheating_count} />
              </TableWrap>
            </section>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="danger"
                className="w-12 px-0"
                onClick={() => setDeleteConfirmOpen(true)}
              >
                삭제
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <AlertModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        type="danger"
        title="응시 내역을 삭제할까요?"
        description="삭제하면 되돌릴 수 없어요."
        confirmText="삭제"
        cancelText="취소"
        onConfirm={() => {
          setDeleteConfirmOpen(false)
          onClose()
        }}
      />
    </>
  )
}
