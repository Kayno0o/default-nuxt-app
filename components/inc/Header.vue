<script setup lang="ts">
import useBreakpointValue from '~/composables/useBreakpointValue'

const route = useRoute()

const header = ref<HTMLDivElement>()
const expand = ref(false)
const toggleExpand = useToggle(expand)

onClickOutside(header, () => expand.value = false)

type LinkType = { [key in 'icon' | 'url' | 'text']: string }

const links = computed<LinkType[]>(() => {
  const list: (LinkType | undefined)[] = [
    { icon: 'ph:house-bold', url: '/', text: 'Home' },
  ]
  return list.filter(l => !!l) as LinkType[]
})

const active = computed<string>(() => links.value.reduce((acc, curr) => {
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
    class="fixed z-100 h-fit w-fit b-br-[1,accent] rounded-br-xl bg-dark p-2 transition-all-300"
  >
    <Click class="mx-auto h-8 w-fit flex items-center justify-center font-anta md:mb-3" @click="() => toggleExpand()">
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
        class="my-1 flex p-1 transition-colors-300"
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
