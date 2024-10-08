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
  <div class="grid grid-cols-[auto_1fr] min-h-screen w-full overflow-x-hidden bg-dark text-light transition-colors-300">
    <ToastManager />
    <IncHeader />
    <main class="mt-6 py-8 content md:mt-0">
      <slot />
    </main>
  </div>
</template>
