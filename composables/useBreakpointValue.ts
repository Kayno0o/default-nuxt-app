import { breakpointsTailwind, useEventListener } from '@vueuse/core'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'

// BreakPoint from tailwind
export type BPName = keyof typeof breakpointsTailwind
export type BPValueDict<T> = { [key in BPName]?: T }

export default function useBreakpointValue<
  T,
  U extends BPValueDict<T> = BPValueDict<T>,
>(values: MaybeRef<U>, defaultValue?: MaybeRef<T>) {
  const breakpointNames: BPName[] = ['sm', 'md', 'lg', 'xl', '2xl']

  const valuesRef = computed<BPValueDict<T>>(() => unref(values))
  const value = ref<T>()

  const defaultRef = computed(() => unref(defaultValue))

  function setValue() {
    if (!valuesRef.value || typeof valuesRef.value !== 'object')
      return value.value = valuesRef.value

    value.value = undefined

    breakpointNames
      .filter(b => b in (valuesRef.value as BPValueDict<T>))
      .forEach((b: BPName) => {
        if (window.innerWidth > breakpointsTailwind[b])
          value.value = (valuesRef.value as BPValueDict<T>)[b]
      })
  }

  useEventListener('resize', () => {
    setValue()
  })

  onMounted(setValue)

  return computed(() => !value.value ? defaultRef.value : value.value)
}
