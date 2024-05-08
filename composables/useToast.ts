import { randomString } from '@kaynooo/js-utils'
import type { Toast, ToastType } from '~/types/toast'

export default function useToast() {
  const toasts = useState<Toast[]>('toasts', () => [])

  function addToast(message: string, type: ToastType) {
    const id = randomString(7)
    const toast: Toast = {
      type,
      message,
      id,
    }
    toasts.value.push(toast)

    setTimeout(() => closeToast(id), 4000 + (toast.message.length * 10))
  }

  function closeToast(id: string) {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index === -1)
      return

    toasts.value.splice(index, 1)
  }

  return {
    toasts,
    addToast,
    closeToast,
  }
}
