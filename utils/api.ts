import type { NitroFetchRequest } from 'nitropack'
import type { Ref } from 'vue'
import type { FetchOptions } from 'ofetch'
import type { UseFetchOptions } from '#app'
import { useFetch } from '#app'
import type { KeysOf } from '#app/composables/asyncData'

type FetchMethods = 'post' | 'put' | 'delete' | 'patch' | 'get' | 'head' | 'connect' | 'options' | 'trace'

export function $api<
  DataT = any,
  ReqT extends NitroFetchRequest = NitroFetchRequest,
  M extends FetchMethods = FetchMethods,
>(
  url: ReqT,
  options: FetchOptions & { method: M | Uppercase<M> },
  handler?: Parameters<typeof fetchHandler<DataT, DataT, '$fetch'>>[0],
) {
  return $fetch<DataT>(url, { ...fetchHandler<DataT, DataT, '$fetch'>(handler || {}), ...options })
}

export function useAPI<
  DataT = any,
  TransformT = DataT,
  ReqT extends NitroFetchRequest = NitroFetchRequest,
>(
  url: Ref<ReqT> | ReqT | (() => ReqT),
  options?: UseFetchOptions<DataT, TransformT, KeysOf<TransformT>, TransformT, any, 'get'>,
  handler?: Parameters<typeof fetchHandler<DataT, TransformT>>[0],
) {
  return useFetch<DataT, Error, any, 'get', DataT, TransformT, KeysOf<TransformT>, TransformT>(url, { ...fetchHandler<DataT, TransformT>(handler || {}), ...options })
}
