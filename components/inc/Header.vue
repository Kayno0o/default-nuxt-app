<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const theme = useCookie('dark-mode')
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="border-b border-b-accent">
    <div class="container flex py-2 justify-between flex-wrap">
      <h1 class="font-title text-lg">
        &lt;Kayno0o/default-nuxt-app
      </h1>
      <nav>
        <ul class="flex gap-4">
          <li>
            <BaseLink to="/">
              Home
            </BaseLink>
          </li>
          <li>
            <BaseLink to="/404">
              404
            </BaseLink>
          </li>
        </ul>
      </nav>
      <div class="flex gap-2">
        <BaseButton class="font-title p-1 aspect-square" rounded @click="toggleTheme">
          <svg class="size-4 aspect-square" :class="theme === 'dark' ? 'i-mdi-moon-and-stars' : 'i-mdi-weather-sunny'" />
        </BaseButton>
        /&gt;
      </div>
    </div>
  </div>
</template>
