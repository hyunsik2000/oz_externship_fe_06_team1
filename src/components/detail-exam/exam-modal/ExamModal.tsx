import { useEffect, useState } from 'react'
import { Modal, Button, Input, Dropdown } from '@/components/common'

interface ExamModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'edit'
  initialData?: {
    title: string
    subject_name: string
    logo_url: string
  }
}

export default function ExamModal({
  isOpen,
  onClose,
  mode,
  initialData,
}: ExamModalProps) {
  const [title, setTitle] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [logo, setLogo] = useState<File | string | null>(null)

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setTitle(initialData.title)
      setSubject(initialData.subject_name)
      setLogo(initialData.logo_url)
    }
  }, [mode, initialData])

  const handleSubmit = () => {}

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton size="ml">
      <div className="flex h-full w-full flex-col">
        {/* 제목 */}
        <Modal.Header className="border-grey-100 flex flex-col gap-1 border-b px-8 pt-8 pb-4">
          <span className="text-grey-800 text-lg font-semibold">
            {mode === 'edit' ? '쪽지시험 수정' : '쪽지시험 생성'}
          </span>
        </Modal.Header>

        {/* 폼 입력 영역 */}
        <Modal.Body>
          <div className="flex flex-col">
            {/* 제목 입력 */}
            <div className="border-grey-300 flex h-[50px] gap-2 border-t border-b">
              <label className="text-grey-800 bg-grey-50 w-50 p-4 text-sm">
                제목
              </label>
              <div className="flex items-center">
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="시험 제목을 입력하세요"
                  className="text-grey-600 h-9 w-[230px]"
                />
              </div>
            </div>

            {/* 과목 입력 */}
            <div className="border-grey-300 flex h-[50px] gap-2 border-b">
              <label className="text-grey-800 bg-grey-50 w-50 p-4 text-sm">
                과목
              </label>
              <div className="flex items-center">
                <Dropdown
                  value={subject}
                  onChange={(val) => setSubject(val)}
                  placeholder="과목을 선택해주세요"
                  options={[
                    { value: 'TypeScript', label: 'TypeScript' },
                    { value: 'JavaScript', label: 'JavaScript' },
                    { value: 'React', label: 'React' },
                  ]}
                  className="text-grey-600 w-[230px] [&_button]:!h-9 [&_button]:!w-[230px]"
                />
              </div>
            </div>

            {/* 로고 등록 */}
            <div className="border-grey-300 flex min-h-[50px] gap-4 border-b">
              <label className="text-grey-800 bg-grey-50 w-[200px] p-4 text-sm">
                로고 등록
              </label>
              <div className="flex items-end gap-6 py-4">
                <div className="flex flex-col items-center gap-3">
                  {/* 이미지 미리보기 */}
                  <label
                    htmlFor="logo-upload"
                    className="bg-grey-50 border-grey-300 relative flex h-33 w-33 cursor-pointer items-center justify-center rounded-sm border"
                  >
                    {logo ? (
                      <img
                        src={
                          typeof logo === 'string'
                            ? logo
                            : URL.createObjectURL(logo)
                        }
                        alt={`${logo instanceof File ? logo.name : 'Logo Image'}`}
                        className="h-24 w-24 object-contain"
                      />
                    ) : (
                      <span className="text-grey-400 text-xs">96 x 96</span>
                    )}
                  </label>
                  <p className="text-grey-600 text-[10px]">
                    96 x 96 사이즈로 등록하세요
                  </p>
                </div>
                {/* 파일 선택 */}
                <div className="flex items-center gap-2">
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) setLogo(file)
                    }}
                    className="hidden"
                  />

                  <span
                    className="text-grey-800 max-w-[250px] truncate text-sm underline"
                    title={
                      logo instanceof File
                        ? logo.name
                        : typeof logo === 'string'
                          ? logo.split('/').pop()
                          : ''
                    }
                  >
                    {logo instanceof File
                      ? logo.name
                      : typeof logo === 'string'
                        ? logo.split('/').pop()
                        : '선택된 파일 없음'}
                  </span>

                  <label
                    htmlFor="logo-upload"
                    className="border-grey-300 text-grey-600 cursor-pointer rounded-sm border p-[4px_8px] text-xs"
                  >
                    파일첨부
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        {/* 푸터: 버튼 */}
        <Modal.Footer className="bg-white">
          <Button
            variant="filter"
            onClick={handleSubmit}
            className="rounded-sm text-sm font-normal"
          >
            저장
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  )
}
