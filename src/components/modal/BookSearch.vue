<template>
  <div
    id="mask-book-register"
    class="absolute w-full h-full top-0 left-0 backdrop-blur-sm z-10"
    style="background-color: rgba(17, 17, 17, 0.5)"
  >
    <div
      v-if="!isSelect"
      class="absolute w-8/12 h-4/5 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-lg"
    >
      <div class="relative h-20 flex items-center justify-between border-b-gray200 border-b-2">
        <div class="flex w-10/12 px-10">
          <img src="/image/search.png" class="w-6 h-6" />
          <input
            placeholder="책 제목 또는 저자명을 입력하세요."
            class="placeholder:text-base placeholder:font-pretendard focus:outline-none pl-2 pt-0.5 w-10/12"
            @input="searchBooks"
          />
        </div>
        <button
          class="flex gap-1 bg-primary rounded-md py-1.5 px-4 mr-10"
          @click="registerStore.toggleRegisterModal"
        >
          <img src="/image/icon_close.png" />
          <div class="font-normal text-base text-gray100">닫기</div>
        </button>
      </div>
      <div class="h-full" v-if="books.length > 0">
        <span class="text-gray600 text-sm pl-10">도서 검색 결과</span>
        <div class="h-[calc(100%-120px)] overflow-y-auto mt-2">
          <div v-for="(book, index) in books" :key="index" class="hover:bg-gray200 py-2">
            <button @click="onClickBook(book, index)">
              <div class="flex pl-10">
                <div class="w-14 h-20 mr-4 border border-gray200 rounded-lg">
                  <img :src="book.cover" />
                </div>
                <div>
                  <div class="text-gray800 text-m text-left">{{ book.title }}</div>
                  <div class="text-gray700 text-sm text-left">{{ book.author }}</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="h-full flex justify-center items-center align-middle mt-4">
          <div class="text-gray500 text-m">검색 결과가 없습니다.</div>
        </div>
      </div>
    </div>

    <BookRegist
      v-else
      @onClickPrev="onClickPrev"
      @closeModal="closeModal"
      :bookData="selectedBook"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRegisterStore } from '../../stores/register'
import book from '@/api/book'
import type { IBookList } from '@/types/book'
import BookRegist from './BookRegist.vue'
import { debounce } from 'lodash'

const registerStore = useRegisterStore()
const books = ref<IBookList[]>([])
const isSelect = ref(false)
const searchParam = reactive({
  limit: '50',
  page: '1',
  query: '',
})
const selectedBook = ref<IBookList>()

const searchBooks = debounce(async (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value

  if (value.length === 0) return (books.value = [])
  searchParam.query = value

  try {
    const res: any = await book.search(searchParam)
    books.value = res?.bookList
  } catch (error) {
    console.error('책 검색 중 오류 발생:', error)
  }
}, 600)

const onClickBook = (data: IBookList, index: number) => {
  isSelect.value = true
  selectedBook.value = data
}

const onClickPrev = async () => (isSelect.value = false)
const closeModal = async () => await onClickPrev()
</script>
