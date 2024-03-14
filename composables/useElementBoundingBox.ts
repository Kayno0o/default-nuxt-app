import type { MaybeElementRef } from '@vueuse/core'
import { useEventListener } from '@vueuse/core'
import getElementBoundingBox from '~/utils/getElementBoundingBox'

export default function useElementBoundingBox(elementRef: MaybeElementRef) {
  const element = computed(() => unrefElement(elementRef))
  const rect = ref(getElementBoundingBox(element.value))

  useEventListener('resize', () => {
    rect.value = getElementBoundingBox(element.value)
  })

  watch(element, () => {
    rect.value = getElementBoundingBox(element.value)
  })

  return rect
}
