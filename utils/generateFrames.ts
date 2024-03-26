import map from './map'
import type { RecursivePartial } from '~/types/types'

export default function generateFrames<T extends object>(start: RecursivePartial<T>, end: RecursivePartial<T>, framesNb: number): T[] {
  const frames: T[] = []

  mergeObjects(end, start)

  for (let i = 0; i <= framesNb; i++) {
    const interpolatedFrame: T = {} as T

    for (const key in end) {
      if (Object.prototype.hasOwnProperty.call(end, key)) {
        if (typeof end[key] === 'number' && typeof start[key] === 'number')
          interpolatedFrame[key] = map(i, 0, framesNb, start[key] as any, end[key] as any) as any
        else if (Array.isArray(end[key]) && Array.isArray(start[key]))
          interpolatedFrame[key] = (end[key] as Array<any>).map((_: any, index: number) => map(i, 0, framesNb, (start[key] as Array<any>)[index] as any, (end[key] as Array<any>)[index] as any)) as any
        else
          interpolatedFrame[key] = end[key] as any
      }
    }

    frames.push(interpolatedFrame)
  }

  return frames
}
