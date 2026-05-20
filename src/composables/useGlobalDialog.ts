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

type DialogType = NonNullable<DialogOptions['type']>

function isButtonPropsObject(value: unknown): value is Record<string, any> {
  return value !== null && CommonUtil.isObj(value)
}

function normalizeButtonProps(props: unknown, text?: string) {
  if (props === null) {
    return null
  }

  if (isButtonPropsObject(props)) {
    return {
      ...props,
      ...(text ? { text } : {}),
      round: false,
    }
  }

  if (CommonUtil.isString(props) || text) {
    return {
      text: text || props,
      round: false,
    }
  }

  if (props === undefined) {
    return {
      round: false,
    }
  }

  return props
}

function withDefaultTypeOptions(option: GlobalDialogOptions, type?: DialogType): GlobalDialogOptions {
  const next: GlobalDialogOptions = {
    ...option,
    ...(type ? { type } : {}),
  }

  if (next.showCancelButton === undefined) {
    if (next.type === 'alert') {
      next.showCancelButton = false
    }
    else if (next.type === 'confirm' || next.type === 'prompt') {
      next.showCancelButton = true
    }
  }

  return next
}

function normalizeDialogOptions(option: GlobalDialogOptions, type?: DialogType): GlobalDialogOptions {
  const next = withDefaultTypeOptions(option, type)

  next.confirmButtonProps = normalizeButtonProps(next.confirmButtonProps, next.confirmButtonText) as DialogOptions['confirmButtonProps']

  if (next.showCancelButton === false) {
    next.cancelButtonProps = null
  }
  else if (next.showCancelButton === true || next.cancelButtonProps !== undefined || next.cancelButtonText) {
    next.cancelButtonProps = normalizeButtonProps(next.cancelButtonProps, next.cancelButtonText) as DialogOptions['cancelButtonProps']
  }

  return next
}

function normalizeOption(option: GlobalDialogOptions | string, type?: DialogType): GlobalDialogOptions {
  return normalizeDialogOptions(CommonUtil.isString(option) ? { title: option } : option, type)
}

export const useGlobalDialog = defineStore('global-Dialog', {
  state: (): GlobalDialog => ({
    dialogOptions: null,
    currentPage: '',
  }),
  actions: {
    show(option: GlobalDialogOptions | string) {
      this.currentPage = getCurrentPath()
      this.dialogOptions = normalizeOption(option)
    },
    alert(option: GlobalDialogOptions | string) {
      this.currentPage = getCurrentPath()
      this.dialogOptions = normalizeOption(option, 'alert')
    },
    confirm(option: GlobalDialogOptions | string) {
      this.currentPage = getCurrentPath()
      this.dialogOptions = normalizeOption(option, 'confirm')
    },
    prompt(option: GlobalDialogOptions | string) {
      this.currentPage = getCurrentPath()
      this.dialogOptions = normalizeOption(option, 'prompt')
    },
    close() {
      this.dialogOptions = null
      this.currentPage = ''
    },
  },
})
