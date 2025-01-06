<template>
  <div class="w-96 bg-white rounded-2xl p-8">
    <div class="text-lg text-center text-gray800">
      <ul class="flex flex-wrap w-full">
        <li class="w-1/2">
          <a
            :class="[
              'inline-block p-2 cursor-pointer w-full',
              {
                'text-gray-600 border-gray-300 border-b-2 border-transparent rounded-t-lg': isLogin,
              },
            ]"
            @click="onClickTab('L')"
            >로그인</a
          >
        </li>
        <li class="w-1/2">
          <a
            :class="[
              'inline-block p-2 cursor-pointer  w-full',
              {
                'text-blue-600 border-blue-600 border-b-2 rounded-t-lg active dark:text-blue-500 dark:border-blue-500':
                  !isLogin,
              },
            ]"
            @click="onClickTab('S')"
            >회원가입</a
          >
        </li>
      </ul>
      <div class="pt-10">
        <Login v-if="selected === 'L'" />
        <Signup v-if="selected === 'S'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Signup from './Signup.vue'
import Login from './Login.vue'

const selected = ref('L')
const isLogin = computed(() => selected.value === 'L')

const onClickTab = (tab) => (selected.value = tab)
</script>
