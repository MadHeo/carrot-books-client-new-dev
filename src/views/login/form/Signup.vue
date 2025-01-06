<template>
  <div class="flex justify-center items-center">
    <div class="w-full">
      <div class="">
        <label for="e-mail" class="text-left input-label text-inputGray block">이메일</label>
        <input
          id="e-mail"
          maxlength="100"
          v-model="form.email"
          class="border-solid border border-inputGray rounded-sm w-full h-12 px-4"
        />
        <div class="flex justify-end">
          <button
            class="bg-primary rounded-sm py-1 px-4 mt-1 text-white text-sm"
            :disabled="!isEmailValid"
            @click="onClickVerifyEmail"
          >
            인증하기
          </button>
        </div>
      </div>
      <div class="relative mb-4">
        <label for="verify-code" class="text-left input-label text-inputGray block">인증번호</label>
        <div
          class="flex justify-between border-solid border border-inputGray rounded-sm w-full h-12 px-4 py-2"
        >
          <input
            class="rounded-sm w-2/3 px-2"
            id="verify-code"
            maxlength="10"
            v-model="form.code"
          />
          <button
            class="bg-secondary w-1/4 rounded-sm py-1 text-white text-sm"
            @click="onClickVerifyConfirm"
            :disabled="!form.code"
          >
            확인
          </button>
        </div>
      </div>
      <div class="relative">
        <label for="nickname" class="text-left input-label text-inputGray block">닉네임</label>
        <input
          id="nickname"
          v-model="form.name"
          class="border-solid border border-inputGray rounded-sm w-full h-12 mb-4 px-4"
          :disabled="!isVerify"
        />
      </div>
      <div class="relative">
        <label for="password" class="text-left input-label text-inputGray block">비밀번호</label>
        <input
          id="password"
          type="password"
          v-model="form.password"
          class="border-solid border border-inputGray rounded-sm w-full h-12 mb-4 px-4"
          :disabled="!isVerify"
        />
        <img src="/image/eye.png" class="absolute top-9 right-3" />
      </div>
      <div class="relative mb-8">
        <label for="passwordCheck" class="text-left input-label text-inputGray block"
          >비밀번호 확인</label
        >
        <input
          id="passwordCheck"
          type="password"
          v-model="form.passwordCheck"
          class="border-solid border border-inputGray rounded-sm w-full h-12 px-4"
          @keyup.enter="onClickSignUp"
          :disabled="!isVerify"
        />
        <img src="/image/eye.png" class="absolute top-9 right-3" />
      </div>
      <button
        class="mb-4 bg-secondary text-white rounded-sm w-full h-12 flex items-center justify-center"
        :disabled="!isComplate"
        @click="onClickSignUp"
      >
        회원가입
      </button>
      <div class="font-normal text-sm text-inputGray text-center">
        <a href="mailto:books@dwook.co" class="underline underline-offset-1">이메일 문의하기></a>
      </div>
    </div>
  </div>
</template>

<script setup>
import auth from '@/api/login'
import { useAuth } from '@/composables/useAuth'
import { computed, defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

defineComponent({
  name: 'Signup',
})

const router = useRouter()
const { setToken, setUserInfo } = useAuth()
const form = reactive({
  email: '',
  name: '',
  password: '',
  passwordCheck: '',
  code: '',
})
//인증완료 시 버튼 활성화
const isVerify = ref(false)
const isEmailValid = computed(() => form.email.includes('@'))
const isComplate = computed(() => form.email && form.name && form.password && form.passwordCheck)

const onClickSignUp = async () => {
  try {
    const res = await auth.signup({
      email: form.email,
      name: form.name,
      password: form.password,
      verificationCode: form.code,
    })

    setToken(accessToken)
    await router.push('/main')
  } catch (error) {
    console.error(error)
    if (error.message) alert(error.message)
  }
}

const onClickVerifyEmail = async () => {
  try {
    const res = await auth.verify({ email: form.email })
  } catch (error) {
    console.error(error)
    if (error.message) alert(error.message)
    isVerify.value = false
  }
}

const onClickVerifyConfirm = async () => {
  try {
    const res = await auth.verifyCode({ email: form.email, code: form.code })
    if (res.message) {
      alert(res.message)
      isVerify.value = true
    }
  } catch (error) {
    console.error(error)
    if (error.message) alert(error.message)
    isVerify.value = false
  }
}
</script>

<style>
.input-label {
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
}
</style>
