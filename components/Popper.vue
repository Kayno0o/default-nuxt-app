<script setup lang="ts">
import * as Popper from '@popperjs/core'
import { twMerge } from 'tailwind-merge'

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

const classes = computed(() => twMerge(
  props.truncate ? 'truncate' : '',
  props.class,
))

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
    :class="classes"
    @mouseenter="createPopper"
    @mouseleave="destroyPopper"
  >
    <slot />
  </component>

  <div v-show="show" ref="contentElement">
    <div class="bg-[#555] px-3 py-1">
      <slot name="content" />
      {{ content }}
    </div>
  </div>
</template>
