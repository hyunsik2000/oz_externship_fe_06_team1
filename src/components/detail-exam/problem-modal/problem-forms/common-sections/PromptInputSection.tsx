import { FormSectionLayout } from './FormSectionLayout'

// 지문 등록(Prompt) 입력 섹션
export function PromptInputSection({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <FormSectionLayout
      title="지문 등록"
      additionalDescription="지문은 필수 입력값입니다."
    >
      <textarea
        className="border-grey-300 text-grey-600 placeholder:text-grey-600 focus:border-primary-500 h-[70px] w-full resize-none rounded border bg-white p-2 text-sm font-normal outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="지문을 입력해주세요"
      />
    </FormSectionLayout>
  )
}
