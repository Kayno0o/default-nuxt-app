<script setup lang="ts" generic="T extends string | number | undefined | null">
import type { InputAutocompleteType } from '~/types/input'

const props = defineProps<{
  id: string
  label?: string
  type?: HTMLInputElement['type']
  autocomplete?: InputAutocompleteType
  rules?: (RulesName<T> | RuleFunction<T>)[]
  required?: boolean
  small?: boolean
}>()

const modelValue = defineModel<T>({ default: () => null })

const isFocus = ref(false)
const displayError = ref(false)

const { errors, errorString } = useRules<T>(modelValue, computed(() => props.rules), computed(() => props.required))

const elevateLabel = computed(() => (modelValue.value || isFocus.value))

function onFocusOut() {
  isFocus.value = false
  displayError.value = true
}
</script>

<template>
  <div>
    <div class="relative z-0 group">
      <label
        :for="id"
        class="left-2.5 text-base absolute w-fit px-0 z-10 pointer-events-none h-fit inset-y-0 my-auto transition-all-300"
        :class="elevateLabel && 'bottom-full text-sm !left-1 -top-1 px-1'"
        :data-has-error="!!errors.length"
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
        class="w-full relative rounded bg-dark text-light ring-0 border-0 outline-0"
        :class="[
          small ? 'px-1 py-0' : 'px-2 py-0.5',
        ]"
        @focus="isFocus = true"
        @blur="onFocusOut"
      >
      <div class="absolute -inset-0.5 -z-1 rounded pointer-events-none flex" :class="!!errors.length && displayError ? 'border-red-5' : 'border-accent'">
        <div class="b-tlb-[1,color-inherit] rounded-l w-1.5" />
        <div class="b-b-[1,color-inherit]" :class="!elevateLabel && 'b-t-[1,color-inherit]'">
          <span class="op-0">{{ label }}</span>
        </div>
        <div class="b-trb-[1,color-inherit] rounded-r grow" />
      </div>
    </div>
    <div v-if="errorString && displayError" class="text-red-5 text-sm mt-1">
      {{ errorString }}
    </div>
  </div>
</template>
