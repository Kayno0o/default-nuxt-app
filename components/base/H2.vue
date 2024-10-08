<script setup lang="ts">
import type { ClassNameValue } from 'tailwind-merge'

defineProps<{
  class?: ClassNameValue
}>()
</script>

<template>
  <h2 class="mb-3 text-2xl font-black">
    <slot />
  </h2>
</template>
