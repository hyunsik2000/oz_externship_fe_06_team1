import type { ReactNode } from 'react'
import { AdminContainer } from '@/components/layout/AdminContainer'

type ExamListLayoutProps = {
  title: string
  description?: string
  headerRight?: ReactNode
  toolbar?: ReactNode
  children: ReactNode
  footer?: ReactNode
}

export function ExamListLayout({
  title,
  description,
  headerRight,
  toolbar,
  children,
  footer,
}: ExamListLayoutProps) {
  return (
    <AdminContainer>
      <div className="bg-white p-10">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-grey-800 mb-1 text-lg font-semibold">
              {title}
            </h2>
            {description && (
              <p className="text-grey-600 text-sm">{description}</p>
            )}
          </div>

          {headerRight && <div className="shrink-0">{headerRight}</div>}
        </div>

        {toolbar && (
          <div className="mb-6 flex items-center gap-3">{toolbar}</div>
        )}

        <div className="w-full">{children}</div>

        {footer && (
          <div className="mt-20 flex w-full justify-end">{footer}</div>
        )}
      </div>
    </AdminContainer>
  )
}
