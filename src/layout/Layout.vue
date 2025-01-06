<template>
  <div class="flex flex-row justify-start">
    <!-- 사이드바 -->
    <div>
      <SideBar />
    </div>
    <div class="flex flex-col justify-between w-full">
      <!-- 헤더 -->
      <div class="">
        <Header />
      </div>
      <!-- 본문 -->
      <div class="w-full h-full px-28 pt-10">
        <AppView></AppView>
      </div>
      <!-- 푸터 -->
      <div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted } from 'vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import SideBar from './components/SideBar.vue'
import AppView from './components/AppView.vue'
</script>
