import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
  containerClassName?: string
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function Pagination({
  currentPage,
  totalPages,
  onChange,
  containerClassName,
}: PaginationProps) {
  const safeTotal = Math.max(1, totalPages)
  const safeCurrent = clamp(currentPage, 1, safeTotal)

  const goTo = (page: number) => {
    onChange(clamp(page, 1, safeTotal))
  }

  const pageNumbers = (() => {
    const maxButtons = 5
    const half = Math.floor(maxButtons / 2)

    let start = Math.max(1, safeCurrent - half)
    const end = Math.min(safeTotal, start + maxButtons - 1)

    start = Math.max(1, end - maxButtons + 1)

    const pages: number[] = []
    for (let i = start; i <= end; i += 1) pages.push(i)
    return pages
  })()

  const isFirst = safeCurrent === 1
  const isLast = safeCurrent === safeTotal

  const iconBtnBase =
    'text-gray-500 hover:text-gray-500 focus:text-gray-500 active:text-gray-500 disabled:text-gray-500 disabled:opacity-100 focus:outline-none'

  const containerClass = containerClassName || 'mt-[90px] flex justify-center'

  return (
    <div className={containerClass}>
      <nav
        className="flex items-center justify-center gap-6"
        aria-label="페이지네이션"
      >
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="첫 페이지"
            className={iconBtnBase}
            onClick={() => goTo(1)}
            disabled={isFirst}
          >
            <ChevronsLeft size={28} />
          </button>

          <button
            type="button"
            aria-label="이전 페이지"
            className={iconBtnBase}
            onClick={() => goTo(safeCurrent - 1)}
            disabled={isFirst}
          >
            <ChevronLeft size={28} />
          </button>
        </div>

        <div className="flex items-center gap-10">
          {pageNumbers.map((p) => {
            const isActive = p === safeCurrent

            return (
              <button
                key={p}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => goTo(p)}
                className={
                  isActive
                    ? 'text-[22px] leading-none font-medium text-black underline underline-offset-[7px]'
                    : 'text-[22px] leading-none font-medium text-gray-500'
                }
              >
                {p}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="다음 페이지"
            className={iconBtnBase}
            onClick={() => goTo(safeCurrent + 1)}
            disabled={isLast}
          >
            <ChevronRight size={28} />
          </button>

          <button
            type="button"
            aria-label="마지막 페이지"
            className={iconBtnBase}
            onClick={() => goTo(safeTotal)}
            disabled={isLast}
          >
            <ChevronsRight size={28} />
          </button>
        </div>
      </nav>
    </div>
  )
}
