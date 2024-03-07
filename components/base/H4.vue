<script setup lang="ts">
import { type ClassNameValue, twMerge } from 'tailwind-merge'

defineProps<{
  class?: ClassNameValue
}>()
</script>

<template>
  <h4 :class="twMerge('mb-2 text-xl font-bold', $props.class)">
    <slot />
  </h4>
</template>
