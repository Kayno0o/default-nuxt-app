<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

const props = defineProps<{
  class?: string
  href: string
  icon: { color: string, icon: string }
  type?: 'copy'
}>()

const { copy, copied } = useClipboard()

function onCopy(event: MouseEvent) {
  if (props.type !== 'copy')
    return

  event.preventDefault()
  event.stopPropagation()
  copy(props.href)
}
</script>

<template>
  <NuxtLink
    :to="href"
    target="_blank"
    rel="noreferrer"
    :class="twMerge(
      `
        relative flex w-full flex-row items-center justify-center rounded-xl
        bg-white px-6 py-2 font-bold text-black shadow-md
        transition-transform duration-150 hover:scale-105 hover:odd:rotate-1 hover:even:-rotate-1
      `,
      $props.class,
      copied ? 'shadow-[inset_0_0_0_2px_#86efac]' : '',
    )"
    @click="onCopy"
  >
    <div
      class="absolute left-3 size-6"
      :class="[!copied ? icon.icon : '', icon.color]"
    />

    <span class="text-center">
      <slot />
      {{ copied ? 'Copied !' : '' }}
    </span>
  </Nuxtlink>
</template>
