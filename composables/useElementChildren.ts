import type { MaybeElementRef } from '@vueuse/core'

export default function useElementChildren(target: MaybeElementRef, options?: {
  filter?: (e: HTMLElement) => boolean
}) {
  const targetElement = computed(() => unrefElement(target))
  const elements = ref<HTMLElement[]>([])

  function setElements() {
    if (targetElement.value) {
      elements.value = Array.from(targetElement.value.children)
        .filter(e => e instanceof HTMLElement && options?.filter ? options.filter(e) : true) as HTMLElement[]
    }
    else {
      elements.value = []
    }
  }

  useMutationObserver(targetElement, setElements, { childList: true })
  watch(targetElement, setElements, { immediate: true })

  return elements
}
