import { sha256 } from 'ohash'
import { type MaybeRef, unref } from 'vue'

export default function useSha256(value: MaybeRef<string>) {
  const valueRef = computed(() => unref(value))

  return computed(async () => sha256(valueRef.value))
}
