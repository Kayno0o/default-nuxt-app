import { type MaybeRef, unref } from 'vue'
import { normalizeAccents } from '~/utils/textUtils'

export default function useNormalizeAccents(text: MaybeRef<string>) {
  const textRef = computed(() => unref(text))

  return computed(() => {
    return normalizeAccents(textRef.value)
  })
}
