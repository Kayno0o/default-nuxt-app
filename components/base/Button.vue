<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

const props = defineProps<{
  rounded?: boolean
  class?: string
}>()
</script>

<template>
  <button
    :class="twMerge(
      'h-fit flex gap-2 w-fit bg-accent px-3 py-0.5 border-none text-black',
      rounded ? 'rounded-full' : 'rounded-md',
      props.class,
    )"
  >
    <slot />
  </button>
</template>
