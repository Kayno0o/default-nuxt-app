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
    class="absolute inset-0 z-40 flex max-h-svh max-w-[100svw] items-center justify-center px-4 py-24"
  >
    <div class="absolute inset-0 -z-10 bg-black opacity-50" @click="onClose" />

    <div class="relative mx-8 flex w-full items-center justify-center">
      <div class="w-full max-w-xl grow rounded-md border border-accent bg-dark px-6 py-4 md:px-12">
        <slot />
      </div>

      <div v-if="!persistent" class="absolute right-1 top-1 z-10 cursor-pointer p-1" @click="onClose">
        <div class="i-ph-x-bold size-5" />
      </div>
    </div>
  </div>
</template>
