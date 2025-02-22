import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useRegisterStore = defineStore('register', () => {
  const isRegisterModalOpen = ref(false)

  function toggleRegisterModal() {
    isRegisterModalOpen.value = !isRegisterModalOpen.value

    isRegisterModalOpen.value
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = '')
  }

  return {
    isRegisterModalOpen,
    toggleRegisterModal,
  }
})
