import type { ReactNode } from 'react'
import type { MemberRole } from '@/types'
import imgEditIcon from '@/assets/icons/ImgEdit.svg'

export const DEFAULT_TABLE_COLUMNS =
  '141px 130px minmax(0,1fr) 100px minmax(0,1fr)'

export function TableWrap({
  children,
  rows,
  columns = DEFAULT_TABLE_COLUMNS,
}: {
  children: ReactNode
  rows: number
  columns?: string
}) {
  return (
    <div
      className="border-grey-300 grid w-full border-t border-l bg-white"
      style={{
        gridTemplateColumns: columns,
        gridTemplateRows: `repeat(${rows}, 50px)`,
      }}
    >
      {children}
    </div>
  )
}

export function TableRow({ children }: { children: ReactNode }) {
  return <div className="contents">{children}</div>
}

export function ThCell({
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
      className={`border-grey-300 bg-grey-50 text-grey-600 flex h-full min-h-12 items-center px-4 py-3 text-sm font-medium ${
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

export function TdCell({
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
      className={`border-grey-300 text-grey-600 flex h-full min-h-12 items-center px-4 py-3 text-sm break-keep ${
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

const ROLE_LABEL_MAP: Record<MemberRole, string> = {
  Admin: 'Admin',
  'Staff (TA)': 'Staff (TA)',
  Student: '수강생',
  General: 'General',
  'Staff (LC)': 'Staff (LC)',
  'Staff (OM)': 'Staff (OM)',
}

export function RoleLabel({ role }: { role: MemberRole }) {
  return <span>{ROLE_LABEL_MAP[role] ?? role}</span>
}

export function ProfileImageCell({
  imageUrl,
  alt,
  showEditIcon = false,
  onEditClick,
}: {
  imageUrl: string
  alt: string
  showEditIcon?: boolean
  onEditClick?: () => void
}) {
  return (
    <TdCell rowSpan={4} className="overflow-hidden !p-0">
      <div className="bg-grey-100 relative h-[199px] w-[141px] overflow-hidden">
        <img
          src={imageUrl}
          alt={alt}
          className="block h-full w-full object-cover"
        />
        {showEditIcon && (
          <button
            type="button"
            onClick={onEditClick}
            className="absolute right-2 bottom-2 h-8 w-8 cursor-pointer"
          >
            <img src={imgEditIcon} alt="이미지 수정" className="h-8 w-8" />
          </button>
        )}
      </div>
    </TdCell>
  )
}
