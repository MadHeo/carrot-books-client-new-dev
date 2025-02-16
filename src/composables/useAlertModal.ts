import type { AlertConfirmFn, AlertOptions } from '@/types/alert'
import { inject } from 'vue'

export function useAlertModal() {
  const alertConfirm = inject<AlertConfirmFn>('AlertConfirm')

  if (!alertConfirm) throw new Error('Alert error') //타입 예외처리

  const open = async ({ type, title, text, buttonText, width }: AlertOptions) =>
    await alertConfirm({ type, title, text, buttonText, width })

  const alertModal = async (text: string, width = 360) => await open({ type: 'alert', text, width })

  const confirmModal = async ({
    title,
    text,
    buttonText,
    width = 360, //default 넓이
  }: {
    title: string
    text: string
    buttonText: string
    width?: number
  }) => await open({ type: 'confirm', title, text, buttonText, width })

  return { alertModal, confirmModal }
}
