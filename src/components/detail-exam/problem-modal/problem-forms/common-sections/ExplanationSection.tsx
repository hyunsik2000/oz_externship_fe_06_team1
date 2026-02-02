import { useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/cn'

// 해설 등록 섹션
export function ExplanationSection({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [mode, setMode] = useState<'write' | 'preview'>('write')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const intoMarkdown = (syntax: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    const before = value.substring(0, start)
    const after = value.substring(end)
    const newValue = `${before}${syntax}${selectedText}${syntax}${after}`

    onChange(newValue)

    // 작업 후 내용이 들어갈 자리까지 포커싱
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + syntax.length, end + syntax.length)
    }, 0)
  }

  const removeMarkdown = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    // 마크다운 서식 제거: **, *, ~~
    const cleanedText = selectedText
      .replace(/\*\*(.*?)\*\*/g, '$1') // ** 제거
      .replace(/\*(.*?)\*/g, '$1') // * 제거
      .replace(/~~(.*?)~~/g, '$1') // ~~ 제거

    const before = value.substring(0, start)
    const after = value.substring(end)
    const newValue = `${before}${cleanedText}${after}`

    onChange(newValue)

    // 작업 후 내용이 들어갈 자리까지 포커싱 -> IntoMarkdown과 같은 매커니즘
    setTimeout(() => {
      textarea.focus()
      const newEnd = start + cleanedText.length
      textarea.setSelectionRange(start, newEnd)
    }, 0)
  }

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-end justify-between">
        <h3 className="text-grey-800 text-sm font-semibold">해설 등록</h3>
        <div className="bg-grey-100 flex rounded p-0.5">
          <button
            type="button"
            onClick={() => setMode('write')}
            className={cn(
              'cursor-pointer rounded px-3 py-1 text-xs font-medium',
              mode === 'write' ? 'text-grey-700 bg-white' : 'text-grey-600'
            )}
          >
            작성
          </button>
          <button
            type="button"
            onClick={() => setMode('preview')}
            className={cn(
              'cursor-pointer rounded px-3 py-1 text-xs font-medium',
              mode === 'preview' ? 'text-grey-700 bg-white' : 'text-grey-600'
            )}
          >
            미리보기
          </button>
        </div>
      </div>

      <div className="border-grey-300 rounded border">
        {mode === 'write' ? (
          <>
            <div className="text-grey-700 border-grey-300 bg-grey-50 flex gap-4 border-b px-3 py-1 text-xs">
              <button
                type="button"
                onClick={removeMarkdown}
                className="border-grey-300 flex cursor-pointer items-center pr-2"
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => intoMarkdown('**')}
                className="cursor-pointer font-bold"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => intoMarkdown('*')}
                className="cursor-pointer italic"
              >
                i
              </button>
              <button
                type="button"
                onClick={() => intoMarkdown('~~')}
                className="cursor-pointer line-through"
              >
                S
              </button>
            </div>
            <textarea
              ref={textareaRef}
              className="placeholder:text-grey-600 h-44 w-full resize-none border-none p-2 text-sm outline-none"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="해설을 작성해주세요."
            />
          </>
        ) : (
          <div className="h-44 w-full p-3 text-sm">
            {value ? (
              <div className="text-grey-800">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {value}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-grey-400 italic">아직 내용이 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
