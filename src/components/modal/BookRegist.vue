<template>
  <div
    class="absolute w-8/12 h-4/5 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-lg"
  >
    <div class="relative h-20 flex items-center justify-between border-b-gray200 border-b-2">
      <button class="flex gap-1 bg-primary rounded-md py-1.5 px-4 ml-10" @click="onClickPrev">
        <img src="/image/icon_prev_arrow.png" />
        <div class="font-normal text-base text-gray100">이전</div>
      </button>
      <button class="flex gap-1 bg-secondary rounded-md py-1.5 px-4 mr-10" @click="registBook">
        <div class="font-normal text-base text-gray100">책 등록하기</div>
      </button>
    </div>
    <div class="h-full">
      <div class="h-[calc(100%-120px)] overflow-y-auto mt-2">
        <div class="hover:bg-gray200 py-2">
          <div class="flex px-10">
            <div class="w-14 h-20 mr-4 border border-gray200 rounded-lg">
              <img :src="bookData?.cover" />
            </div>
            <div>
              <div class="text-gray800 text-m text-left">{{ bookData?.title }}</div>
              <div class="text-gray700 text-sm text-left">{{ bookData?.author }}</div>
            </div>
          </div>
        </div>
        <div class="w-full border-b-gray200 border-b-2 my-2"></div>
        <div class="w-full px-10">
          <div>책 소개 작성</div>
          <textarea
            v-model="bookData.ownerDescription"
            class="mt-4 w-full h-full rounded-md p-4 border border-gray200"
            placeholder="책을 소개하거나 자신의 감상평 또는 책을 추천하는 이유를 작성해보세요!"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { IBookList } from '@/types/book'
import book from '@/api/book'

const props = defineProps<{
  bookData?: IBookList
}>()
const emits = defineEmits(['onClickPrev', 'closeModal'])

const bookData = ref<IBookList>(
  props.bookData ?? {
    title: '',
    author: '',
    cover: '',
    isbn: '',
    categoryName: '',
    publisher: '',
    ownerDescription: '',
  },
)

const registBook = async () => {
  try {
    bookData.value.isbn = String(bookData.value.isbn) //문자열로 변경

    const res = await book.regist(bookData.value)

    alert('책이 등록되었습니다.')
    emits('closeModal')
  } catch (error) {
    console.error('책 등록 실패:', error)
    alert('책 등록 실패')
  }
}

const onClickPrev = () => emits('onClickPrev')
</script>

<style></style>
