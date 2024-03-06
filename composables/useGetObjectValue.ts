import { type MaybeRef, unref } from 'vue'

export default function useGetObjectValue<U = any>(object: MaybeRef<U>, key: MaybeRef<keyof U | string>) {
  const obj: any = computed(() => unref(object))
  const keyRef = computed(() => unref(key))

  if (keyRef.value) {
    for (let i = 0, path = String(keyRef.value).split('.'), len = path.length; i < len; i++) {
      if (obj.value === null || obj.value === undefined || typeof obj.value !== 'object' || !(path[i] in obj.value))
        break

      obj.value = obj.value[path[i]]
    }
  }

  return obj
}
