import type { ReactNode } from 'react'

type AdminContainerProps = {
  title?: string
  children?: ReactNode
  className?: string
}

export default function AdminContainer({
  title,
  children,
  className = '',
}: AdminContainerProps) {
  return (
    <div
      className={[
        'min-w-0',
        'pt-1.5 pl-8',
        'overflow-x-auto',
        'overflow-y-auto',
        className,
      ].join(' ')}
    >
      <section
        className={[
          'w-[1600px] min-w-[1600px] shrink-0',
          'min-h-[873px]',
          'border-grey-300 border bg-white',
          'rounded-none',
          'box-border shadow-sm',
        ].join(' ')}
      >
        {title && (
          <div className="text-grey-800 p-6 font-semibold">{title}</div>
        )}
        {children}
      </section>
    </div>
  )
}
