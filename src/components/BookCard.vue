<template>
  <div
    class="w-64 flex flex-col justify-end rounded hover:bg-gray150 cursor-pointer mb-4"
    v-for="(book, index) in props.bookList"
    :key="index"
    @click="onClickBook(book.id)"
  >
    <img
      class="object-scale-down w-full max-h-96 mb-4 border border-gray350 rounded bg-gray150"
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
</template>

<script setup lang="ts">
import type { IBookDetail } from '@/types/book'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  bookList?: IBookDetail[] | null
}>()

const onClickBook = (id: string) => {
  router.push(`/detail/${id}`)
}
</script>

<style></style>
