<script setup lang="ts">
import type { ClassNameValue } from 'tailwind-merge'

defineProps<{
  class?: ClassNameValue
}>()
</script>

<template>
  <h4 class="mb-2 text-lg font-bold">
    <slot />
  </h4>
</template>
