<script setup lang="ts">
import type { RouteComponent } from 'vue-router'

defineProps<{
  to: string | RouteComponent
}>()
</script>

<template>
  <NuxtLink :to="to" class="relative text-light underline decoration-accent underline-offset-2 transition-colors duration-300 hover:text-accent">
    <slot />
  </NuxtLink>
</template>
