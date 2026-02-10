import { useEffect, useState } from 'react'
import { Modal, Button, Input, Dropdown } from '@/components/common'
import { useExamUpload } from '@/hooks'
import { SUBJECT_OPTIONS } from '@/constants/filtered-option'

interface ExamModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'edit'
  id?: number | string
  initialData?: {
    title: string
    subject_id: number
    logo_url: string
  }
  onSuccess?: () => void
}

export default function ExamModal({
  isOpen,
  onClose,
  mode,
  id,
  initialData,
  onSuccess,
}: ExamModalProps) {
  const [title, setTitle] = useState<string>('')
  const [subjectId, setSubjectId] = useState<number | null>(null)
  const [fileName, setFileName] = useState<string>('')

  const {
    logoUrl,
    setLogoUrl,
    isUploading,
    isSubmitting,
    uploadImageToS3,
    handleSubmit: submitForm,
  } = useExamUpload({ mode, id, onSuccess, onClose })

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setTitle(initialData.title)
      setSubjectId(initialData.subject_id)
      setLogoUrl(initialData.logo_url)
      if (initialData.logo_url) {
        const fullFileName = decodeURIComponent(
          initialData.logo_url.split('/').pop() || ''
        )
        const cleanFileName = fullFileName.includes('_')
          ? fullFileName.substring(fullFileName.indexOf('_') + 1)
          : fullFileName
        setFileName(cleanFileName)
      }
    } else {
      setTitle('')
      setSubjectId(null)
      setLogoUrl(null)
      setFileName('')
    }
  }, [mode, initialData, setLogoUrl, isOpen])

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      await uploadImageToS3(file)
    }
  }

  const handleSave = () => {
    submitForm(title, subjectId ?? 1, logoUrl)
  }

  const isDefaultLogo = logoUrl === 'default_img_url'

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton size="ml">
      <div className="flex h-full w-full flex-col">
        <Modal.Header className="border-grey-100 flex flex-col gap-1 border-b px-8 pt-8 pb-4">
          <span className="text-grey-800 text-lg font-semibold">
            {mode === 'edit' ? '쪽지시험 수정' : '쪽지시험 생성'}
          </span>
        </Modal.Header>

        <Modal.Body className="overflow-visible">
          <div className="flex flex-col overflow-visible">
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

            <div className="border-grey-300 flex h-[50px] gap-2 border-b">
              <label className="text-grey-800 bg-grey-50 w-50 p-4 text-sm">
                과목
              </label>
              <div className="flex items-center">
                <Dropdown
                  value={subjectId ? String(subjectId) : ''}
                  onChange={(val) => setSubjectId(val ? Number(val) : null)}
                  placeholder="과목을 선택해주세요"
                  options={SUBJECT_OPTIONS}
                  className="text-grey-600 w-[230px] [&_button]:!h-9 [&_button]:!w-[230px]"
                />
              </div>
            </div>

            <div className="border-grey-300 flex min-h-[50px] gap-4 border-b">
              <label className="text-grey-800 bg-grey-50 w-[200px] p-4 text-sm">
                로고 등록
              </label>
              <div className="flex items-end gap-6 py-4">
                <div className="flex flex-col items-center gap-3">
                  <label
                    htmlFor="logo-upload"
                    className="bg-grey-50 border-grey-300 relative flex h-33 w-33 cursor-pointer items-center justify-center rounded-sm border"
                  >
                    {isUploading && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
                        <span className="text-[10px] font-bold">
                          업로드 중...
                        </span>
                      </div>
                    )}
                    {logoUrl && !isDefaultLogo ? (
                      <img src={logoUrl} className="h-24 w-24 object-contain" />
                    ) : (
                      <span className="text-grey-400 text-xs">96 x 96</span>
                    )}
                  </label>
                  <p className="text-grey-600 text-[10px]">
                    96 x 96 사이즈로 등록하세요
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleLogoChange}
                    className="hidden"
                    disabled={isUploading}
                  />

                  <span
                    className="text-grey-800 max-w-[250px] truncate text-sm underline"
                    title={logoUrl && !isDefaultLogo ? fileName : ''}
                  >
                    {logoUrl && !isDefaultLogo ? fileName : '선택된 파일 없음'}
                  </span>

                  <label
                    htmlFor="logo-upload"
                    className={`border-grey-300 text-grey-600 rounded-sm border p-[4px_8px] text-xs ${isUploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  >
                    파일첨부
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="bg-white">
          <Button
            variant="filter"
            onClick={handleSave}
            className="rounded-sm text-sm font-normal"
            disabled={isSubmitting || isUploading || !subjectId}
          >
            {isSubmitting ? '...' : '저장'}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  )
}
