<script setup lang="ts">
const isdark = useCookie<'dark' | 'light' | 'no-preference'>('dark-mode', { default: () => 'no-preference' })

if (isdark.value === 'no-preference')
  isdark.value = usePreferredColorScheme().value

useHead({
  htmlAttrs: {
    'data-theme': () => isdark.value === 'dark' ? 'dark' : 'light',
  },
})
</script>

<template>
  <div class="grid min-h-screen w-full grid-cols-[auto_1fr] overflow-x-hidden bg-dark text-light transition-colors duration-300">
    <ToastManager />
    <IncHeader />
    <div class="container mt-6 py-8 md:mt-0">
      <slot />
    </div>

    <ThemeToggle />
  </div>
</template>
