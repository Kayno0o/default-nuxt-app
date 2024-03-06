import { type MaybeRef, unref } from 'vue'

export default function useNormalize(text: MaybeRef<string>) {
  const textRef = computed(() => unref(text))

  return computed(() => {
    return textRef.value.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
  })
}
