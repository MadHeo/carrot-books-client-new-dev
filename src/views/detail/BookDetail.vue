<template>
  <div class="px-20 py-16">
    <div class="w-full h-96 flex flex-row">
      <div class="w-64 mr-5 flex flex-col gap-4">
        <img :src="bookData?.cover" alt="" class="h-80 rounded object-scale-down" />
        <button
          v-if="bookData && !isRental"
          class="h-14 py-4 rounded text-gray100 bg-primary active:bg-primaryDark"
          @click="onClickBookRental(bookData.id)"
        >
          <p>책 대여 신청하기</p>
        </button>

        <button v-else class="h-14 py-4 rounded text-gray100 bg-primary" disabled>
          <p>대여 중</p>
        </button>
      </div>
      <div class="w-full h-96 flex flex-col gap-2">
        <p class="text-sm">{{ bookData?.categoryName }}</p>
        <h2 class="text-4xl">{{ bookData?.title }}</h2>
        <p class="text-sm">{{ bookData?.author }}</p>
        <p class="text-xl h-full break-keep overflow-auto text-ellipsis">
          {{ bookData?.ownerDescription }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import book from '@/api/book'
import type { IBookSelectDetail } from '@/types/book'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAlertModal } from '@/composables/useAlertModal'
// available
// unavailable
const { confirmModal } = useAlertModal()

const route = useRoute()

const detailId: string | string[] = route.params.id
const bookData = ref<IBookSelectDetail>()
const isRental = computed(() => bookData.value?.rentalStatus === 'unavailable')

const onClickBookRental = async (bookId: string) => {
  const res = await confirmModal({
    title: '대여 기간 안내',
    text: '대여 기간은 기본적으로 3주로 설정되어 있으며, 반납 이틀 전부터 연장이 가능합니다. 단, 대여 및 연장 신청은 거절될 수 있습니다.',
    buttonText: '책 대여 신청',
    width: 384,
  })

  if (!res) return //취소일 경우 return

  const result = await book.rentals(bookId)

  if (result) {
    alert('책 대여신청이 완료되었습니다.')
    await getBookDetail(detailId)
  } else {
    alert('대여 신청에 실패했습니다.')
    return
  }
}

const getBookDetail = async (id: string | string[]) => {
  try {
    const res: any = await book.detail(id)
    bookData.value = res
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getBookDetail(detailId)
})
</script>
