<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

const props = defineProps<{
  rounded?: boolean
  class?: string
}>()

const classes = computed(() => twMerge(
  'h-fit flex gap-2 w-fit bg-accent px-3 py-1 border-none text-black',
  props.class,
))
</script>

<template>
  <button
    :class="[
      rounded ? 'rounded-full' : 'rounded-md',
      classes,
    ]"
  >
    <slot />
  </button>
</template>
