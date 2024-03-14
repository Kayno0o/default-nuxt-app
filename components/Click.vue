<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', event: MouseEvent | KeyboardEvent): void
}>()

function handleEvent(e: MouseEvent | KeyboardEvent) {
  if (e instanceof MouseEvent || (e instanceof KeyboardEvent && e.key === 'Enter'))
    emit('click', e)
}
</script>

<template>
  <div
    class="cursor-pointer select-none"
    role="button"
    tabindex="0"
    @click="handleEvent"
    @keydown="handleEvent"
  >
    <slot />
  </div>
</template>
