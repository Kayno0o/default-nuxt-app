import { type MaybeRef, unref } from 'vue'

export default function useSha256(value: MaybeRef<string>) {
  const valueRef = computed(() => unref(value))

  return computed(async () => {
    const encoder = new TextEncoder()
    const data = encoder.encode(valueRef.value)
    return crypto.subtle.digest('SHA-256', data).then((buffer) => {
      const hashArray = Array.from(new Uint8Array(buffer))
      const hashBase64 = btoa(hashArray.map(byte => String.fromCharCode(byte)).join(''))
      return hashBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    })
  })
}
