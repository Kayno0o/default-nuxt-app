import { declareGetEndpoint, declareIsEndpoint } from '@kaynooo/utils'
import { type EndpointParams, ENDPOINTS, type EndpointType } from '~/types'

export const getEndpoint = declareGetEndpoint<typeof ENDPOINTS, EndpointType>(ENDPOINTS)

export const isEndpoint = declareIsEndpoint<typeof ENDPOINTS, EndpointType>(ENDPOINTS)

export function toEndpoint<T>(value: MaybeRefOrGetter<T | EndpointParams<keyof typeof ENDPOINTS>>): T | string {
  const v = toValue(value)
  return isEndpoint(v) ? getEndpoint(v) : v
}
