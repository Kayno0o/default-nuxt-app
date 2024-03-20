import type { RecursivePartial } from '~/types/types'

export default function mergeObjects<T extends object>(obj1: T | RecursivePartial<T>, obj2: T | RecursivePartial<T>): T {
  const merged: T = JSON.parse(JSON.stringify(obj1)) as T

  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      // add from obj2 if undefined in merged object
      if (!Object.prototype.hasOwnProperty.call(merged, key))
        merged[key] = obj2[key] as any
      else if (typeof merged[key] === 'object' && typeof obj2[key] === 'object')
        merged[key] = mergeObjects(merged[key] as any, obj2[key])
    }
  }

  return merged
}
