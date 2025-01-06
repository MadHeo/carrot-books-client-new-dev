<template>
  <div class="w-60 bg-gray200 flex-col flex gap-8 h-screen">
    <div>
      <div class="mb-20 px-10 mt-6">
        <NuxtLink to="/">
          <img id="logo-h" class="h-full w-full cursor-pointer" src="/image/logo_vertical.png" />
        </NuxtLink>
      </div>
    </div>
    <div class="h-full flex-col flex justify-between">
      <div>
        <div class="cursor-pointer ml-12 py-1">
          <!-- <NuxtLink v-for="(menu, i) in menus" :key="i" :to="menu.to">
            <p class="text-white py-2 leading-none bookmark">
              {{ menu.name }}
            </p>
          </NuxtLink> -->
        </div>
        <div class="h-24 ml-12">
          <p class="mb-4 text-gray600 text-sm">마이페이지</p>
        </div>
      </div>

      <div class="border-t flex flex-col justify-center h-28 px-6">
        <div class="contactText text-sx">제휴 및 문의</div>
        <div class="emailText text-sm">books@dwook.co</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
