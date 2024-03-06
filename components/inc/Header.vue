<script setup lang="ts">
import ThemeToggle from '~/components/ThemeToggle.vue'

const links: { url: string, text: string }[] = [
  {
    url: '/',
    text: 'Home',
  },
  {
    url: '/games',
    text: 'Games',
  },
  {
    url: '/l',
    text: 'Links',
  },
  {
    url: '/contact',
    text: 'Contact',
  },
]
</script>

<template>
  <div class="border-b border-b-accent">
    <div class="container flex flex-wrap justify-between py-2">
      <h1 class="font-title text-lg">
        &lt;Kayno0o/default-nuxt-app
      </h1>
      <nav>
        <ul class="flex gap-4">
          <li v-for="link in links" :key="link.text">
            <BaseLink :to="link.url">
              {{ link.text }}
            </BaseLink>
          </li>
        </ul>
      </nav>
      <div class="flex gap-2">
        <ThemeToggle />

        <span class="font-bold">
          /&gt;
        </span>
      </div>
    </div>
  </div>
</template>
