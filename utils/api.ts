import type { NitroFetchRequest } from 'nitropack'
import type { UseFetchOptions } from '#app'
import type { KeysOf } from '#app/composables/asyncData'
import type { ResponseHandlerProps } from '~/plugins/1.api'

export function useAPI<
  Input = any,
  Output = Input,
  ReqT extends NitroFetchRequest = NitroFetchRequest,
>(
  url: MaybeRefOrGetter<ReqT>,
  options?: UseFetchOptions<Input, Output, KeysOf<Output>, Output, any, 'get'>,
  handler?: ResponseHandlerProps<Input>,
) {
  const { $fetchHandler } = useNuxtApp()
  return useFetch<Input, Error, any, 'get', Input, Output, KeysOf<Output>, Output>(url, { ...$fetchHandler<Input, Output>(handler || {}), ...options })
}
