<script setup lang="ts">
import useBreakpointValue from '~/composables/useBreakpointValue';

const route = useRoute()

const header = ref<HTMLDivElement>()
const expand = ref(false)
const toggleExpand = useToggle(expand)

onClickOutside(header, () => expand.value = false)

const links = [
  { icon: 'ph:house-bold', url: '/', text: 'Home' },
  { icon: 'ph:game-controller-bold', url: '/games', text: 'Games' },
]

const active = computed<string>(() => links.reduce((acc, curr) => {
  if (route.path.startsWith(curr.url) && curr.url.length > acc.length)
    return curr.url

  return acc
}, ''))

const iconsExpand = useBreakpointValue({ md: true }, expand)
</script>

<template>
  <div class="md:w-12" />
  <div
    ref="header"
    class="fixed z-100 w-fit h-fit rounded-br-xl b-br-[1,accent] p-2 bg-dark transition-all-300"
  >
    <Click class="flex w-fit justify-center h-8 md:mb-3 items-center font-anta" @click="() => toggleExpand()">
      <span class="text-accent">&lt;</span>
      <Expand horizontal :model-value="expand" :class="expand ? 'mx-1' : 'mx-0'">
        <p>Kaynooo</p>
      </Expand>
      <span class="text-accent">/&gt;</span>
    </Click>

    <Expand vertical :model-value="iconsExpand">
      <NuxtLink
        v-for="link in links"
        :key="link.url"
        class="flex p-1 transition-colors-300"
        :class="[
          link.url === active ? 'text-accent' : 'text-light',
        ]"
        :to="link.url"
      >
        <div class="aspect-square size-6" :class="link.icon" />
        <Expand :model-value="expand" horizontal class="text-light hover:text-accent">
          <p class="w-max pl-2">
            {{ link.text }}
          </p>
        </Expand>
      </NuxtLink>

      <ThemeToggle />
    </Expand>
  </div>
</template>
