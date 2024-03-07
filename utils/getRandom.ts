import { randomInt } from '~/utils/numberUtils'

export default function getRandom<T>(values: Array<T>): T {
  const index = randomInt(values.length)
  return values[index]
}
