export function randomInt(minOrMax: number, max?: number) {
  const random = (crypto.getRandomValues(new Uint8Array(1)) as unknown as number) / 255

  const [start, range] = max === undefined ? [0, minOrMax] : [minOrMax, max - minOrMax]
  return Math.floor(random * range) + start
}
