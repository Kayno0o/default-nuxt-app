import type { FetchContext, FetchOptions, FetchResponse } from 'ofetch'
import type { Ref } from 'vue'
import type { UseFetchOptions } from '#app'
import type { KeysOf } from '#app/composables/asyncData'
import useToast from '~/composables/useToast'

interface ResponseHandlerProps<T> {
  errorMessage?: string
  successMessage?: string
  onSuccess?: (response: FetchResponse<T>) => void
  onError?: (error: Error | undefined, response: FetchResponse<T>) => void
  onFinally?: () => void
  loading?: Ref<boolean>
}

function getAuthToken() {
  return process.server ? useCookie('user_token').value : useUserSession().session.value?.token
}

export default function fetchHandler<T = any, U = T, FetchType extends 'useFetch' | '$fetch' = 'useFetch'>(
  props: ResponseHandlerProps<T>,
): FetchType extends 'useFetch' ? UseFetchOptions<T, U, KeysOf<U>, U, any, 'get'> : FetchOptions {
  const { addToast } = useToast()

  return {
    onRequest({ options }: FetchContext): Promise<void> | void {
      if (props.loading)
        props.loading.value = true

      if (!options.headers)
        options.headers = {}

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${getAuthToken()}`,
      }
    },
    onResponse({ response, error }: FetchContext & { response: FetchResponse<T> }): Promise<void> | void {
      if (props.loading)
        props.loading.value = false

      if (response.status >= 200 && response.status < 300) {
        if (props.successMessage)
          addToast(props.successMessage, 'success')

        if (props.onSuccess)
          props.onSuccess(response)
      }
      else {
        if (props.errorMessage)
          addToast(props.errorMessage, 'error')

        if (props.onError)
          props.onError(error, response)
      }

      if (props.onFinally)
        props.onFinally()
    },
  }
}
