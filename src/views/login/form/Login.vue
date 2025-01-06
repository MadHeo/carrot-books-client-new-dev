<template>
  <div class="flex justify-center items-center">
    <div class="w-full">
      <div class="mb-6">
        <label for="e-mail" class="text-left input-label text-inputGray block">이메일</label>
        <input
          id="e-mail"
          v-model="form.email"
          class="border-solid border border-inputGray rounded-sm w-full h-12 px-4"
        />
      </div>
      <div class="mb-10 relative">
        <label for="password" class="text-left input-label text-inputGray block">비밀번호</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          class="border-solid border border-inputGray rounded-sm w-full h-12 px-4"
          @keyup.enter="onClickLogin"
        />
        <!-- <img src="/image/eye.png" class="absolute top-9 right-3" /> -->
      </div>
      <div
        class="mb-10 bg-secondary text-white rounded-sm w-full h-12 flex items-center justify-center cursor-pointer"
        @click="onClickLogin"
      >
        로그인하기
      </div>
      <div class="font-normal text-sm text-inputGray text-center">
        <a href="mailto:books@dwook.co" class="underline underline-offset-1">이메일 문의하기></a>
      </div>
    </div>
  </div>
</template>

<script setup>
import auth from '@/api/login'
import { useAuth } from '@/composables/useAuth'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

defineComponent({
  name: 'Login',
})

const router = useRouter()
// const tokenStore = useTokenStore()
// const userStore = useUserStore()
const { setToken, setUserInfo } = useAuth()

const form = reactive({
  email: '',
  password: '',
})

const onClickLogin = async () => {
  try {
    const res = await auth.login({
      email: form.email,
      password: form.password,
    })
    const { accessToken = '', user = {} } = res
    //토큰 세팅
    setToken(accessToken)
    //유저 정보 스토어 세팅
    setUserInfo(user)

    await router.push('/')
  } catch (error) {
    console.error(error)
    if (error.message) alert(error.message)
  }
}
</script>
