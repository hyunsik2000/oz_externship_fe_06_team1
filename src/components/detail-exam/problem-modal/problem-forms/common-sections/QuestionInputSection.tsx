// 문제 입력 섹션
export function QuestionInputSection({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-grey-800 text-sm font-semibold">
        문제 입력 <span className="text-primary-700 ml-1 text-[14px]">*</span>
      </h3>
      <textarea
        id="question"
        className="border-grey-300 text-grey-600 placeholder:text-grey-600 focus:border-primary-500 h-[70px] w-full resize-none border p-2 text-sm font-normal outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="문제를 입력해주세요"
      />
    </section>
  )
}
