<template>
  <div>👨🏻‍🌾 전체 책 리스트</div>
  <div class="w-full h-full flex flex-row gap-6 flex-wrap">
    <div
      class="w-64 flex flex-col justify-end rounded hover:bg-gray150 cursor-pointer mb-4"
      v-for="(book, index) in bookList"
      :key="index"
      @click="onClickBook(book.id)"
    >
      <img
        class="object-cover w-full max-h-96 mb-4 border border-#c8c8c8 rounded bg-gray150"
        :src="book.cover"
        alt=""
      />
      <div class="flex flex-row">
        <div class="mr-2">
          <img class="w-6 h-6 rounded-full object-cover" src="/image/img_sezeme.png" alt="" />
        </div>
        <div>{{ book.owner.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import book from '@/api/book'
import { useRegisterStore } from '@/stores/register'
import type { IBookDetail } from '@/types/book'
import { onActivated, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const registerStore = useRegisterStore()

const router = useRouter()

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

const onClickBook = (id: string) => {
  router.push(`/detail/${id}`)
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
