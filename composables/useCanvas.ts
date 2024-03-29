import type { MaybeElementRef } from '@vueuse/core'
import useDraw from './useDraw'

type DrawLoop = (secPercent: number, width: number, height: number) => void
type OnKeyDown = (key: string, isNew: boolean) => void
type OnKeyUp = (key: string) => void

export default function useCanvas(e: MaybeElementRef<HTMLCanvasElement | undefined>) {
  const c = computed(() => unrefElement(e))
  const ctx = computed(() => c.value?.getContext('2d') || null)
  const keys = ref(new Set<string>())

  const loop = ref<DrawLoop>()
  const onKeyDown = ref<OnKeyDown>()
  const onKeyUp = ref<OnKeyUp>()

  useEventListener(document, 'keydown', (e) => {
    const isNew = !keys.value.has(e.key)
    keys.value.add(e.key)
    if (onKeyDown.value)
      onKeyDown.value(e.key, isNew)
  })
  useEventListener(document, 'keyup', (e) => {
    keys.value.delete(e.key)
    if (onKeyUp.value)
      onKeyUp.value(e.key)
  })

  let lastLoopTime = 0

  const animationId = ref<number>()

  function drawLoop() {
    const now = Date.now()
    const secondPercent = (now - lastLoopTime) / 1000
    lastLoopTime = now

    if (loop.value)
      loop.value(secondPercent, c.value?.width || 0, c.value?.height || 0)

    animationId.value = requestAnimationFrame(drawLoop)
  }

  onMounted(drawLoop)

  onBeforeUnmount(() => {
    if (animationId.value !== undefined)
      cancelAnimationFrame(animationId.value)
  })

  function setLoop(fn: DrawLoop) {
    loop.value = fn
  }

  function setOnKeyDown(fn: OnKeyDown) {
    onKeyDown.value = fn
  }

  function setOnKeyUp(fn: OnKeyUp) {
    onKeyUp.value = fn
  }

  return {
    draw: useDraw(ctx),
    loop: setLoop,
    keys,
    onKeyDown: setOnKeyDown,
    onKeyUp: setOnKeyUp,
  }
}
