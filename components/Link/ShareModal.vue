<script setup lang="ts">
const show = defineModel<boolean>({ default: () => false })

const url = useBrowserLocation()
const source = 'kaynoooxyz_linktree_profile_share'

const shareLinks: { icon: string, link: string, name: string }[] = [
  {
    icon: 'i-ri-facebook-fill',
    link: `https://www.facebook.com/sharer.php?u=${url.value.href}?utm_source=${source}`,
    name: 'Facebook',
  },
  {
    icon: 'i-ri-linkedin-fill',
    link: `https://www.linkedin.com/sharing/share-offsite/?url=${url.value.href}?utm_source=${source}`,
    name: 'LinkedIn',
  },
  {
    icon: 'i-ri-twitter-x-fill',
    link: `https://twitter.com/intent/tweet?text=${url.value.href}?utm_source=${source}`,
    name: 'Twitter',
  },
  {
    icon: 'i-ri-whatsapp-line',
    link: `https://wa.me/?text=${url.value.href}?utm_source=${source}`,
    name: 'WhatsApp',
  },
  {
    icon: 'i-ri-messenger-fill',
    link: 'https://www.messenger.com/new',
    name: 'Messenger',
  },
  {
    icon: 'i-ph-envelope-simple-bold',
    link: `mailto:?subject=Regarde cette page de fou !&body=${url.value.href}?utm_source=${source}`,
    name: 'Email',
  },
]

function close() {
  show.value = false
}
</script>

<template>
  <div
    v-show="show"
    class="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    role="button"
    tabindex="0"
    @click="close"
    @keyup.enter="close"
  >
    <div
      class="relative mx-6 max-w-md w-full cursor-default rounded-md bg-dark px-6 py-4 text-light"
      role="button"
      tabindex="0"
      @click.stop
      @keyup.enter.stop
    >
      <button
        class="i-ph-x absolute right-4 top-4 mr-2 size-8 rotate-0 cursor-pointer p-1 transition-transform duration-300 hover:rotate-45"
        aria-label="Close"
        @click="close"
        @keyup.enter="close"
      />

      <h2 class="text-center text-2xl font-bold">
        Share this page
      </h2>

      <div class="mt-8 flex flex-col">
        <NuxtLink
          v-for="shareLink in shareLinks"
          :key="shareLink.name"
          :to="shareLink.link"
          target="_blank"
          rel="noreferrer"
          class="group relative mx-2 flex items-center gap-4 py-4"
        >
          <div class="size-6 bg-light" :class="shareLink.icon" />
          <span class="text-lg font-bold">{{ shareLink.name }}</span>

          <div class="i-ph-share-fat-bold absolute right-4 size-7 translate-x-0 rotate-0 transition-transform duration-500 group-hover:translate-x-4 group-hover:rotate-45" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
