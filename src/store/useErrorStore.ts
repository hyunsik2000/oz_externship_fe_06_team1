import { create } from 'zustand'
import { RequestError } from '@/types'

interface ErrorState {
  error: RequestError | null
  setError: (error: RequestError | null) => void
  clearError: () => void
}

export const useErrorStore = create<ErrorState>((set) => ({
  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}))
