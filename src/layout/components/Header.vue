<template>
  <div class="relative w-full h-20 flex flex-row justify-end pr-12 pt-6">
    <button
      class="bg-secondary h-14 mr-5 rounded py-4 px-6 flex flex-row"
      @click="registerStore.toggleRegisterModal"
    >
      <img src="/image/icon_add.png" />
      <p class="text-white font-sans ml-3">책 등록하기</p>
    </button>
    <!-- <button class="bg-gray150 w-14 h-14 mr-5 rounded p-2.5 relative">
      <img class="img_init" src="/image/icon-notification.png" alt="알림" />
      <div class="absolute w-3 h-3 bg-secondary -top-1 -right-1 rounded" />
    </button> -->
    <p class="border border-gray250 h-14 rounded flex flex-row">
      <span class="w-14 p-4 bg-gray150">
        <img src="/image/icon-image.png" />
      </span>
      <span class="text-gray600 rounded font-sans bg-gray100 py-4 pl-10"> {{ name }} </span>
      <button @click="showProfile = !showProfile" class="bg-gray100 px-3">
        <img src="/image/chevron-down.png" class="w-6 h-6" />
      </button>
    </p>
    <div
      v-show="showProfile"
      class="absolute top-20 right-12 rounded flex border border-gray300 flex-col justify-start align-top bg-white"
    >
      <button class="w-full py-2 px-4 border-b border-gray300 text-start">개인정보 수정</button>
      <button class="w-full py-2 px-4 rounded text-start" @click="logout">로그아웃</button>
    </div>
  </div>

  <BookSearch v-if="registerStore.isRegisterModalOpen" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRegisterStore } from '../../stores/register'
import BookSearch from '@/components/modal/BookSearch.vue'
import { useUserStore } from '@/stores/user'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const registerStore = useRegisterStore()
const showProfile = ref(false)
const { name } = useUserStore()
const { removeUserInfo, removeToken } = useAuth()
const router = useRouter()

const logout = () => {
  removeUserInfo(), removeToken()
  router.push('/login')
}
</script>
