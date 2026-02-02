// 레이아웃 래퍼
export function FormSectionLayout({
  title,
  description,
  additionalDescription,
  extra,
  children,
  noContainer = false, // 기본값은 false
}: {
  title: string
  description?: string[]
  additionalDescription?: string
  extra?: React.ReactNode
  children: React.ReactNode
  noContainer?: boolean
}) {
  return (
    <section className="flex flex-col gap-1 text-left">
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <h3 className="text-grey-800 pb-1 text-sm font-semibold">
            {title} <span className="text-primary-700 ml-1 text-[14px]">*</span>
          </h3>
          {description?.map((desc, i) => (
            <p
              key={`desc-${i}`}
              className="text-grey-600 text-[10px] leading-[13px]"
            >
              {desc}
            </p>
          ))}
        </div>
        {extra}
      </div>

      {/* noContainer가 true면 children만, false면 회색 박스 유지 */}
      {noContainer ? (
        children
      ) : (
        <div className="bg-grey-50 mt-1 flex flex-col gap-2 rounded-[4px] p-5">
          {children}
        </div>
      )}
      {additionalDescription && (
        <p className="text-grey-600 text-[10px]">
          <span className="text-primary-700 font-semibold">* </span>
          {additionalDescription}
        </p>
      )}
    </section>
  )
}
