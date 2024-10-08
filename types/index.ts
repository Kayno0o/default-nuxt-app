export * from './endpoints'
export * from './entity'
export * from './toast'

export type RecursivePartial<T> = {
  [P in keyof T]?:
  T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object | undefined ? RecursivePartial<T[P]> :
      T[P];
}

export type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]:
  TObj[TKey] extends any[] ? `${TKey}` :
    TObj[TKey] extends object
      ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
      : `${TKey}`;
}[keyof TObj & (string | number)]
