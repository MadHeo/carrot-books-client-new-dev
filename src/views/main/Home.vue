<template>
  <div>👨🏻‍🌾 전체 책 리스트</div>
  <div class="w-full h-full flex flex-row gap-6 flex-wrap">
    <BookCard :book-list="bookList" />
  </div>
</template>

<script setup lang="ts">
import book from '@/api/book'
import BookCard from '@/components/BookCard.vue'
import { useRegisterStore } from '@/stores/register'
import type { IBookDetail } from '@/types/book'
import { onMounted, reactive, ref, watch } from 'vue'

const registerStore = useRegisterStore()

const bookList = ref<IBookDetail[] | null>(null)
const searchParams = reactive({
  limit: '100',
  page: '1',
})

const getBookList = async () => {
  try {
    const res: any = await book.list()
    bookList.value = res?.bookList
  } catch (error) {
    console.error(error)
  }
}

watch(
  () => registerStore.isRegisterModalOpen,
  (newVal) => {
    if (!newVal) getBookList()
  },
)

onMounted(() => {
  getBookList()
})
</script>

<style></style>
