import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AlertModal, Button, Modal } from '@/components/common'
import type { HistoryItem } from '@/types/history'
import { SolutionViewTrigger } from '@/components/exam-attempt/solution-view'
import { API_PATHS } from '@/constants/api'
import { useAxios, useExamHistoryDetail } from '@/hooks'
import { formatDateTime } from '@/utils'

type ExamAttemptDetailModalProps = {
  open: boolean
  onClose: () => void
  item: HistoryItem | null
  onDeleteConfirm?: (item: HistoryItem) => void
}

export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="border-grey-300 border-t">{children}</div>
}

export function Row2({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="border-grey-300 grid grid-cols-[140px_1fr] border-b">
      <div className="bg-grey-50 text-grey-600 px-4 py-3 text-sm font-medium">
        {label}
      </div>
      <div className="text-grey-600 px-4 py-3 text-sm break-keep">{value}</div>
    </div>
  )
}

export function Row4({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
}: {
  leftLabel: string
  leftValue: ReactNode
  rightLabel: string
  rightValue: ReactNode
}) {
  return (
    <div className="border-grey-300 grid grid-cols-[140px_minmax(0,2fr)_160px_minmax(0,1fr)] border-b">
      <div className="bg-grey-50 text-grey-600 px-4 py-3 text-sm font-medium whitespace-nowrap">
        {leftLabel}
      </div>
      <div className="text-grey-600 px-4 py-3 text-sm break-keep">
        {leftValue}
      </div>

      <div className="bg-grey-50 text-grey-600 px-4 py-3 text-sm font-medium whitespace-nowrap">
        {rightLabel}
      </div>
      <div className="text-grey-600 px-4 py-3 text-sm break-keep">
        {rightValue}
      </div>
    </div>
  )
}

export function ExamAttemptDetailModal({
  open,
  onClose,
  item,
  onDeleteConfirm,
}: ExamAttemptDetailModalProps) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const deleteConfirmRootRef = useRef<HTMLDivElement | null>(null)
  const { sendRequest } = useAxios()

  const submissionId = item?.submission_id ?? null
  const { detail, isLoading } = useExamHistoryDetail(submissionId)

  const target = detail ?? item

  const cohortText = useMemo(() => {
    if (!target) return ''
    return `${target.cohort_number}기`
  }, [target])

  const correctText = useMemo(() => '-', [])

  useEffect(() => {
    if (!open) setDeleteConfirmOpen(false)
  }, [open])

  if (!item) return null

  const handleCloseDetail = () => {
    setDeleteConfirmOpen(false)
    onClose()
  }

  const handleDelete = async () => {
    if (!item) return
    try {
      await sendRequest<void>({
        method: 'DELETE',
        url: API_PATHS.SUBMISSIONS.DETAIL(item.submission_id),
        errorTitle: '응시 내역 삭제에 실패했습니다.',
      })
      onDeleteConfirm?.(item)
      handleCloseDetail()
    } catch {
      // 에러는 useAxios에서 전역 에러 스토어로 처리
    }
  }

  return (
    <>
      <Modal
        isOpen={open}
        onClose={handleCloseDetail}
        size="attemptDetail"
        showCloseButton
        ignoreRefs={[deleteConfirmRootRef]}
        outsideCloseEnabled={!deleteConfirmOpen}
      >
        <Modal.Body className="flex h-full flex-col px-8 pt-8 pb-6">
          <div className="mb-6">
            <h2 className="text-grey-800 text-lg font-bold">
              쪽지시험 응시 상세 조회
            </h2>
            {isLoading && (
              <p className="text-grey-500 mt-1 text-xs">
                상세 정보를 불러오는 중입니다...
              </p>
            )}
          </div>

          <div className="flex flex-grow flex-col space-y-8">
            <section>
              <div className="mt-4 mb-3 flex items-end justify-between">
                <h3 className="text-grey-800 mb-0 text-sm font-bold">
                  쪽지시험 정보
                </h3>
                <SolutionViewTrigger />
              </div>

              <TableWrap>
                <Row2 label="쪽지시험 명" value={target?.exam_title ?? '-'} />
                <Row2 label="과목" value={target?.subject_name ?? '-'} />
                <Row2 label="시험시간" value="-" />
                <Row2
                  label="쪽지시험 오픈 시간"
                  value={
                    target?.started_at ? formatDateTime(target.started_at) : '-'
                  }
                />
                <Row2
                  label="쪽지시험 마감 시간"
                  value={
                    target?.finished_at
                      ? formatDateTime(target.finished_at)
                      : '-'
                  }
                />
              </TableWrap>
            </section>

            <section>
              <div className="mb-3 flex items-end justify-between">
                <h3 className="text-grey-800 mb-0 text-sm font-bold">
                  시험 응시 정보
                </h3>
                <div className="h-9" aria-hidden />
              </div>

              <TableWrap>
                <Row2 label="응시 ID" value={target?.submission_id ?? '-'} />
                <Row2 label="닉네임" value={target?.nickname ?? '-'} />
                <Row2 label="이름" value={target?.name ?? '-'} />

                <Row4
                  leftLabel="과정"
                  leftValue={target?.course_name ?? '-'}
                  rightLabel="기수"
                  rightValue={cohortText}
                />

                <Row4
                  leftLabel="점수"
                  leftValue={target ? `${target.score}점` : '-'}
                  rightLabel="정답수 / 총 문제 수"
                  rightValue={correctText}
                />

                <Row2
                  label="응시 시간"
                  value={
                    target
                      ? `${formatDateTime(target.started_at)} ~ ${formatDateTime(
                          target.finished_at
                        )}`
                      : '-'
                  }
                />
                <Row2
                  label="부정행위 수"
                  value={target?.cheating_count ?? '-'}
                />
              </TableWrap>
            </section>

            <div className="mt-6 flex justify-end">
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

      <div ref={deleteConfirmRootRef}>
        <AlertModal
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          type="danger"
          title="해당 응시 내역을 정말 삭제하시겠습니까?"
          description={`응시내역 삭제시 되돌릴 수 없으며,\n응시 수강생은 해당 시험을 재응시할 수 있습니다.`}
          confirmText="확인"
          showCancel={false}
          onConfirm={handleDelete}
        />
      </div>
    </>
  )
}
