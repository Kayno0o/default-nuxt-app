<script setup lang="ts">
const props = defineProps<{
  horizontal?: boolean
  vertical?: boolean
}>()
const model = defineModel({ default: () => false })

const text = ref<HTMLDivElement>()
const style = ref('')

watch(model, () => {
  const rect = getElementBoundingBox(text.value)
  style.value = [
    props.horizontal && `width: ${model.value ? rect.width : 0}px;`,
    props.vertical && `height: ${model.value ? rect.height : 0}px;`,
  ].filter(v => !!v).join('')
}, { immediate: true })
</script>

<template>
  <div
    class="overflow-hidden transition-all duration-300"
    :style="style"
  >
    <div ref="text">
      <slot />
    </div>
  </div>
</template>
