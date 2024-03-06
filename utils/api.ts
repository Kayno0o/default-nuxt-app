import type { NitroFetchRequest } from 'nitropack'
import type { Ref } from 'vue'
import type { UseFetchOptions } from '#app'
import { useFetch } from '#app'
import type { KeysOf } from '#app/composables/asyncData'

export function useAPI<
  DataT = any,
  TransformT = DataT,
  ReqT extends NitroFetchRequest = NitroFetchRequest,
>(
  url: Ref<ReqT> | ReqT | (() => ReqT),
  options?: UseFetchOptions<DataT, TransformT, KeysOf<TransformT>, TransformT, any, 'get'>,
) {
  return useFetch<DataT, Error, any, 'get', DataT, TransformT, KeysOf<TransformT>, TransformT>(url, options)
}
