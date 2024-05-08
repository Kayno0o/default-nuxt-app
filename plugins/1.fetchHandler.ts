import type { FetchContext, FetchOptions, FetchResponse } from 'ofetch'
import type { UseFetchOptions } from '#app'
import type { KeysOf } from '#app/composables/asyncData'

interface ResponseError {
  error: string
}

export interface ResponseHandlerProps<T, U extends ResponseError = ResponseError> {
  toastErrorMessage?: string
  toastSuccessMessage?: string
  defaultResponseError?: string
  onSuccess?: (response: FetchResponse<T>) => Promise<void> | void
  onError?: (error: Error, response: FetchResponse<U>) => Promise<void> | void
  onFinally?: () => Promise<void> | void
  resolve?: () => void
  reject?: (e: Error) => void
  loading?: Ref<boolean>
  skipProxy?: boolean
}

type FetchType = 'useFetch' | '$fetch'
/** depending on the fetch type, return the correct options */
type FetchHandlerResponse<T, U, F extends FetchType> = F extends 'useFetch' ? UseFetchOptions<T, U, KeysOf<U>, U, any, 'get'> : FetchOptions

export default defineNuxtPlugin(() => {
  const { addToast } = useToast()
  const { $auth: { clear, session } } = useNuxtApp()
  const token = useCookie('user_token')

  function getAuthToken() {
    return process.server ? token.value : session.value?.accessToken
  }

  function fetchHandler<T = any, U = T, F extends FetchType = 'useFetch'>(props: ResponseHandlerProps<T>): FetchHandlerResponse<T, U, F> {
    return {
      onRequest({ options }: FetchContext): Promise<void> | void {
        if (props.loading)
          props.loading.value = true

        if (options.method === 'DELETE' || props.skipProxy) {
          options.headers ||= {}
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${getAuthToken()}`,
          }
        }
      },
      async onResponse({ response, error }: FetchContext & { response: FetchResponse<T> }): Promise<void> {
        try {
          if (response.status >= 200 && response.status < 300) {
            if (props.toastSuccessMessage)
              addToast(props.toastSuccessMessage, 'success')

            if (props.onSuccess)
              await props.onSuccess(response)

            if (props.resolve)
              props.resolve()
          }
          else {
            if (response.status === 401) {
              await clear()
              addToast('Votre session a expiré', 'warning')
              return
            }

            // TODO i18n
            if (!error)
              error = new Error(response._data?.error ?? props.defaultResponseError ?? 'Erreur inconnue')

            if (props.toastErrorMessage)
              addToast(props.toastErrorMessage.replaceAll('{status}', String(response.status)).replaceAll('{error}', error.message), 'error')

            if (props.onError)
              await props.onError(error, response)

            if (props.reject)
              props.reject(error)
          }
        }
        catch (e) { }
        finally {
          if (props.onFinally)
            await props.onFinally()

          if (props.loading)
            props.loading.value = false
        }
      },
    }
  }

  return {
    provide: {
      fetchHandler,
    },
  }
})
