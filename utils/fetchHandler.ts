import type { FetchContext, FetchResponse } from 'ofetch'
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

export default function fetchHandler<T = any, U = any>(
  props: ResponseHandlerProps<T>,
): UseFetchOptions<T, U, KeysOf<U>, U, any, 'get'> {
  const { addToast } = useToast()

  return {
    onRequest(_context: FetchContext): Promise<void> | void {
      if (props.loading)
        props.loading.value = true
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
