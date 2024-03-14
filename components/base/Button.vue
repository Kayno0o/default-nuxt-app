<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  rounded?: boolean
  class?: string
  to?: RouteLocationRaw
}>()

const emit = defineEmits<{
  (e: 'click', event: PointerEvent): void
}>()

const router = useRouter()

function onClick(e: PointerEvent) {
  if (props.to)
    router.push(props.to)
  else emit('click', e)
}
</script>

<template>
  <component
    :is="to ? 'a' : 'button'"
    :href="to"
    :class="twMerge(
      'h-fit flex gap-2 w-fit bg-accent px-3 py-0.5 border-none text-black',
      rounded ? 'rounded-full' : 'rounded-md',
      props.class,
    )"
    @click.stop.prevent="onClick"
  >
    <slot />
  </component>
</template>
