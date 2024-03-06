import type { MaybeRef } from 'vue'

export default function useIsEmpty(value: MaybeRef) {
  const valueRef = computed(() => unref(value))

  return computed(() => {
    if (valueRef.value === undefined || valueRef.value === null)
      return true

    if (typeof valueRef.value === 'number')
      return false

    if (Array.isArray(valueRef.value))
      return valueRef.value.length === 0

    return !valueRef.value
  })
}
