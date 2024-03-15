<script setup lang="ts">
import type { InputAutocompleteType } from '~/types/input';

defineProps<{
  id: string
  label: string
  type?: HTMLInputElement['type']
  autocomplete?: InputAutocompleteType
}>()

const modelValue = defineModel<string | number | null>({ default: () => null })

const isFocus = ref(false)

watch([modelValue, isFocus], () => {

}, { immediate: true })
</script>

<template>
  <div class="relative z-0 group">
    <label
      :for="id"
      class="left-2.5 text-base absolute w-fit px-0 z-10 pointer-events-none h-fit inset-y-0 my-auto transition-all-300"
      :class="(modelValue || isFocus) && 'bottom-full text-sm !left-1 -top-1 px-1'"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      v-model="modelValue"
      :name="id"
      :label="label"
      :aria-label="label"
      :type="type"
      class="w-full relative rounded bg-dark px-2 py-0.5 text-light ring-0 border-0 outline-0"
      @focus="isFocus = true"
      @blur="isFocus = false"
    >
    <div class="absolute -inset-0.5 -z-1 rounded pointer-events-none flex">
      <div class="b-tlb-[1,accent] rounded-l w-1.5" />
      <div class="b-b-[1,accent]" :class="!(modelValue || isFocus) && 'b-t-[1,accent]'">
        <span class="op-0">{{ label }}</span>
      </div>
      <div class="b-trb-[1,accent] rounded-r grow" />
    </div>
  </div>
</template>
