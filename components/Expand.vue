<script setup lang="ts">
const props = defineProps<{
  horizontal?: boolean
  vertical?: boolean
}>()

const isOpen = defineModel<boolean>({ default: () => true })

const text = ref<HTMLDivElement>()
const style = ref('')
const hidden = ref(false)

const { start, stop } = useTimeoutFn((val: string) => {
  style.value = val
}, 300)

// toggle hide
const { start: startHidden, stop: stopHidden } = useTimeoutFn(() => {
  hidden.value = !isOpen.value
}, 300)

async function waitDom() {
  await new Promise((resolve) => {
    setTimeout(resolve, 1)
  })
}

watch([isOpen], async () => {
  stop()
  stopHidden()

  // animate close
  if (!isOpen.value) {
    style.value = [
      props.horizontal && `width:${text.value?.scrollWidth ?? 0}px`,
      props.vertical && `height:${text.value?.scrollHeight ?? 0}px`,
    ].filter(value => !!value).join(';')

    await waitDom()
  }
  else {
    hidden.value = false
    await waitDom()
  }

  // animate close or open, depending on isOpen
  style.value = [
    props.horizontal && `width:${isOpen.value ? text.value?.scrollWidth : 0}px`,
    props.vertical && `height:${isOpen.value ? text.value?.scrollHeight : 0}px`,
  ]
    .filter(value => !!value)
    .join(';')

  // remove size limits after animation finishes, avoid blocking size of elements inside
  if (isOpen.value) {
    start('')
    return
  }

  startHidden()
}, { immediate: true })
</script>

<template>
  <slot
    name="activator"
    :aria-expanded="isOpen"
    @click="isOpen = !isOpen"
  />

  <div
    ref="text"
    role="region"
    class="overflow-hidden transition-all duration-300"
    :style
    :hidden
  >
    <slot />
  </div>
</template>
