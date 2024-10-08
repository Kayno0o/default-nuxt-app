<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  to: string | RouteLocationRaw
}>()
</script>

<template>
  <NuxtLink :to="to" class="relative text-light underline decoration-accent underline-offset-2 transition-colors-300 hover:text-accent">
    <slot />
  </NuxtLink>
</template>
