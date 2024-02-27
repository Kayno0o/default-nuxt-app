<script setup lang="ts">
import type { RouteComponent } from 'vue-router'

defineProps<{
  to: string | RouteComponent
}>()
</script>

<template>
  <NuxtLink :to="to" class="text-light transition-colors border-b border-b-accent hover:text-accent">
    <slot />
  </NuxtLink>
</template>
