import { useState } from 'react'
import { cn } from '@/lib/cn'

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

export default function AdminSidebar() {
  const [openSection, setOpenSection] = useState<SectionKey>('exam')

  const toggle = (key: Exclude<SectionKey, null>) => {
    setOpenSection((prev) => (prev === key ? null : key))
  }

  return (
    <aside className="border-grey-200 bg-200 w-64 border-r">
      <div className="text-grey-800 px-6 py-6 text-xl font-semibold">
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
              className={cn(
                'flex w-full items-center justify-between px-6 py-4 text-left',
                isOpen ? 'bg-primary-50 text-primary-600' : 'text-grey-800'
              )}
            >
              <div className="flex items-center gap-3">
                {/* 아이콘 자리 */}
                <div className="border-grey-300 h-5 w-5 rounded-sm border" />
                <span className="font-medium">{section.label}</span>
              </div>

              <span className="text-grey-500">{isOpen ? '^' : '˅'}</span>
            </button>

            {isOpen && (
              <ul className="text-grey-700 px-8 pb-3 text-sm">
                {section.items.map((text) => (
                  <li
                    key={text}
                    className={cn(
                      'py-2',
                      // 예시: "쪽지시험 관리" 항목만 강조
                      section.key === 'exam' &&
                        text === '쪽지시험 관리' &&
                        'text-primary-600'
                    )}
                  >
                    - {text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </aside>
  )
}
