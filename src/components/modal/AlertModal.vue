<template>
  <div
    id="mask-book-register"
    class="absolute w-full h-full top-0 left-0 backdrop-blur-sm z-10"
    style="background-color: rgba(17, 17, 17, 0.5)"
  >
    <div
      class="absolute p-8 bg-gray100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-3xl"
      :style="{ width: `${width}px` }"
    >
      <div class="flex justify-center">
        <div class="text-gray800 text-xl font-semibold text-center">{{ title }}</div>
      </div>
      <div class="my-6">
        <p>{{ text }}</p>
      </div>

      <div class="flex justify-center w-full gap-2">
        <button @click="onCancel" class="px-4 py-2 rounded-lg border-2 border-gray350 text-gray700">
          취소
        </button>
        <button @click="onConfirm" class="px-4 py-2 bg-primary text-white rounded-lg">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  title: string
  buttonText: string
  width: number
}>()

const emit = defineEmits(['cancel', 'confirm'])

const onCancel = () => {
  emit('cancel')
}

const onConfirm = () => {
  emit('confirm')
}
</script>
