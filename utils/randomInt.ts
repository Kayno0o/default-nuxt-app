export default function randomInt(minOrMax: number, max?: number) {
  if (max === undefined)
    return Math.floor(Math.random() * minOrMax)

  return Math.floor(Math.random() * (max - minOrMax)) + minOrMax
}
