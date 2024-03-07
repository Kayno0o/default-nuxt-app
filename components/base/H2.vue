<script setup lang="ts">
import { type ClassNameValue, twMerge } from 'tailwind-merge'

defineProps<{
  class?: ClassNameValue
}>()
</script>

<template>
  <h1 :class="twMerge('mb-3 text-3xl font-black', $props.class)">
    <slot />
  </h1>
</template>
