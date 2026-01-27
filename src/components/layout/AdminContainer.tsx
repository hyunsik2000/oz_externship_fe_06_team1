import type { ReactNode } from 'react'

type Props = {
  title: string
  children?: ReactNode
  className?: string
}

export default function AdminContainer({
  title,
  children,
  className = '',
}: Props) {
  return (
    <div
      className={[
        'min-w-0',
        'pt-[65px] pr-[41.5px] pb-[62px] pl-[17.5px]',
        'overflow-x-auto',
        'overflow-y-auto',
        className,
      ].join(' ')}
    >
      <section
        className={[
          'w-[1600px] min-w-[1600px] shrink-0',
          'min-h-[873px]',
          'border border-[var(--color-grey-300)] bg-white',
          'rounded-none',
          'box-border shadow-sm',
        ].join(' ')}
      >
        <div className="text-grey-900 p-6 font-semibold">{title}</div>
        {children}
      </section>
    </div>
  )
}
