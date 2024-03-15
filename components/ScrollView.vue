<script setup lang="ts">
const scroll = ref<HTMLDivElement>()
useResizeObserver(scroll, onResize)
useMutationObserver(scroll, onResize, {
  childList: true,
})

const sticky = ref(true)
const lastScrollTop = ref(0)
const atBottom = ref(false)

function onResize() {
  if (sticky.value)
    scrollToBottom()
}

function stickScroll() {
  sticky.value = true
  scrollToBottom()
}

function scrollToBottom() {
  if (!scroll.value)
    return
  lastScrollTop.value = scroll.value.scrollTop

  scroll.value.scroll({
    top: scroll.value.scrollHeight,
    behavior: 'smooth',
  })
}

function onScroll() {
  if (!scroll.value)
    return

  atBottom.value = scroll.value && scroll.value.scrollHeight - scroll.value.clientHeight === scroll.value.scrollTop

  if (scroll.value.scrollTop < lastScrollTop.value)
    sticky.value = false
  else if (atBottom.value)
    sticky.value = true

  lastScrollTop.value = scroll.value.scrollTop
}
</script>

<template>
  <div class="relative">
    <div ref="scroll" class="relative flex flex-col scrollbar-hidden h-full gap-1 overflow-y-auto" @scroll="onScroll">
      <slot />
    </div>
    <Click v-show="!sticky" class="absolute b-1 b-solid bottom-0 right-0 grid size-7 place-items-center round b-light p-0.5" @click="stickScroll">
      <div class="ph:arrow-down-bold size-full text-light" />
    </Click>
  </div>
</template>
