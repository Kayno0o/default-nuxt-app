<script setup lang="ts">
const props = defineProps<{
  persistent?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const modal = defineModel({ default: () => false })

function onClose() {
  if (props.persistent)
    return

  modal.value = !modal.value
  emit('close')
}
</script>

<template>
  <div
    v-show="modal"
    class="flex items-center absolute inset-0 z-40 max-h-svh max-w-100svw justify-center px-4 py-24"
  >
    <div class="absolute inset-0 -z-10 bg-black op50" @click="onClose" />

    <div class="flex items-center justify-center relative mx-8 w-full">
      <div class="w-full max-w-xl grow rounded b-1 b-solid b-accent bg-dark px-6 py-4 md:px-12">
        <slot />
      </div>

      <div v-if="!persistent" class="absolute cursor-pointer right-1 top-1 z-10 p-1" @click="onClose">
        <div class="ph:x-bold size-5" />
      </div>
    </div>
  </div>
</template>
