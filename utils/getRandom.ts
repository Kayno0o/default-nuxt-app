import randomInt from '~/utils/randomInt'

export default function getRandom<T>(values: Array<T>): T {
  const index = randomInt(values.length)
  return values[index]
}
