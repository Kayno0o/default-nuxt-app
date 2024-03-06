export default function getGenerateRandomString(length: number, charCode?: boolean): string {
  const array = new Uint8Array(length)
  window.crypto.getRandomValues(array)
  return Array.from(array, byte => charCode ? String.fromCharCode(byte) : byte).join('')
}
