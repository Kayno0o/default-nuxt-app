import type { RecursivePartial } from '~/types/types'

export interface Animation<T extends object> {
  startedAt: number
  // in ms
  duration: number
  frames: RecursivePartial<T>[]
  type: 'infinite' | 'edit' | 'loop'
  order: number
  // if set to true, allow to execute at the same time of other animations
  background: boolean
}

export type UseDrawReturnType = ReturnType<typeof useDraw>

export type UseDrawKeysAndArgs = {
  [K in keyof UseDrawReturnType]: Parameters<UseDrawReturnType[K]>[0];
}

export type ObjectAnimation<T extends keyof UseDrawKeysAndArgs> = Animation<UseDrawKeysAndArgs[T]>

export interface CanvasObject<T extends keyof UseDrawKeysAndArgs> {
  type: T
  props: UseDrawKeysAndArgs[T]
  animations: ObjectAnimation<T>[]
}

function getFrame<T extends keyof UseDrawKeysAndArgs>(animation: Animation<UseDrawKeysAndArgs[T]>): RecursivePartial<UseDrawKeysAndArgs[T]> | undefined {
  const sinceStart = Date.now() - animation.startedAt
  if (animation.type === 'edit' && sinceStart >= animation.duration)
    return undefined

  if (animation.type === 'loop') {
    const frameNb = Math.floor(map(sinceStart % animation.duration, 0, animation.duration, 0, animation.frames.length * 2 - 2))

    return animation.frames[frameNb >= animation.frames.length ? (animation.frames.length * 2) - frameNb - 2 : frameNb]
  }

  const frameNb = Math.floor(map(sinceStart % animation.duration, 0, animation.duration, 0, animation.frames.length))

  return animation.frames[frameNb]
}

export default function useCanvasObject(draw: ReturnType<typeof useDraw>) {
  const objects = ref(new Map<string, CanvasObject<keyof UseDrawKeysAndArgs>>())

  function drawObject<T extends keyof UseDrawKeysAndArgs>(obj: CanvasObject<T>) {
    let props: UseDrawKeysAndArgs[typeof obj.type] = obj.props
    if (obj.animations.length) {
      const toRemove: Array<keyof typeof obj.animations> = []

      obj.animations.sort((a, b) => a.order - b.order)

      obj.animations.forEach((a, i) => {
        const frame = getFrame(a)
        if (!frame) {
          toRemove.push(i)
          if (a.type === 'edit') {
            obj.props = mergeObjects(a.frames[a.frames.length - 1], obj.props)
            props = mergeObjects(a.frames[a.frames.length - 1], props)
          }
        }
        else {
          props = mergeObjects(frame, props)

          if (a.type === 'edit')
            obj.props = mergeObjects(frame, obj.props)
        }
      })

      // remove finished animations
      obj.animations = obj.animations.filter((a, i) => !toRemove.includes(i))
    }
    draw[obj.type](props as any)
  }

  function drawObjects() {
    objects.value.forEach((obj) => {
      drawObject(obj)
    })
  }

  function get<T extends keyof UseDrawKeysAndArgs>(name: string): CanvasObject<T> | undefined {
    return objects.value.get(name) as any
  }

  function add<T extends keyof UseDrawKeysAndArgs>(name: string, obj: CanvasObject<T>) {
    objects.value.set(name, obj)
  }

  function set<T extends keyof UseDrawKeysAndArgs>(name: string, newObj: CanvasObject<T>) {
    const obj = objects.value.get(name) as CanvasObject<T> | null
    if (!obj)
      return objects.value.set(name, newObj)

    objects.value.set(name, mergeObjects(newObj, obj))
  }

  function remove(name: string) {
    objects.value.delete(name)
  }

  function addAnimations<T extends keyof UseDrawKeysAndArgs>(name: string, ...animation: ObjectAnimation<T>[]): boolean {
    const obj = objects.value.get(name) as CanvasObject<T> | null
    if (!obj)
      return false

    obj.animations.push(...animation)
    return true
  }

  return {
    add,
    set,
    get,
    remove,
    drawObjects,
    addAnimations,
    objects,
  }
}
