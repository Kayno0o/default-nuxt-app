<script setup lang="ts">
import type { Toast, ToastType } from '~/types/toast'

defineProps<{ toast: Toast }>()

const loading = ref(true)

const colors: { [key in ToastType]: string } = {
  error: 'bg-red-400/25',
  warning: 'bg-amber-400/25',
  success: 'bg-emerald-400/25',
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
  <BaseCard
    class="transition-all duration-200 ease-in"
    :class="[loading ? 'translate-x-full' : 'translate-x-0']"
    :classname="{
      bg: colors[toast.type],
    }"
  >
    {{ toast.message }}
  </BaseCard>
</template>
