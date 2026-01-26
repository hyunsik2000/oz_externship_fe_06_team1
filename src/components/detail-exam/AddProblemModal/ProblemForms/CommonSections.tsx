import { Dropdown } from '@/components/common/Dropdown'
import { Plus } from 'lucide-react'

// 1. 문제 입력 섹션
export const QuestionInputSection = ({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) => (
  <section className="flex flex-col gap-2">
    <h3 className="text-grey-800 text-sm font-semibold">
      문제 입력 <span className="text-primary-700 ml-1 text-[14px]">*</span>
    </h3>
    <textarea
      className="border-grey-300 text-grey-600 placeholder:text-grey-600 focus:border-primary-500 h-[70px] w-full resize-none border p-2 text-sm font-normal outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="문제를 입력해주세요"
    />
  </section>
)

// 2. 지시 사항(Prompt) 입력 섹션
export const PromptInputSection = ({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) => (
  <section className="flex flex-col gap-2">
    <h3 className="text-grey-800 text-sm font-semibold">추가 정보</h3>
    <textarea
      className="border-grey-300 text-grey-600 placeholder:text-grey-600 focus:border-primary-500 h-[50px] w-full resize-none border p-2 text-sm font-normal outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="문제에 대한 지시 사항을 입력해주세요. (예: 20글자 이내로 입력하세요.)"
    />
  </section>
)

// 2. 배점 선택 섹션
export const PointSection = ({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) => (
  <section className="flex flex-col gap-2">
    <h3 className="text-grey-800 text-sm font-semibold">
      배점 선택 <span className="text-primary-700 ml-1 text-[14px]">*</span>
    </h3>
    <Dropdown
      options={[
        { label: '5', value: '5' },
        { label: '10', value: '10' },
        { label: '15', value: '15' },
        { label: '20', value: '20' },
      ]}
      value={String(value)}
      onChange={(v) => onChange(Number(v))}
      className="h-[30px] w-[70px] [&_button]:!h-[30px] [&_button]:!w-[70px]"
    />
  </section>
)

// 3. 해설 등록 섹션
export const ExplanationSection = ({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) => (
  <section className="flex flex-col gap-2">
    <h3 className="text-grey-800 text-sm font-semibold">해설 등록</h3>
    <div className="border-grey-300 border">
      <div className="text-grey-800 border-grey-300 bg-grey-50/50 flex gap-6 border-b px-3 py-1 text-xs">
        <span className="flex shrink-0 cursor-default items-center gap-2">
          Normal <Plus size={12} strokeWidth={3} />
        </span>
        <span className="cursor-pointer font-bold">B</span>
        <span className="cursor-pointer italic">i</span>
        <span className="cursor-pointer underline">U</span>
        <span className="cursor-pointer line-through">S</span>
      </div>
      <textarea
        className="placeholder:text-grey-600 focus:bg-grey-50/20 h-44 w-full resize-none p-2 text-sm transition-colors outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="수강생에게 제공할 해설을 작성해주세요"
      />
    </div>
  </section>
)

// 타이틀 레이아웃 래퍼
export const FormSectionLayout = ({
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
}) => (
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
      <>{children}</>
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
