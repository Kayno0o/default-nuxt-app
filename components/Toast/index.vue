<script setup lang="ts">
import type { Toast, ToastType } from '~/types/toast'

defineProps<{ toast: Toast }>()

const loading = ref(true)

const colors: { [key in ToastType]: string } = {
  error: 'bg-red-400/20',
  warning: 'bg-amber-400/20',
  success: 'bg-emerald-400/20',
}

onMounted(async () => {
  const timeout = setTimeout(() => {
    loading.value = false
  }, 1)

  return () => {
    clearTimeout(timeout)
  }
})
</script>

<template>
  <div
    class="transition-all-200 ease-in card"
    :class="[loading ? 'translate-x-full' : 'translate-x-0', colors[toast.type]]"
  >
    {{ toast.message }}
  </div>
</template>
