import type { UseFetchOptions } from '#app'
import type { KeysOf } from '#app/composables/asyncData'
import type { FetchContext, FetchOptions, FetchResponse } from 'ofetch'
import type { WritableComputedRef } from 'vue'
import useToasts from '~/composables/useToasts'
import type { HydraError, ToastType } from '~/types'

export interface FetchHandlerProps<T, U extends HydraError = HydraError> {
  clearEmptyQuery?: boolean
  defaultError?: string
  errorMessage?: string
  loading?: Ref<boolean> | WritableComputedRef<boolean>
  onError?: (error: Error, response?: FetchResponse<U>) => Promise<any> | any
  onFinally?: () => Promise<any> | any
  onSuccess?: (response: FetchResponse<T>) => Promise<any> | any
  reject?: (error: Error) => void
  resolve?: () => void
  successMessage?: string
}

type FetchType = 'useFetch' | '$fetch'
/** depending on the fetch type, return the correct options */
type FetchHandlerResponse<T, U, F extends FetchType> = (F extends 'useFetch' ? UseFetchOptions<T, U, KeysOf<U>, U, any, 'get'> : FetchOptions)

export function addHeader(headers: HeadersInit, key: string, value: string): HeadersInit {
  if (Array.isArray(headers)) {
    headers.push([key, value])
    return headers
  }

  if (headers instanceof Headers) {
    headers.set(key, value)
    return headers
  }

  headers[key] = value
  return headers
}

export default function<Input = any, Output = Input, Fetch extends FetchType = 'useFetch'>(): FetchHandlerResponse<Input, Output, Fetch> {
  const auth = useAuth()
  const toasts = useToasts()
  const { session } = useUserSession()

  function addToast(message: string, type: ToastType) {
    if (import.meta.server)
      return

    toasts.addToast(message, type)
  }

  return {
    onRequest({ options }: FetchContext & { options: FetchHandlerProps<any> }): Promise<void> | void {
      if (session.value?.accessToken) {
        options.headers ||= {} as any
        addHeader(options.headers, 'Authorization', `Bearer ${session.value?.accessToken}`)
      }

      if (options.loading !== undefined)
        options.loading.value = true

      if (options.clearEmptyQuery && options.query) {
        for (const key in options.query) {
          if (!options.query)
            continue

          let value = options.query[key]
          if (typeof value === 'function')
            value = value()

          if (value === undefined || value === null || value === '')
            delete options.query[key]
        }
      }
    },
    async onResponse({ error, options, response }: FetchContext & { options: FetchHandlerProps<any>, response: FetchResponse<Input> }): Promise<void> {
      function errorString(errorMessage: string, error: Error, response?: FetchResponse<any>) {
        return errorMessage
          .replaceAll('{status}', String(response?.status ?? 500))
          .replaceAll('{error}', error.message)
      }

      try {
        if (response.status >= 200 && response.status < 300) {
          if (options.successMessage)
            addToast(options.successMessage, 'success')

          if (options.onSuccess)
            await options.onSuccess(response)

          if (options.resolve)
            options.resolve()

          return
        }

        error ??= process.env.NODE_ENV === 'development'
          ? new Error(response?._data?.error ?? response?._data?.detail ?? options.defaultError ?? (response?._data?.['hydra:description'] ? `DEV:${response?._data?.['hydra:description']}` : 'Une erreur est survenue'))
          : new Error(response?._data?.error ?? response?._data?.detail ?? options.defaultError ?? 'Une erreur est survenue')

        if (response?.status === 401) {
          if (!auth.isGuestPath()) {
            auth.clear()
            return
          }
        }

        if (options.errorMessage)
          addToast(errorString(options.errorMessage, error, response), 'error')

        if (options.onError)
          await options.onError(error, response)

        if (options.reject)
          options.reject(error)
      }
      finally {
        if (options.onFinally)
          await options.onFinally()

        if (options.loading !== undefined)
          options.loading.value = false
      }
    },
  }
}
