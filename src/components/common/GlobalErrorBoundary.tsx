import { Component, type ReactNode } from 'react'
import { RequestError } from '@/types'
import { useErrorStore } from '@/store'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

// 전역 에러 바운더리 렌더링 중 발생한 에러를 errorStore에 저장

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    const setError = useErrorStore.getState().setError

    if (error instanceof RequestError) {
      setError(error)
    } else {
      setError(
        new RequestError({
          status: 600, // Client Error임을 두기 위한 아무 숫자
          mode: 'modal',
          title: '애플리케이션 오류',
          message: error.message ?? '예상치 못한 오류가 발생했습니다.',
        })
      )
    }
    this.setState({ hasError: false })
  }

  render() {
    return this.props.children
  }
}
