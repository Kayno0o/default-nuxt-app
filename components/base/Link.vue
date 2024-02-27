<script setup lang="ts">
import type { RouteComponent } from 'vue-router'

defineProps<{
  to: string | RouteComponent
}>()
</script>

<template>
  <NuxtLink :to="to" class="group relative text-light transition-colors hover:text-accent">
    <slot />
    <div class="absolute inset-x-0 top-full mx-auto h-[1px] w-2 bg-accent transition-all group-hover:w-full" />
  </NuxtLink>
</template>
