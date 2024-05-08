<script setup lang="ts" generic="T extends string | number | undefined | null">
import type { InputAccept, InputAutocompleteType, InputType } from '@kaynooo/js-utils'

const props = defineProps<{
  id: string
  label?: string
  type?: InputType
  autocomplete?: InputAutocompleteType
  rules?: (RulesName<T> | RuleFunction<T>)[]
  required?: boolean
  small?: boolean
  accept?: InputAccept
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
    <div class="group relative z-0">
      <label
        :for="id"
        class="pointer-events-none absolute inset-y-0 left-2.5 z-10 my-auto h-fit w-fit px-0 text-base transition-all-300"
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
        class="relative w-full border-0 bg-dark text-light outline-0 ring-0 rounded"
        :class="[
          small ? 'px-1 py-0' : 'px-2 py-0.5',
        ]"
        @focus="isFocus = true"
        @blur="onFocusOut"
      >
      <div class="pointer-events-none absolute flex rounded -inset-0.5 -z-1" :class="!!errors.length && displayError ? 'border-red-5' : 'border-accent'">
        <div class="w-1.5 b-tlb-[1,color-inherit] rounded-l" />
        <div class="b-b-[1,color-inherit]" :class="!elevateLabel && 'b-t-[1,color-inherit]'">
          <span class="op-0">{{ label }}</span>
        </div>
        <div class="grow b-trb-[1,color-inherit] rounded-r" />
      </div>
    </div>
    <div v-if="errorString && displayError" class="mt-1 text-sm text-red-5">
      {{ errorString }}
    </div>
  </div>
</template>
