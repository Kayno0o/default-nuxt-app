<script setup lang="ts">
defineProps<{
  label: string
  id: string
}>()

const model = defineModel<boolean>({ default: () => false })
</script>

<template>
  <label :for="id">
    <input
      :id="id"
      v-model="model"
      type="checkbox"
      :label="label"
      :aria-label="label"
      class="mr-1"
    >

    {{ label }}
  </label>
</template>
