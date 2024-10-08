export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
}

export default function () {
  const toasts = useState<Toast[]>('toasts', () => [])

  function addToast(message: string, type: ToastType) {
    const id = (Math.random() + 1).toString(36).substring(7)
    toasts.value.push({
      id,
      message,
      type,
    })

    setTimeout(() => removeToast(id), 4000)
  }

  function removeToast(id: string) {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index === -1)
      return

    toasts.value.splice(index, 1)
  }

  function clearToasts() {
    toasts.value = []
  }

  return {
    addToast,
    clearToasts,
    removeToast,
    toasts,
  }
}
