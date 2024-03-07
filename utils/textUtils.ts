export function randomString(length: number, charCode?: boolean) {
  const array = new Uint8Array(length)
  window.crypto.getRandomValues(array)
  return Array.from(array, byte => charCode ? String.fromCharCode(byte) : byte).join('')
}

export function normalizeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
}

interface SlugifyOptions {
  replace?: string
  lower?: boolean
  trim?: boolean
}

export function slugify(str: string, options?: SlugifyOptions): string {
  const replace = options?.replace ?? '-'

  let result = normalizeAccents(str)
    .replace(/[^A-Za-z0-9-]/g, replace)
    .replace(new RegExp(`/${replace}+/g`), replace)

  if (options?.lower ?? true)
    result = result.toLowerCase()

  if (options?.trim ?? true)
    result = result.trim()

  return result
}
