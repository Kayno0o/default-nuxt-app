<script setup lang="ts">
const error = useError()
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col items-center gap-4">
      {{ error ? error.message : 'no error' }}

      <BaseLink to="/">
        Go back to navigation
      </BaseLink>
    </div>
  </NuxtLayout>
</template>
