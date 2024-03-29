<script setup lang="ts">
const theme = useCookie('dark-mode')
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <Click
    class="m-0.5 mt-4 size-7 bg-accent p-1.5 round"
    aria-label="Dark or Light theme toggle"
    @click="toggleTheme"
  >
    <div class="relative size-full">
      <div
        class="ph:moon-bold absolute inset-0 size-full text-dark transition-all-300"
        :class="[
          theme === 'dark' ? 'rotate-0 op100' : 'rotate-180 op0',
        ]"
      />
      <div
        class="ph:sun-bold absolute inset-0 size-full text-dark transition-all-300"
        :class="[
          theme === 'dark' ? '-rotate-180 op0' : 'rotate-0 op100',
        ]"
      />
    </div>
  </Click>
</template>
