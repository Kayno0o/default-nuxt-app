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
  <div class="bg-dark text-light min-h-screen w-full transition-colors">
    <IncHeader />
    <div class="container py-4">
      <slot />
    </div>
  </div>
</template>
