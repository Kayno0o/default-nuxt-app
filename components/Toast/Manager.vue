<script setup lang="ts">
import useToast from '~/composables/useToast'

const { toasts } = useToast()
</script>

<template>
  <div class="fixed bottom-8 right-8 flex flex-col gap-4">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :toast="toast"
    />
  </div>
</template>
