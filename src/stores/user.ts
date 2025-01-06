import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/auth'

export const useUserStore = defineStore(
  'user',
  () => {
    const name = ref('')
    const id = ref('')
    const email = ref('')
    const profileImage = ref('')

    const getState = () => {
      return {
        name: name.value,
        id: id.value,
        email: email.value,
        profileImage: profileImage.value,
      }
    }

    const setState = (objs: UserInfo) => {
      name.value = objs.name
      id.value = objs.id
      email.value = objs.email
      profileImage.value = objs.profileImage
    }

    const reset = () => {
      name.value = ''
      id.value = ''
      email.value = ''
      profileImage.value = ''
    }
    return {
      name,
      id,
      email,
      profileImage,
      getState,
      setState,
      reset,
    }
  },
  {
    persist: true,
  },
)
