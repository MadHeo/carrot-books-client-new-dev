<template>
  <div class="w-screen h-screen flex flex-row">
    <!-- 왼쪽 패널 -->
    <div class="border-b w-3/5 h-full">
      <div class="p-16">
        <div class="mb-16"><img src="/image/logo_carrot_text_1.png" /></div>
        <div class="text-primaryDark text-4xl font-bold mb-2">환영합니다!</div>
        <div class="text-primaryDark text-4xl font-bold mb-4">
          여러분의 책장에서 잠자고 있는 책을 동료와 함께 나누어 보세요.
        </div>
        <div class="primaryDark text-lg text-gray400">
          [<span class="text-secondary"> 당근</span> <span class="text-primary">북스</span>]는
          우리만의 독특한 독서 문화 서비스를 제공합니다.
        </div>
      </div>

      <div class="text-primaryDark text-lg text-gray400">
        <img src="/image/img_login_main.png" />
      </div>
    </div>

    <!-- 오른쪽 패널 -->
    <div class="w-2/5 h-full bg-gray150">
      <div class="flex flex-col justify-center items-center h-full">
        <Form />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Form from './form/Form.vue'
</script>
