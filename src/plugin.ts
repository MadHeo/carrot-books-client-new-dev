import { createVNode, render, type App } from 'vue'
import AlertModal from './components/modal/AlertModal.vue'
import type { AlertOptions } from './types/alert'

export const AlertConfirm = {
  install(app: App) {
    const container = document.createElement('div')

    const alertConfirm = (options: AlertOptions): Promise<boolean> => {
      return new Promise((resolve) => {
        const vnode = createVNode(AlertModal, {
          ...options,
          onConfirm: () => {
            render(null, container)
            resolve(true)
          },
          onCancel: () => {
            render(null, container)
            resolve(false)
          },
        })

        render(vnode, container)
        document.body.appendChild(container)
      })
    }

    app.provide('AlertConfirm', alertConfirm)
    // window.$alertConfirm = alertConfirm
  },
}
