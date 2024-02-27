<script setup lang="ts">
const error = useError()
</script>

<template>
  <NuxtLayout>
    <div class="flex items-center flex-col gap-4">
      {{ error.message }}

      <BaseLink to="/">
        Go back to navigation
      </BaseLink>
    </div>
  </NuxtLayout>
</template>
