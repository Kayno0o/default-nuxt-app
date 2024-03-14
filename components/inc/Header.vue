<script setup lang="ts">
import useBreakpointValue from '~/composables/useBreakpointValue'

const route = useRoute()

const header = ref<HTMLDivElement>()
const expand = ref(false)
const toggleExpand = useToggle(expand)

onClickOutside(header, () => expand.value = false)

const links = [
  { icon: 'i-ph-house-bold', url: '/', text: 'Home' },
  { icon: 'i-ph-game-controller-bold', url: '/games', text: 'Games' },
]

const active = computed<string>(() => links.reduce((acc, curr) => {
  if (route.path.startsWith(curr.url) && curr.url.length > acc.length)
    return curr.url

  return acc
}, ''))

const iconsExpand = useBreakpointValue({
  md: true,
}, expand)
</script>

<template>
  <div class="md:w-12" />
  <div
    ref="header"
    class="
      fixed inset-y-0 left-0 z-50 flex h-fit flex-col rounded-br-xl border-b border-r border-accent bg-dark p-2 transition-all duration-300
      md:h-full md:rounded-none md:border-b-0 md:py-4
    "
    :class="expand ? 'w-40' : 'w-12'"
  >
    <Click
      class="flex h-8 place-items-center items-center justify-center font-anta text-accent"
      @click="() => toggleExpand()"
    >
      &lt;
      <div class="overflow-hidden text-light">
        <span class="px-1">Kaynooo.xyz</span>
      </div>
      /&gt;
    </Click>

    <Expand :model-value="iconsExpand" vertical :class="iconsExpand && 'mt-3'">
      <NuxtLink
        v-for="link in links"
        :key="link.url"
        class="flex overflow-hidden p-1 transition-colors duration-300"
        :class="[
          link.url === active ? 'text-accent' : 'text-light',
        ]"
        :to="link.url"
      >
        <div class="aspect-square size-6" :class="link.icon" />
        <div class="overflow-hidden pl-2 text-light transition-colors duration-300 hover:text-accent">
          {{ link.text }}
        </div>
      </NuxtLink>
    </Expand>
  </div>
</template>
