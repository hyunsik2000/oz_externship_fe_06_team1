import { useRef, useEffect, useState } from 'react'
import { FormSectionLayout } from '@/components/detail-exam/problem-modal/problem-forms/common-sections'
import { Input } from '@/components/common'
import PlusSquare from '@/assets/icons/plusSquare.svg?react'
import { X } from 'lucide-react'

// 지문 등록(Prompt) 입력 섹션
export function PromptInputSection({
  value,
  onChange,
  showAddBlank = true,
}: {
  value: string
  onChange: (v: string) => void
  showAddBlank?: boolean
}) {
  const [lines, setLines] = useState<string[]>([''])
  const focusedIndexRef = useRef<number | null>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // 외부 value (string)를 내부 lines (string[])로 동기화
  useEffect(() => {
    if (value) {
      const splitValue = value.split('\n')
      // 현재 상태와 다를 때만 업데이트 (무한 루프 방지)
      if (splitValue.join('\n') !== lines.join('\n')) {
        setLines(splitValue)
      }
    } else if (lines.length === 0 || (lines.length === 1 && lines[0] !== '')) {
      // 초기화 로직 (필요 시)
      setLines([''])
    }
  }, [value, lines])

  const handleLineChange = (index: number, newValue: string) => {
    const newLines = [...lines]
    newLines[index] = newValue
    setLines(newLines)
    onChange(newLines.join('\n'))
  }

  const handleAddLine = () => {
    const newLines = [...lines, '']
    setLines(newLines)
    onChange(newLines.join('\n'))
  }

  const handleRemoveLine = (index: number) => {
    if (lines.length > 1) {
      const newLines = lines.filter((_, i) => i !== index)
      setLines(newLines)
      onChange(newLines.join('\n'))
    } else {
      setLines([''])
      onChange('')
    }
  }

  const handleAddBlank = () => {
    const index = focusedIndexRef.current ?? lines.length - 1
    const targetInput = inputRefs.current[index]

    if (targetInput) {
      const start = targetInput.selectionStart ?? 0
      const end = targetInput.selectionEnd ?? 0
      const currentText = lines[index]

      const newText =
        currentText.substring(0, start) + '__' + currentText.substring(end)

      // 상태 업데이트
      handleLineChange(index, newText)

      // 커서 위치 조정 (setTimeout을 사용하여 렌더링 후 적용)
      setTimeout(() => {
        targetInput.focus()
        targetInput.setSelectionRange(start + 2, start + 2)
      }, 0)
    }
  }

  return (
    <FormSectionLayout
      title="지문 등록"
      description={[
        '항목별로 지문을 등록해주세요.',
        '개행이 필요한 경우 지문을 추가해주세요.',
      ]}
      additionalDescription="지문은 필수 입력값입니다."
      extra={
        <div className="flex gap-3">
          {showAddBlank && (
            <button
              onClick={handleAddBlank}
              className="text-primary-700 flex cursor-pointer items-center gap-1 text-[11px]"
            >
              <PlusSquare className="h-[13px] w-[13px]" />
              빈칸 추가하기
            </button>
          )}
          <button
            onClick={handleAddLine}
            className="text-primary-700 flex cursor-pointer items-center gap-1 text-[11px]"
          >
            <PlusSquare className="h-[13px] w-[13px]" />
            지문 추가하기
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        {lines.map((line, index) => (
          <div key={`prompt-line-${index}`} className="flex items-center gap-2">
            <span className="text-grey-600 w-4 text-xs">{index + 1}.</span>
            <div className="flex-1">
              <Input
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                className="h-[30px]"
                value={line}
                onChange={(e) => handleLineChange(index, e.target.value)}
                onFocus={() => (focusedIndexRef.current = index)}
                placeholder="지문을 입력해주세요"
              />
            </div>
            <button
              onClick={() => handleRemoveLine(index)}
              className="text-grey-600 hover:text-error-400 cursor-pointer transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </FormSectionLayout>
  )
}
