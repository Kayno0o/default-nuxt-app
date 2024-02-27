<script setup lang="ts">
const theme = useCookie('dark-mode')
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <BaseButton class="size-6 p-1 font-title" rounded @click="toggleTheme">
    <div class="relative size-full">
      <div class="i-ph-moon-bold absolute inset-0 size-full rotate-180 opacity-0 transition-all dark:rotate-0 dark:opacity-100" />
      <div class="i-ph-sun-bold absolute inset-0 size-full rotate-0 opacity-100 transition-all dark:-rotate-180 dark:opacity-0" />
    </div>
  </BaseButton>
</template>
