<script setup lang="ts">
const props = defineProps<{
  horizontal?: boolean
  vertical?: boolean
}>()
const model = defineModel({ default: () => false })

const text = ref<HTMLDivElement>()
const style = ref('')

watch([model, text], () => {
  const rect = getElementBoundingBox(text.value)
  style.value = [
    props.horizontal && `width: ${model.value ? rect.scrollWidth : 0}px;`,
    props.vertical && `height: ${model.value ? rect.scrollHeight : 0}px;`,
  ].filter(v => !!v).join('')
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
