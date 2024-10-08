<script setup lang="ts">
import type { ClassNameValue } from 'tailwind-merge'

defineProps<{
  class?: ClassNameValue
}>()
</script>

<template>
  <h1 class="mb-4 text-4xl font-black">
    <slot />
  </h1>
</template>
