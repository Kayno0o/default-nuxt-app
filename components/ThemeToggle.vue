<script setup lang="ts">
const theme = useCookie('dark-mode')
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div
    class="size-7 bg-accent round p-1.5 mt-4 m-0.5"
    aria-label="Dark or Light theme toggle"
    @click="toggleTheme"
  >
    <div class="relative size-full">
      <div
        class="absolute inset-0 size-full transition-all-300 text-dark i-ph-moon-bold"
        :class="[
          theme === 'dark' ? 'rotate-0 op100' : 'rotate-180 op0',
        ]"
      />
      <div
        class="absolute inset-0 size-full transition-all-300 text-dark ph:sun-bold"
        :class="[
          theme === 'dark' ? '-rotate-180 op0' : 'rotate-0 op100',
        ]"
      />
    </div>
  </div>
</template>
