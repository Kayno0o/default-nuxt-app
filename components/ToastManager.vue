<script setup lang="ts">
import useToast from '~/composables/useToast'
import type { ToastType } from '~/types/toast'

const { toasts } = useToast()

const colors: { [key in ToastType]: string } = {
  error: 'bg-red-400/25',
  warning: 'bg-amber-400/25',
  success: 'bg-emerald-400/25',
}
</script>

<template>
  <div class="fixed bottom-8 right-8 flex flex-col gap-4">
    <BaseCard
      v-for="toast in toasts"
      :key="toast.id"
      :classname="{
        bg: colors[toast.type],
      }"
    >
      {{ toast.message }}
    </BaseCard>
  </div>
</template>
