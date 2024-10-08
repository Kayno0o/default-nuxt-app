<script setup lang="ts">
const props = defineProps<{
  persistent?: boolean
}>()

const emit = defineEmits<(e: 'close') => void>()

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
    class="absolute inset-0 z-40 max-w-100svw flex items-center justify-center px-4 py-24 max-h-svh"
  >
    <div class="absolute inset-0 bg-black op50 -z-10" @click="onClose" />

    <div class="relative mx-8 w-full flex items-center justify-center">
      <div class="max-w-xl w-full grow b-1 b-accent b-solid bg-dark px-6 py-4 rounded md:px-12">
        <slot />
      </div>

      <div v-if="!persistent" class="absolute right-1 top-1 z-10 cursor-pointer p-1" @click="onClose">
        <div class="ph:x-bold size-5" />
      </div>
    </div>
  </div>
</template>
