<script setup lang="ts">
import { type ClassNameValue, twMerge } from 'tailwind-merge'

defineProps<{
  class?: ClassNameValue
}>()
</script>

<template>
  <h3 :class="twMerge('mb-2 text-2xl font-bold', $props.class)">
    <slot />
  </h3>
</template>
