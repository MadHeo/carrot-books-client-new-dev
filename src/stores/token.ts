import { inject, ref } from 'vue'
import { defineStore } from 'pinia'
import type { VueCookies } from 'vue3-cookies/dist/interfaces'

export const useTokenStore = defineStore(
  'token',
  () => {
    const access_token = ref<string | undefined>(undefined)
    const $cookies = inject<VueCookies>('$cookies')

    const getState = () => {
      const token = $cookies?.get('access_token')
      console.log(token)

      return { access_token: token }
    }

    const reset = (): void => {
      access_token.value = undefined
    }

    return { access_token, getState, reset }
  },
  {
    persist: true,
  },
)
