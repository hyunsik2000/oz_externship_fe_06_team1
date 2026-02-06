import type { ReactNode } from 'react'
import {
  QueryClient,
  MutationCache,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useErrorStore } from '@/store/useErrorStore'
import { RequestError } from '@/types'

interface QueryClientBoundaryProps {
  children: ReactNode
}

// 전역 QueryClient 설정 onError를 통해 에러 발생 시 전역 스토어에 에러를 등록

export const QueryClientBoundary = ({ children }: QueryClientBoundaryProps) => {
  const setError = useErrorStore((state) => state.setError) // store에서 setError 함수만 가져오기

  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onError: (error) => setError(error as RequestError),
    }),
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
