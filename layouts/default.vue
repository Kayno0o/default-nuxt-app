<script setup lang="ts">
import { useDark } from '@vueuse/core'

useDark({
  attribute: 'data-theme',
  initOnMounted: true,
  initialValue: 'dark',
})
</script>

<template>
  <div class="bg-dark text-light min-h-screen w-full">
    <IncHeader />
    <div class="container px-8 py-4 mx-auto">
      <slot />
    </div>
  </div>
</template>
