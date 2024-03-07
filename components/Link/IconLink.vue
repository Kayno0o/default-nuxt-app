<script setup lang="ts">
defineProps<{
  className?: string
  href: string
  icon: string
  ariaLabel?: string
}>()
</script>

<template>
  <NuxtLink
    class="size-8 bg-white"
    :class="[icon]"
    :to="href"
    :aria-label="ariaLabel"
    target="_blank"
    rel="noopener noreferrer"
  />
</template>
