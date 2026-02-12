import { useEffect, useState } from 'react'
import {
  AlertModal,
  Button,
  MemberStatusBadge,
  Modal,
  type MemberStatus,
} from '@/components/common'
import type { MemberWithdrawalDetailType } from '@/types'
import {
  TableWrap,
  TableRow,
  ThCell,
  TdCell,
  ProfileImageCell,
  DEFAULT_TABLE_COLUMNS,
} from './MemberDetailTable'
import { formatDate } from '@/utils'

type MemberWithdrawalDetailModalProps = {
  open: boolean
  onClose: () => void
  detail: MemberWithdrawalDetailType | null
  onRecoverConfirm?: (id: number) => void
}

export function MemberWithdrawalDetailModal({
  open,
  onClose,
  detail,
  onRecoverConfirm,
}: MemberWithdrawalDetailModalProps) {
  const [recoverConfirmOpen, setRecoverConfirmOpen] = useState(false)

  useEffect(() => {
    if (!open) setRecoverConfirmOpen(false)
  }, [open])

  if (!detail) return null

  const { user } = detail

  return (
    <>
      <Modal
        isOpen={open}
        onClose={onClose}
        size="memberDetail"
        showCloseButton
        outsideCloseEnabled={!recoverConfirmOpen}
      >
        <Modal.Body className="flex h-full flex-col px-8 pt-8 pb-6 text-left">
          <div className="mb-6">
            <h2 className="text-grey-800 text-lg font-bold">
              탈퇴내역 상세 조회
            </h2>
          </div>

          <div className="flex grow flex-col space-y-10 overflow-y-auto pr-2">
            <section>
              <TableWrap rows={4} columns={DEFAULT_TABLE_COLUMNS}>
                <TableRow>
                  <ProfileImageCell
                    imageUrl={user.profile_img_url}
                    alt={`${user.nickname} 프로필`}
                  />
                  <ThCell>ID</ThCell>
                  <TdCell colSpan={3}>{user.id}</TdCell>
                </TableRow>
                <TableRow>
                  <ThCell>이름</ThCell>
                  <TdCell>{user.name || '-'}</TdCell>
                  <ThCell>성별</ThCell>
                  <TdCell>
                    {user.gender === 'MALE'
                      ? '남'
                      : user.gender === 'FEMALE'
                        ? '여'
                        : '미설정'}
                  </TdCell>
                </TableRow>
                <TableRow>
                  <ThCell>닉네임</ThCell>
                  <TdCell>{user.nickname}</TdCell>
                  <ThCell>생년월일</ThCell>
                  <TdCell>{user.birth_date || '-'}</TdCell>
                </TableRow>
                <TableRow>
                  <ThCell>이메일</ThCell>
                  <TdCell>{user.email}</TdCell>
                  <ThCell>연락처</ThCell>
                  <TdCell>{user.phone || '-'}</TdCell>
                </TableRow>
              </TableWrap>
            </section>

            <section>
              <TableWrap rows={4} columns={DEFAULT_TABLE_COLUMNS}>
                <TableRow>
                  <ThCell>담당/수강 과정</ThCell>
                  <TdCell colSpan={2}>
                    {detail.assigned_courses.map((c, i) => (
                      <div key={i}>{c.course?.name}</div>
                    ))}
                  </TdCell>
                  <ThCell>기수</ThCell>
                  <TdCell colSpan={1}>
                    <div className="flex flex-col gap-1">
                      {detail.assigned_courses.length > 0
                        ? detail.assigned_courses.map((c, i) => (
                            <div key={i}>{c.cohort?.number}기</div>
                          ))
                        : '-'}
                    </div>
                  </TdCell>
                </TableRow>
                <TableRow>
                  <ThCell>가입일</ThCell>
                  <TdCell colSpan={4}>{formatDate(user.created_at)}</TdCell>
                </TableRow>
                <TableRow>
                  <ThCell>권한</ThCell>
                  <TdCell colSpan={4}>{user.role}</TdCell>
                </TableRow>
                <TableRow>
                  <ThCell>회원상태</ThCell>
                  <TdCell colSpan={4}>
                    <MemberStatusBadge status={user.status as MemberStatus} />
                  </TdCell>
                </TableRow>
              </TableWrap>
            </section>

            <section className="space-y-4">
              <h3 className="text-grey-800 text-sm font-bold">
                회원 탈퇴 정보
              </h3>
              <TableWrap rows={4} columns={DEFAULT_TABLE_COLUMNS}>
                <TableRow>
                  <ThCell>탈퇴 요청 ID</ThCell>
                  <TdCell colSpan={4}>{detail.id}</TdCell>
                </TableRow>
                <TableRow>
                  <ThCell>탈퇴 요청 일시</ThCell>
                  <TdCell colSpan={2}>{formatDate(detail.withdrawn_at)}</TdCell>
                  <ThCell>삭제 예정 일시</ThCell>
                  <TdCell colSpan={1}>
                    {detail.due_date ? formatDate(detail.due_date) : '-'}
                  </TdCell>
                </TableRow>
                <TableRow>
                  <ThCell>탈퇴 사유</ThCell>
                  <TdCell colSpan={4}>{detail.reason_display}</TdCell>
                </TableRow>
                <TableRow>
                  <ThCell>탈퇴 상세 사유</ThCell>
                  <TdCell colSpan={4}>{detail.reason_detail || '-'}</TdCell>
                </TableRow>
              </TableWrap>
            </section>

            <div className="flex justify-end pt-8 pb-4">
              <Button
                type="button"
                variant="success"
                className="h-9 w-20 rounded-[3px] text-sm"
                onClick={() => setRecoverConfirmOpen(true)}
              >
                유저 복구
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <AlertModal
        isOpen={recoverConfirmOpen}
        onClose={() => setRecoverConfirmOpen(false)}
        type="confirm"
        title="해당 회원을 복구하시겠습니까?"
        description="복구 시 회원의 상태가 정상(Activated)으로 변경됩니다."
        confirmText="복구"
        showCancel
        onConfirm={() => {
          onRecoverConfirm?.(detail.id)
          onClose()
        }}
      />
    </>
  )
}
