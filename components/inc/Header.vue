<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="border-b border-b-accent px-8 py-2 flex justify-between flex-wrap">
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
      <client-only>
        <BaseButton class="font-title p-1 aspect-square" rounded @click="toggleDark()">
          <svg class="size-4 aspect-square" :class="isDark ? 'i-mdi-moon-and-stars' : 'i-mdi-weather-sunny'" />
        </BaseButton>
      </client-only>
      /&gt;
    </div>
  </div>
</template>
