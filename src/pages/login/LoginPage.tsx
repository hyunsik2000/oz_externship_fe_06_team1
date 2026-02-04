import { Button, Input } from '@/components/common'
import { useState } from 'react'
import OZLogo from '@/assets/icons/OZLogo.svg?react'
import { useNavigate } from 'react-router-dom'
import { API_PATHS } from '@/constants/api'
import { setCookie } from '@/utils'
import { useAxios } from '@/hooks'

interface LoginResponse {
  access_token: string
}

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { sendRequest, isLoading } = useAxios()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = await sendRequest<LoginResponse>({
        method: 'POST',
        url: API_PATHS.AUTH.LOGIN,
        data: { email, password },
        errorTitle: '로그인 실패',
      })

      if (data && data.access_token) {
        setCookie('accessToken', data.access_token)
        navigate('/exam/dashboard')
      }
    } catch (error) {
      console.error('Login Error:', error)
    }
  }

  return (
    <div className="font-pretendard flex min-h-screen w-full">
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-[340px]">
          <div className="flex flex-col items-center">
            <OZLogo />
            <p className="text-grey-500 my-6 text-xs">
              <span className="text-primary-700">admin 계정</span>을 통해
              로그인을 진행해주세요.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <Input
              type="email"
              placeholder="아이디 (example@gmail.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
              disabled={isLoading}
            />
            <Input
              type="password"
              placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자 포함)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12"
              disabled={isLoading}
            />

            <Button
              variant="primary"
              className="h-13 w-full rounded-sm text-base font-normal"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </div>
      </div>

      <div className="bg-grey-50 lg:flex-1" />
    </div>
  )
}
