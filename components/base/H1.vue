<script setup lang="ts">
import { type ClassNameValue, twMerge } from 'tailwind-merge'

defineProps<{
  class?: ClassNameValue
}>()
</script>

<template>
  <h1 :class="twMerge('mb-4 text-5xl font-black', $props.class)">
    <slot />
  </h1>
</template>
