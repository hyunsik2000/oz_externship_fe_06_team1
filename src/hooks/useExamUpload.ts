import { useState, useCallback } from 'react'
import { useAxios } from '@/hooks'
import { API_PATHS } from '@/constants/api'
import axios from 'axios'
import { useToastStore } from '@/store'

interface PresignedUrlResponse {
  presigned_url: string
  img_url: string
  key: string
}

interface UseExamUploadProps {
  mode: 'create' | 'edit'
  id?: number | string
  onSuccess?: () => void
  onClose: () => void
}

export function useExamUpload({
  mode,
  id,
  onSuccess,
  onClose,
}: UseExamUploadProps) {
  const { sendRequest, isLoading: isSubmitting } = useAxios()
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // S3에 이미지 파일 업로드
  const uploadImageToS3 = useCallback(
    async (file: File) => {
      setIsUploading(true)
      try {
        // presigned url 받아오기
        const res = await sendRequest<PresignedUrlResponse>({
          method: 'PUT',
          url: API_PATHS.EXAM.PRESIGNED_URL,
          data: { file_name: file.name },
        })

        if (!res) return null

        // S3에 실제 파일 업로드
        await axios.put(res.presigned_url, file, {
          headers: {
            'Content-Type': file.type,
          },
        })

        setLogoUrl(res.img_url)
        return res.img_url
      } finally {
        setIsUploading(false)
      }
    },
    [sendRequest]
  )

  // 시험 생성/수정 제출 로직
  const handleSubmit = useCallback(
    async (title: string, subjectId: number, imgUrl?: string | null) => {
      const targetImgUrl = imgUrl !== undefined ? imgUrl : logoUrl

      const payload: Record<string, string | number> = {
        title,
        subject_id: subjectId,
      }

      if (typeof targetImgUrl === 'string') {
        payload.thumbnail_img_url = targetImgUrl
      }

      const response = await sendRequest(
        {
          method: mode === 'create' ? 'POST' : 'PUT',
          url:
            mode === 'create'
              ? API_PATHS.EXAM.LIST
              : API_PATHS.EXAM.DETAIL(id!),
          data: payload,
        },
        {
          onError: (error) => {
            error.mode = 'toast'
            error.message = `${mode === 'create' ? '쪽지시험 생성' : '쪽지시험 수정'}에 실패했습니다.`
          },
        }
      )

      if (response) {
        useToastStore.getState().showToast({
          message: `성공적으로 ${mode === 'create' ? '쪽지시험 생성' : '쪽지시험 수정'}에 성공했습니다.`,
          variant: 'success',
        })
        onSuccess?.()
        onClose()
      }
    },
    [id, logoUrl, mode, onClose, onSuccess, sendRequest]
  )

  return {
    logoUrl,
    setLogoUrl,
    isUploading,
    isSubmitting,
    uploadImageToS3,
    handleSubmit,
  }
}
