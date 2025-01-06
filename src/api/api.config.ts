import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL
const ANONYMOUS = [
  '/users/verify-email', // 이메일 인증 코드 전송
  '/users/verify-code', // 인증 코드 확인
  '/users/signup', // 유저 등록
  '/users/signin', // 로그인
]

const isAnonymousRequest = (url: string) => ANONYMOUS.includes(url)

const apiClient = axios.create({
  baseURL: BASE_API_URL, // 기본 API URL
  timeout: 50000, // 요청 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

const router = useRouter()
const moveToLogin = () => {
  router.push('/login')
}

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config: any) => {
    // 로그인 관련 요청이 아닌 경우 토큰 추가
    if (!isAnonymousRequest(config.url)) {
      const { getToken } = useAuth()
      const accessToken = getToken()

      if (!accessToken) {
        alert('토큰이 만료되었습니다. 다시 로그인 해주세요.')
        moveToLogin()
      } else config.headers.Authorization = `Bearer ${accessToken}`
    }

    // 요청 전에 추가 설정 가능
    return config
  },
  (error) => {
    const res = error.response
    const errorResponse = {
      message: res?.data?.message || '요청 처리 중 오류가 발생했습니다.',
      status: res?.status,
      data: res?.data,
    }
    throw errorResponse
  },
)

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response.data // 응답 데이터를 필요한 형식으로 변환
  },
  (error) => {
    const res = error.response
    const errorResponse = {
      message: res?.data?.message || '요청 처리 중 오류가 발생했습니다.',
      status: res?.status,
      data: res?.data,
    }
    throw errorResponse
  },
)

export default apiClient
