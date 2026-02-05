import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  AlertModal,
  Button,
  MemberStatusBadge,
  Modal,
} from '@/components/common'
import ModifyPermissionModal, {
  type Option,
  type PermissionValue,
} from './ModifyPermissionModal'
import { MOCK_MEMBER_DETAIL_MAP } from '@/mocks/data/member-detail'
import type { Member, MemberDetail } from '@/types'
import memberImg from '@/assets/MemberImg.jpeg'

const DEFAULT_MEMBER_IMAGE_URL = memberImg

type MemberDetailModalProps = {
  open: boolean
  onClose: () => void
  member: Member | null
  onDeleteConfirm?: (member: Member) => void
}

const TABLE_COLUMNS = '141px 120px minmax(0,1fr) 100px minmax(0,1fr)'

function TableWrap({ children, rows }: { children: ReactNode; rows: number }) {
  return (
    <div
      className="border-grey-300 grid w-full border-t border-l bg-white"
      style={{
        gridTemplateColumns: TABLE_COLUMNS,
        gridTemplateRows: `repeat(${rows}, minmax(0, auto))`,
      }}
    >
      {children}
    </div>
  )
}

function TableRow({ children }: { children: ReactNode }) {
  return <div className="contents">{children}</div>
}

function ThCell({
  children,
  rowSpan,
  colSpan,
  className,
}: {
  children: ReactNode
  rowSpan?: number
  colSpan?: number
  className?: string
}) {
  return (
    <div
      className={`border-grey-300 bg-grey-50 text-grey-600 flex items-center px-4 py-3 text-sm font-medium ${
        className ?? ''
      } border-r border-b`}
      style={{
        gridRow: rowSpan ? `span ${rowSpan}` : undefined,
        gridColumn: colSpan ? `span ${colSpan}` : undefined,
      }}
    >
      {children}
    </div>
  )
}

function TdCell({
  children,
  rowSpan,
  colSpan,
  className,
}: {
  children: ReactNode
  rowSpan?: number
  colSpan?: number
  className?: string
}) {
  return (
    <div
      className={`border-grey-300 text-grey-600 px-4 py-3 text-sm break-keep ${
        className ?? ''
      } border-r border-b`}
      style={{
        gridRow: rowSpan ? `span ${rowSpan}` : undefined,
        gridColumn: colSpan ? `span ${colSpan}` : undefined,
      }}
    >
      {children}
    </div>
  )
}

function CourseList({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return <span>-</span>

  return (
    <ul className="space-y-1">
      {items.map((course) => (
        <li key={course} className="break-keep">
          {course}
        </li>
      ))}
    </ul>
  )
}

export function MemberDetailModal({
  open,
  onClose,
  member,
  onDeleteConfirm,
}: MemberDetailModalProps) {
  const [permissionModalOpen, setPermissionModalOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const permissionModalRootRef = useRef<HTMLDivElement | null>(null)
  const deleteConfirmRootRef = useRef<HTMLDivElement | null>(null)

  const [permissionValue, setPermissionValue] = useState<PermissionValue>({
    role: '',
    course: '',
    cohort: '',
  })

  const detail = useMemo<MemberDetail | null>(() => {
    if (!member) return null

    return (
      MOCK_MEMBER_DETAIL_MAP[member.id] ?? {
        ...member,
        gender: '미설정',
        phone: '-',
        ongoingCourses: [],
        completedCourses: [],
      }
    )
  }, [member])

  useEffect(() => {
    if (!open) {
      setPermissionModalOpen(false)
      setDeleteConfirmOpen(false)
    }
  }, [open])

  if (!member || !detail) return null

  const handleCloseDetail = () => {
    setPermissionModalOpen(false)
    setDeleteConfirmOpen(false)
    onClose()
  }

  const roleOptions: Option[] = [
    { label: '수강생', value: '수강생' },
    { label: '멘토', value: '멘토' },
    { label: '관리자', value: '관리자' },
  ]

  const courseOptions: Option[] = Array.from(
    new Set([
      ...(detail.ongoingCourses ?? []),
      ...(detail.completedCourses ?? []),
    ])
  ).map((c) => ({ label: c, value: c }))

  const cohortOptions: Option[] = [
    { label: '11기', value: '11기' },
    { label: '12기', value: '12기' },
    { label: '13기', value: '13기' },
  ]

  const openPermissionModal = () => {
    setPermissionValue({
      role: '',
      course: '',
      cohort: '',
    })
    setPermissionModalOpen(true)
  }

  const closePermissionModal = () => setPermissionModalOpen(false)

  const submitPermissionModal = () => {
    setPermissionModalOpen(false)
  }

  return (
    <>
      <Modal
        isOpen={open}
        onClose={handleCloseDetail}
        className="border-grey-200 h-[871px] w-[850px] max-w-none rounded-[6px] border"
        showCloseButton
        ignoreRefs={[permissionModalRootRef]}
        outsideCloseEnabled={!permissionModalOpen && !deleteConfirmOpen}
      >
        <Modal.Body className="flex h-full flex-col px-8 pt-8 pb-6">
          <div className="mb-6">
            <h2 className="text-grey-800 text-lg font-bold">회원정보</h2>
          </div>

          <div className="flex flex-grow flex-col space-y-6">
            <section className="space-y-12">
              <TableWrap rows={4}>
                <TableRow>
                  <TdCell rowSpan={4} className="overflow-hidden !p-0">
                    <div className="bg-grey-100 h-[197px] w-[141px] overflow-hidden">
                      <img
                        src={detail.profileImageUrl ?? DEFAULT_MEMBER_IMAGE_URL}
                        alt={`${detail.nickname} 프로필`}
                        className="block h-[197px] w-[141px] object-cover"
                      />
                    </div>
                  </TdCell>
                  <ThCell>ID</ThCell>
                  <TdCell colSpan={3}>{detail.id}</TdCell>
                </TableRow>

                <TableRow>
                  <ThCell>이름</ThCell>
                  <TdCell>{detail.name}</TdCell>
                  <ThCell>성별</ThCell>
                  <TdCell>{detail.gender ?? '-'}</TdCell>
                </TableRow>

                <TableRow>
                  <ThCell>닉네임</ThCell>
                  <TdCell>{detail.nickname}</TdCell>
                  <ThCell>생년월일</ThCell>
                  <TdCell>{detail.birthDate}</TdCell>
                </TableRow>

                <TableRow>
                  <ThCell>이메일</ThCell>
                  <TdCell>{detail.email}</TdCell>
                  <ThCell>연락처</ThCell>
                  <TdCell>{detail.phone ?? '-'}</TdCell>
                </TableRow>
              </TableWrap>

              <TableWrap rows={5}>
                <TableRow>
                  <ThCell>진행중인 과정</ThCell>
                  <TdCell colSpan={4}>
                    <CourseList items={detail.ongoingCourses} />
                  </TdCell>
                </TableRow>
                <TableRow>
                  <ThCell>종료된 과정</ThCell>
                  <TdCell colSpan={4}>
                    <CourseList items={detail.completedCourses} />
                  </TdCell>
                </TableRow>
                <TableRow>
                  <ThCell>가입일</ThCell>
                  <TdCell colSpan={4}>{detail.joinedAt}</TdCell>
                </TableRow>
                <TableRow>
                  <ThCell>권한</ThCell>
                  <TdCell colSpan={4}>{detail.role}</TdCell>
                </TableRow>
                <TableRow>
                  <ThCell>회원상태</ThCell>
                  <TdCell colSpan={4}>
                    <MemberStatusBadge status={detail.status} />
                  </TdCell>
                </TableRow>
              </TableWrap>
            </section>

            <div className="mt-40 mb-12 flex items-center justify-between">
              <Button
                type="button"
                variant="success"
                className="h-[36px] w-[72px] rounded-[3px]"
                onClick={openPermissionModal}
              >
                권한 변경
              </Button>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="primary"
                  className="h-[36px] w-[55.13px] rounded-[3px]"
                >
                  수정
                </Button>

                <Button
                  type="button"
                  variant="danger"
                  className="h-[36px] w-[55.13px] rounded-[3px]"
                  onClick={() => setDeleteConfirmOpen(true)}
                >
                  삭제
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div ref={deleteConfirmRootRef}>
        <AlertModal
          isOpen={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          type="danger"
          title="해당 회원 정보를 정말 삭제하시겠습니까?"
          description="회원 정보를 삭제하면 다시 되돌릴 수 없습니다."
          confirmText="삭제"
          showCancel
          onConfirm={() => {
            if (!member) return
            onDeleteConfirm?.(member)
            handleCloseDetail()
          }}
        />
      </div>

      <ModifyPermissionModal
        open={permissionModalOpen}
        onClose={closePermissionModal}
        roleOptions={roleOptions}
        courseOptions={courseOptions}
        cohortOptions={cohortOptions}
        value={permissionValue}
        onChange={setPermissionValue}
        onSubmit={submitPermissionModal}
        rootRef={permissionModalRootRef}
      />
    </>
  )
}
