export interface AlertOptions {
  type: 'alert' | 'confirm'
  title?: string
  text?: string
  buttonText?: string
  width: number
}

export type AlertConfirmFn = (params: AlertOptions) => Promise<boolean>
