import type { ClassNameValue } from 'tailwind-merge'

export interface TWProps<T extends string> {
  class?: ClassNameValue
  classname?: {
    [key in T]?: ClassNameValue
  }
}
