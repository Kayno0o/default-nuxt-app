<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
  rounded?: boolean
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
    class="flex gap-2 px-3 text-dark h-fit w-fit bg-accent py-0.5 b-none"
    :class="[
      rounded ? 'round' : 'rounded',
    ]"
    @click.stop.prevent="onClick"
  >
    <slot />
  </component>
</template>
