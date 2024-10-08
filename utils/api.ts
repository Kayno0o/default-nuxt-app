import type { UseFetchOptions } from '#app'
import type { AsyncDataOptions, KeysOf } from '#app/composables/asyncData'
import type { EndpointParams, ENDPOINTS, Hydra } from '~/types'
import { toEndpoint } from './endpointUtils'
import fetchHandler, { type FetchHandlerProps } from './fetchHandler'

export type ApiUrl = string | EndpointParams<keyof typeof ENDPOINTS>
export type ApiError = Error & { statusCode: number }

type ApiOption<Input, Output> =
  UseFetchOptions<Input, Output, KeysOf<Output>, Output, any, 'get'>
  & AsyncDataOptions<Input, Output, KeysOf<Output>, Output>
  & FetchHandlerProps<Input>
  & { state?: boolean }

export function toFullUrl(url: string, params?: Record<string, any>, query?: Record<string, any>) {
  if (params) {
    url = url.replace(/\/:([^/]+)/g, (_, key) => {
      if (key in params) {
        return `/${params[key]}`
      }

      return `/:${key}`
    })
  }

  if (query)
    url += `?${new URLSearchParams(query).toString()}`

  return url
}

export function useAPI<Input, Output = Input>(
  url: MaybeRefOrGetter<ApiUrl>,
  options?: ApiOption<Input, Output>,
) {
  return useFetch<Input, ApiError, any, 'get', Input, Output, KeysOf<Output>, Output>(
    computed(() => toEndpoint(url)),
    {
      ...(options ?? {}),
      ...fetchHandler(),
    },
  )
}

export function useHydraAPI<Input>(
  url: MaybeRefOrGetter<ApiUrl>,
  options?: ApiOption<Hydra<Input>, Input[]>,
) {
  options ??= {}
  options.transform = response => response['hydra:member']
  options.default ??= () => []

  return useAPI<Hydra<Input>, Input[]>(url, options)
}
