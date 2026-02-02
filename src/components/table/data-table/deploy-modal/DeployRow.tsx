import type { ReactNode } from 'react'

export function DeployRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="border-grey-300 flex h-[50px] gap-2 border-b">
      <label className="text-grey-800 bg-grey-50 flex w-50 shrink-0 items-center p-4 text-sm">
        {label}
      </label>
      <div className="flex w-full items-center px-4">{children}</div>
    </div>
  )
}
