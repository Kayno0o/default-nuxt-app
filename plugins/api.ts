import type { FetchOptions, ResponseType } from 'ofetch'
import { getEndpoint, isEndpoint } from '~/utils/endpointUtils'
import fetchHandler, { type FetchHandlerProps } from '~/utils/fetchHandler'

type FetchMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'GET' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'TRACE'

export type ApiOptions<Input = any> = FetchOptions<ResponseType> & FetchHandlerProps<Input> & { method: FetchMethods }

export default defineNuxtPlugin(() => {
  const apiFetch = $fetch.create<any>({ ...fetchHandler<any, any, '$fetch'>() })

  function api<Input = any>(
    url: ApiUrl,
    options: ApiOptions<Input>,
  ) {
    return apiFetch<Input>(isEndpoint(url) ? getEndpoint(url) : url, options)
  }

  return {
    provide: {
      api,
      apiFetch,
    },
  }
})
