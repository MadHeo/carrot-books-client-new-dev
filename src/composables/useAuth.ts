import { reactive, ref } from 'vue'
import { useCookies } from 'vue3-cookies'
import type { UserInfo } from '@/types/auth'
import { useUserStore } from '@/stores/user'

export const useAuth = () => {
  const { cookies } = useCookies()
  const { setState, getState, reset } = useUserStore()

  const accessToken = ref('access_token')

  // 쿠키 조회
  const getToken = () => {
    return cookies.get(accessToken.value)
  }
  //쿠키 세팅
  const setToken = (token: string) => {
    cookies.set(accessToken.value, token, {
      // @ts-ignore: expireTimes의 타입스크립트 에러 무시
      expireTimes: '30d',
      secure: true, // HTTPS에서만 쿠키 전송
      httpOnly: true, // JavaScript에서 쿠키 접근 방지
      sameSite: 'strict', // CSRF 공격 방지
    })
  }
  //쿠키 삭제
  const removeToken = () => {
    return cookies.remove(accessToken.value)
  }

  //유저 정보 세팅
  const setUserInfo = (user: UserInfo) => {
    setState(user)
  }
  const getUserInfo = () => {
    getState()
  }
  //유저 정보 초기화
  const removeUserInfo = () => {
    reset()
  }

  return {
    getToken,
    setToken,
    removeToken,
    setUserInfo,
    getUserInfo,
    removeUserInfo,
  }
}
