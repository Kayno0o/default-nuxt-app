<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

defineProps<{
  title: string
  profileSrc: string
  wallpaperSrc: string
  icons: { href: string, icon: string, label: string }[]
  links: {
    text: string
    class: string
    href: string
    icon: { color: string, icon: string }
    type?: 'copy'
  }[]
}>()

const shareModal = ref(false)
</script>

<template>
  <div class="relative flex min-h-screen justify-center">
    <div
      :class="twMerge('absolute inset-0 bg-cover bg-center', wallpaperSrc)"
    />

    <div class="absolute inset-0 bg-black/40" />

    <button
      class="absolute left-6 top-6 z-10 flex cursor-pointer flex-col items-center text-white md:left-12 md:top-12"
      @click="shareModal = true"
    >
      <span class="i-ph-share size-10" />
      <span class="hidden text-lg font-black md:inline-block">Share</span>
    </button>

    <LinkShareModal v-model="shareModal" />

    <div class="relative mx-6 flex size-full min-h-screen max-w-2xl flex-col px-6 py-12">
      <div class="flex w-full flex-[1] flex-col items-center justify-between gap-10">
        <div class="flex w-full flex-col items-center gap-8">
          <img
            :src="profileSrc"
            width="160px"
            height="160px"
            alt="profile"
            class="w-40 rounded-full border-2 border-white shadow-md"
          >

          <BaseH1 class="text-center text-white">
            {{ title }}
          </BaseH1>
        </div>

        <div class="flex h-8 gap-6">
          <LinkIconLink
            v-for="icon in icons"
            :key="icon.icon"
            :href="icon.href"
            :icon="icon.icon"
            :aria-label="icon.label"
          />
        </div>

        <div class="flex w-full flex-[1] flex-col gap-4">
          <LinkCustomLink
            v-for="link in links"
            :key="link.class"
            :href="link.href"
            :class="link.class"
            :icon="{ color: link.icon.color, icon: link.icon.icon }"
            :type="link.type"
          >
            {{ link.text }}
          </LinkCustomLink>
        </div>

        <NuxtLink to="/" class="mt-auto justify-self-end text-2xl font-bold text-slate-200">
          <h2>Kaynooo.xyz</h2>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
