<script setup lang="ts">
defineProps<{
  id: string
  label: string
  type?: HTMLInputElement['type']
}>()
const modelValue = defineModel<string | number | null>({ default: () => null })
</script>

<template>
  <div class="wrapper">
    <label :for="id" :class="modelValue && 'has-content'">
      {{ label }}
    </label>
    <input
      :id="id"
      v-model="modelValue"
      :name="id"
      :label="label"
      :aria-label="label"
      :type="type"
      class="w-full"
    >
  </div>
</template>

<style scoped>
input {
  @apply relative rounded-md border border-accent bg-dark px-2 py-1 text-light outline-2 outline-transparent ring-0;
  @apply transition-colors duration-300;
}

input:focus {
  @apply outline-accent;
}

.wrapper {
  @apply relative z-0;
}

label {
  @apply left-3 text-base absolute w-fit px-0 z-10 pointer-events-none h-fit inset-y-0 my-auto;
  @apply transition-all duration-300;

  background: linear-gradient(0, transparent 40%, rgb(var(--dark)) 40%, rgb(var(--dark)) 60%, transparent 60%);
}

.wrapper:has(:focus) label, label.has-content {
  @apply bottom-full text-sm left-2 px-1;
}
</style>
