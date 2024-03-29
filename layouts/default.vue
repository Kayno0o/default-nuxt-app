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
  <div class="grid w-full bg-dark text-light min-h-screen grid-cols-[auto_1fr] overflow-x-hidden transition-colors-300">
    <ToastManager />
    <IncHeader />
    <main class="content mt-6 py-8 md:mt-0">
      <slot />
    </main>
  </div>
</template>
