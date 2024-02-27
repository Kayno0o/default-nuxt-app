<script setup lang="ts">
import * as Popper from '@popperjs/core'

const props = defineProps<{
  content?: string
  placement?: Popper.Placement
  show?: boolean
  activatorIs?: string
  truncate?: boolean
  class?: string
}>()

defineSlots<{
  content: () => any
  default: () => any
}>()

const activatorElement = ref<HTMLElement>()
const contentElement = ref<HTMLElement>()
const popper = ref<Popper.Instance | null>(null)
const show = ref(false)
const enabled = ref(false)

watch([activatorElement, contentElement], () => {
  if (activatorElement.value) {
    enabled.value = props.truncate ? activatorElement.value.offsetWidth < activatorElement.value.scrollWidth : true

    if (popper.value)
      return popper.value.update()
  }
})

onBeforeUnmount(() => {
  destroyPopper()
  enabled.value = false
})

function createPopper() {
  if (!enabled.value)
    return

  show.value = true

  if (!activatorElement.value || !contentElement.value || popper.value)
    return

  popper.value = Popper.createPopper(activatorElement.value, contentElement.value, {
    strategy: 'fixed',
    placement: props.placement ?? 'top',
    modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
  })
}

function destroyPopper() {
  if (popper.value)
    popper.value.destroy()
  popper.value = null
  show.value = false
}
</script>

<template>
  <component
    :is="activatorIs ?? 'span'"
    ref="activatorElement"
    :class="[truncate ? 'text-truncate' : '', $props.class]"
    @mouseenter="createPopper"
    @mouseleave="destroyPopper"
  >
    <slot />
  </component>

  <div v-show="show" ref="contentElement" class="popper">
    <div class="px-3 py-1 bg-[#555]">
      <slot name="content" />
      {{ content }}
    </div>
  </div>
</template>
