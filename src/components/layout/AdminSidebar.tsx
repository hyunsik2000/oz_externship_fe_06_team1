import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  sidebarSectionButtonVariants,
  sidebarSubmenuItemVariants,
} from '@/constants/variants'
import MemberIcon from '@/assets/icons/Member.svg?react'
import ExamIcon from '@/assets/icons/Exam.svg?react'
import ChevronUpIcon from '@/assets/icons/chevronUp.svg?react'
import ChevronDownIcon from '@/assets/icons/chevronDown.svg?react'

type SectionKey = 'member' | 'exam' | null

const SECTIONS = [
  {
    key: 'member' as const,
    label: '회원관리',
    items: [
      '유저 관리',
      '수강생 관리',
      '수강생 등록 신청',
      '회원 탈퇴 관리',
      '대시보드',
    ],
  },
  {
    key: 'exam' as const,
    label: '쪽지시험 관리',
    items: [
      '쪽지시험 관리',
      '배포 내역 관리',
      '응시 내역 관리',
      '쪽지시험 대시보드',
    ],
  },
]

export function AdminSidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [openSection, setOpenSection] = useState<SectionKey>(() => {
    if (pathname.startsWith('/exam')) return 'exam'
    if (pathname.startsWith('/members')) return 'member'
    return 'exam'
  })

  const toggle = (key: Exclude<SectionKey, null>) => {
    setOpenSection((prev) => (prev === key ? null : key))
  }

  const handleClickItem = (
    sectionKey: Exclude<SectionKey, null>,
    text: string
  ) => {
    if (sectionKey === 'exam' && text === '응시 내역 관리') {
      navigate('/exam/history')
      return
    }

    if (sectionKey === 'exam' && text === '쪽지시험 대시보드') {
      navigate('/exam/dashboard')
    }

    if (sectionKey === 'member' && text === '유저 관리') {
      navigate('/members/management')
      return
    }

    if (sectionKey === 'member' && text === '수강생 등록 신청') {
      navigate('/members/student-registration')
    }

    if (sectionKey === 'member' && text === '대시보드') {
      navigate('/members/dashboard')
    }
  }

  return (
    <aside className="border-grey-300 min-h-screen w-64 shrink-0 border-r bg-white">
      <div className="border-grey-300 text-grey-600 flex h-16 items-center justify-center border-b text-xl font-semibold">
        오즈코딩스쿨 관리자
      </div>

      {SECTIONS.map((section) => {
        const isOpen = openSection === section.key

        return (
          <div key={section.key}>
            <button
              type="button"
              onClick={() => toggle(section.key)}
              aria-expanded={isOpen}
              className={sidebarSectionButtonVariants({ open: isOpen })}
            >
              <div className="flex items-center gap-3">
                {section.key === 'member' ? (
                  <MemberIcon className="text-primary-600 h-6 w-6" />
                ) : (
                  <ExamIcon className="text-primary-600 h-6 w-6" />
                )}
                <span className="font-medium">{section.label}</span>
              </div>

              <span className={isOpen ? 'text-primary-600' : 'text-grey-500'}>
                {isOpen ? (
                  <ChevronUpIcon className="h-3 w-3" />
                ) : (
                  <ChevronDownIcon className="h-3 w-3" />
                )}
              </span>
            </button>

            {isOpen && (
              <ul className="text-grey-700 px-8 pb-3 text-sm">
                {section.items.map((text) => {
                  const isActive =
                    (pathname === '/exam/history' &&
                      section.key === 'exam' &&
                      text === '응시 내역 관리') ||
                    (pathname === '/exam/dashboard' &&
                      section.key === 'exam' &&
                      text === '쪽지시험 대시보드') ||
                    (pathname === '/members/management' &&
                      section.key === 'member' &&
                      text === '유저 관리') ||
                    (pathname === '/members/student-registration' &&
                      section.key === 'member' &&
                      text === '수강생 등록 신청') ||
                    (pathname === '/members/dashboard' &&
                      section.key === 'member' &&
                      text === '대시보드')

                  const isClickable =
                    (section.key === 'exam' &&
                      (text === '응시 내역 관리' ||
                        text === '쪽지시험 대시보드')) ||
                    (section.key === 'member' &&
                      (text === '유저 관리' ||
                        text === '수강생 등록 신청' ||
                        text === '대시보드'))

                  return (
                    <li
                      key={text}
                      className={sidebarSubmenuItemVariants({
                        active: isActive,
                      })}
                    >
                      {isClickable ? (
                        <button
                          type="button"
                          onClick={() => handleClickItem(section.key, text)}
                          className="w-full text-left"
                        >
                          - {text}
                        </button>
                      ) : (
                        <>- {text}</>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </aside>
  )
}
