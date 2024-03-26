<script setup lang="ts">
const props = defineProps<{
  horizontal?: boolean
  vertical?: boolean
}>()

const isOpen = defineModel({ default: () => false })

const text = ref<HTMLDivElement>()
const style = ref('')

const { start, stop } = useTimeoutFn((val: string) => {
  if (isOpen.value)
    style.value = val
}, 300)

watch([isOpen], async () => {
  stop()

  const rect = getElementBoundingBox(text.value)

  // animate close
  if (!isOpen.value) {
    style.value = [
      props.horizontal && `width:${rect.scrollWidth}px`,
      props.vertical && `height:${rect.scrollHeight}px`,
    ].filter(v => !!v).join(';')

    // await for the dom to update
    await new Promise((resolve) => {
      setTimeout(resolve, 1)
    })
  }

  // animate close or open, depending on isOpen
  style.value = [
    props.horizontal && `width:${isOpen.value ? rect.scrollWidth : 0}px`,
    props.vertical && `height:${isOpen.value ? rect.scrollHeight : 0}px`,
  ]
    .filter(v => !!v)
    .join(';')

  // remove size limits after animation finishes, avoid blocking size of elements inside
  if (isOpen.value)
    start('')
}, { immediate: true })
</script>

<template>
  <div
    ref="text"
    class="overflow-hidden transition-all-300"
    :style="style"
  >
    <slot />
  </div>
</template>
