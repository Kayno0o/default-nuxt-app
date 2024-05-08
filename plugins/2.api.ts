import { joinURL } from 'ufo'
import type { NitroFetchRequest } from 'nitropack'
import type { FetchOptions } from 'ofetch'
import type { ResponseHandlerProps } from './1.fetchHandler'

type FetchMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'GET' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'TRACE'

export default defineNuxtPlugin(() => {
  const { $fetchHandler } = useNuxtApp()

  function api<IO = any>(
    url: NitroFetchRequest,
    options: FetchOptions & { method: FetchMethods },
    handler?: ResponseHandlerProps<IO>,
  ) {
    handler ??= {}
    handler.skipProxy ??= true

    if (handler.skipProxy) {
      url = String(unref(url))
      const { public: { apiUrl } } = useRuntimeConfig()
      if (!url.startsWith('http'))
        url = joinURL(apiUrl, url)
    }

    return $fetch<IO>(url, { ...$fetchHandler<IO, IO, '$fetch'>(handler), ...options })
  }

  return {
    provide: { api },
  }
})
