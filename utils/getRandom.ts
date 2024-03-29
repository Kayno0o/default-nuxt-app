import { randomInt } from '~/utils/numberUtils'

export default function getRandom<T>(values: T[]): T {
  const index = randomInt(values.length)
  return values[index]
}
