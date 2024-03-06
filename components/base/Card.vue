<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { TWProps } from '~/types/tw'

defineProps<TWProps<'bg'>>()
</script>

<template>
  <div
    :class="twMerge(
      'relative rounded-md border border-light/25 bg-dark px-4 py-2',
      $props.class,
    )"
  >
    <div
      :class="twMerge(
        'pointer-events-none rounded-[inherit] absolute inset-0 bg-light/5',
        $props.classname?.bg,
      )"
    />
    <slot />
  </div>
</template>
