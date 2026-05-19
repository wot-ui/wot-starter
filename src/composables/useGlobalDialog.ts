import type { DialogOptions, DialogResult } from '@wot-ui/ui/components/wd-dialog/types'
import { defineStore } from 'pinia'

export type GlobalDialogOptions = DialogOptions & {
  success?: (res: DialogResult) => void
  fail?: (res: DialogResult) => void
}

interface GlobalDialog {
  dialogOptions: GlobalDialogOptions | null
  currentPage: string
}

function isButtonPropsObject(value: unknown): value is Record<string, any> {
  return value !== null && CommonUtil.isObj(value)
}

function normalizeButtonOptions(option: GlobalDialogOptions): GlobalDialogOptions {
  const next: GlobalDialogOptions = { ...option }

  if (next.confirmButtonText) {
    next.confirmButtonProps = isButtonPropsObject(next.confirmButtonProps)
      ? { ...next.confirmButtonProps, text: next.confirmButtonText }
      : next.confirmButtonText
  }
  else if (next.confirmButtonProps === undefined) {
    next.confirmButtonProps = {}
  }

  if (next.cancelButtonText) {
    next.cancelButtonProps = isButtonPropsObject(next.cancelButtonProps)
      ? { ...next.cancelButtonProps, text: next.cancelButtonText }
      : next.cancelButtonText
  }

  if (next.showCancelButton === false) {
    next.cancelButtonProps = null
  }
  else if (next.showCancelButton === true && next.cancelButtonProps === undefined) {
    next.cancelButtonProps = {}
  }

  if (isButtonPropsObject(next.confirmButtonProps)) {
    next.confirmButtonProps = {
      ...next.confirmButtonProps,
      round: false,
    }
  }

  if (isButtonPropsObject(next.cancelButtonProps)) {
    next.cancelButtonProps = {
      ...next.cancelButtonProps,
      round: false,
    }
  }

  return next
}

export const useGlobalDialog = defineStore('global-Dialog', {
  state: (): GlobalDialog => ({
    dialogOptions: null,
    currentPage: '',
  }),
  actions: {
    show(option: GlobalDialogOptions | string) {
      this.currentPage = getCurrentPath()
      this.dialogOptions = normalizeButtonOptions(CommonUtil.isString(option) ? { title: option } : option)
    },
    alert(option: GlobalDialogOptions | string) {
      const DialogOptions = CommonUtil.deepMerge({ type: 'alert' }, CommonUtil.isString(option) ? { title: option } : option) as DialogOptions
      DialogOptions.showCancelButton = false
      this.show(DialogOptions)
    },
    confirm(option: GlobalDialogOptions | string) {
      const DialogOptions = CommonUtil.deepMerge({ type: 'confirm' }, CommonUtil.isString(option) ? { title: option } : option) as DialogOptions
      DialogOptions.showCancelButton = true
      this.show(DialogOptions)
    },
    prompt(option: GlobalDialogOptions | string) {
      const DialogOptions = CommonUtil.deepMerge({ type: 'prompt' }, CommonUtil.isString(option) ? { title: option } : option) as DialogOptions
      DialogOptions.showCancelButton = true
      this.show(DialogOptions)
    },
    close() {
      this.dialogOptions = null
      this.currentPage = ''
    },
  },
})
