import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Button,
  Dropdown,
  Input,
  Modal,
  MemberStatusBadge,
} from '@/components/common'
import type { MemberDetail } from '@/types'
import memberImg from '@/assets/MemberImg.jpeg'
import { MOCK_MEMBER_LIST_RESPONSE } from '@/mocks/data/table-data/MemberList'
import nicknameOverlapAlert from '@/assets/icons/NicknameOverlapAlert.svg'
import { inputVariants } from '@/constants/variants'
import { cn } from '@/lib/cn'
import { formatDateTime } from '@/utils/dateUtils'
import {
  TableWrap,
  TableRow,
  ThCell,
  TdCell,
  ProfileImageCell,
  RoleLabel,
} from './MemberDetailTable'

type Option = { label: string; value: string }

type MemberEditModalProps = {
  open: boolean
  onClose: () => void
  onSave?: () => void
  detail: MemberDetail | null
  courseOptions: Option[]
  cohortOptions: Option[]
}

type EditValue = {
  name: string
  nickname: string
  email: string
  phone: string
  gender: string
  course: string
  cohort: string
  birthDate: string
}

const DEFAULT_MEMBER_IMAGE_URL = memberImg
const DETAIL_TABLE_COLUMNS = '141px 130px minmax(0,1fr) 100px minmax(0,1fr)'
const META_TABLE_COLUMNS =
  '141px minmax(0,1fr) minmax(0,1fr) 100px minmax(0,1fr)'

const GENDER_OPTIONS: Option[] = [
  { label: '남', value: '남' },
  { label: '여', value: '여' },
  { label: '미설정', value: '미설정' },
]

/** 닉네임 형식: 2~12자, 영문 소문자/숫자/밑줄/한글 */
const NICKNAME_REGEX = /^[a-z0-9_가-힣ㄱ-ㅎㅏ-ㅣ]{2,12}$/
const isValidNicknameFormat = (s: string) => NICKNAME_REGEX.test(s.trim())

const normalizeDateValue = (value?: string) => {
  if (!value) return ''
  return value.includes('.') ? value.replace(/\./g, '-') : value
}

export function MemberEditModal({
  open,
  onClose,
  onSave,
  detail,
  courseOptions,
  cohortOptions,
}: MemberEditModalProps) {
  const [value, setValue] = useState<EditValue>({
    name: '',
    nickname: '',
    email: '',
    phone: '',
    gender: '',
    course: '',
    cohort: '',
    birthDate: '',
  })
  const [isNicknameFocused, setIsNicknameFocused] = useState(false)
  const imageInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!open || !detail) return
    setValue({
      name: detail.name ?? '',
      nickname: detail.nickname ?? '',
      email: detail.email ?? '',
      phone: detail.phone ?? '',
      gender: detail.gender ?? '미설정',
      course: courseOptions[0]?.value ?? '',
      cohort: cohortOptions[0]?.value ?? '',
      birthDate: normalizeDateValue(detail.birthDate),
    })
  }, [open, detail, courseOptions, cohortOptions])

  const isNicknameDuplicate = useMemo(() => {
    const nickname = value.nickname.trim()
    if (!nickname) return false
    if (nickname === (detail?.nickname ?? '')) return false
    return MOCK_MEMBER_LIST_RESPONSE.members.some(
      (member) => member.nickname === nickname
    )
  }, [value.nickname, detail?.nickname])

  const isValidNickname = useMemo(
    () => isValidNicknameFormat(value.nickname) && !isNicknameDuplicate,
    [value.nickname, isNicknameDuplicate]
  )

  const nicknameError = useMemo(() => {
    const trimmed = value.nickname.trim()
    if (!trimmed) return ''
    if (isNicknameDuplicate) return '이미 존재하는 닉네임입니다.'
    if (!isValidNicknameFormat(value.nickname))
      return '닉네임은 2~12자, 영문 소문자/숫자/밑줄(_)/한글만 사용할 수 있어요.'
    return ''
  }, [value.nickname, isNicknameDuplicate])

  const imageUrl = detail?.profileImageUrl ?? DEFAULT_MEMBER_IMAGE_URL
  const openImagePicker = () => imageInputRef.current?.click()

  const canSubmit = useMemo(
    () =>
      Boolean(
        value.name &&
          value.nickname &&
          value.email &&
          value.phone &&
          value.gender &&
          value.course &&
          value.cohort &&
          value.birthDate
      ) && !isNicknameDuplicate,
    [value, isNicknameDuplicate]
  )

  if (!detail) return null

  return (
    <Modal isOpen={open} onClose={onClose} size="memberDetail" showCloseButton>
      <Modal.Body className="flex h-full flex-col px-8 pt-8 pb-6">
        <div className="mb-6">
          <h2 className="text-grey-800 text-lg font-bold">회원정보 수정</h2>
        </div>

        <div className="flex flex-grow flex-col space-y-6">
          <section className="space-y-12">
            <TableWrap rows={4} columns={DETAIL_TABLE_COLUMNS}>
              <TableRow>
                <ProfileImageCell
                  imageUrl={imageUrl}
                  alt={`${detail.nickname} 프로필`}
                  showEditIcon
                  onEditClick={openImagePicker}
                />
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
                <ThCell>ID</ThCell>
                <TdCell colSpan={3}>{detail.id}</TdCell>
              </TableRow>

              <TableRow>
                <ThCell>이름</ThCell>
                <TdCell>
                  <Input
                    size="sm"
                    value={value.name}
                    onChange={(e) =>
                      setValue((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </TdCell>
                <ThCell>성별</ThCell>
                <TdCell>
                  <Dropdown
                    options={GENDER_OPTIONS}
                    value={value.gender}
                    onChange={(gender) =>
                      setValue((prev) => ({ ...prev, gender }))
                    }
                  />
                </TdCell>
              </TableRow>

              <TableRow>
                <ThCell>닉네임</ThCell>
                <TdCell>
                  <div className="w-full space-y-1.5 text-left">
                    <div className="relative">
                      <input
                        value={value.nickname}
                        onChange={(e) =>
                          setValue((prev) => ({
                            ...prev,
                            nickname: e.target.value,
                          }))
                        }
                        onFocus={() => setIsNicknameFocused(true)}
                        onBlur={() => setIsNicknameFocused(false)}
                        className={cn(
                          inputVariants({
                            status: nicknameError ? 'error' : 'default',
                            size: 'sm',
                            className: 'pr-10',
                          }),
                          'pl-3'
                        )}
                      />
                      {(isNicknameFocused || nicknameError) &&
                        !isValidNickname && (
                          <div className="absolute top-1/2 right-3 -translate-y-1/2">
                            <div className="relative">
                              <img
                                src={nicknameOverlapAlert}
                                alt="닉네임 안내"
                                className="h-4 w-4"
                              />
                              <div
                                className={cn(
                                  'absolute right-0 bottom-full z-10 mb-2 w-[260px] rounded-md border bg-white px-3 py-2 text-xs shadow-sm',
                                  nicknameError
                                    ? 'border-error-400 text-error-400'
                                    : 'border-grey-200 text-grey-700'
                                )}
                              >
                                {nicknameError ||
                                  '닉네임은 2~12자, 영문 소문자/숫자/밑줄(_)/한글만 사용할 수 있어요.'}
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </TdCell>
                <ThCell>생년월일</ThCell>
                <TdCell>
                  <Input
                    size="sm"
                    type="date"
                    value={value.birthDate}
                    className="cursor-pointer"
                    onChange={(e) =>
                      setValue((prev) => ({
                        ...prev,
                        birthDate: e.target.value,
                      }))
                    }
                    onClick={(e) => e.currentTarget.showPicker?.()}
                  />
                </TdCell>
              </TableRow>

              <TableRow>
                <ThCell>이메일</ThCell>
                <TdCell>
                  <Input
                    size="sm"
                    value={value.email}
                    onChange={(e) =>
                      setValue((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </TdCell>
                <ThCell>연락처</ThCell>
                <TdCell>
                  <Input
                    size="sm"
                    value={value.phone}
                    onChange={(e) =>
                      setValue((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                </TdCell>
              </TableRow>
            </TableWrap>

            <TableWrap rows={4} columns={META_TABLE_COLUMNS}>
              <TableRow>
                <ThCell>과정</ThCell>
                <TdCell colSpan={2}>
                  <Dropdown
                    options={courseOptions}
                    value={value.course}
                    onChange={(course) =>
                      setValue((prev) => ({ ...prev, course }))
                    }
                  />
                </TdCell>
                <ThCell>기수</ThCell>
                <TdCell>
                  <Dropdown
                    options={cohortOptions}
                    value={value.cohort}
                    onChange={(cohort) =>
                      setValue((prev) => ({ ...prev, cohort }))
                    }
                  />
                </TdCell>
              </TableRow>

              <TableRow>
                <ThCell>가입일</ThCell>
                <TdCell colSpan={4}>{formatDateTime(detail.joinedAt)}</TdCell>
              </TableRow>

              <TableRow>
                <ThCell>권한</ThCell>
                <TdCell colSpan={4}>
                  <RoleLabel role={detail.role} />
                </TdCell>
              </TableRow>

              <TableRow>
                <ThCell>회원상태</ThCell>
                <TdCell colSpan={4}>
                  <MemberStatusBadge status={detail.status} />
                </TdCell>
              </TableRow>
            </TableWrap>
          </section>
        </div>
      </Modal.Body>

      <Modal.Footer className="bg-white px-8 pb-6">
        <Button
          variant="primary"
          size="search"
          className="h-[36px] w-[55px] rounded-[3px]"
          disabled={!canSubmit}
          onClick={() => {
            onSave?.()
            onClose()
          }}
        >
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
