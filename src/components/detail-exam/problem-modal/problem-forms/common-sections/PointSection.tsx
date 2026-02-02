import { Dropdown } from '@/components/common/Dropdown'

// 배점 선택 섹션
export function PointSection({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  return (
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
}
