import type { EndpointArgs } from '@kaynooo/utils'

export const ENDPOINTS = {
}

export interface EndpointType {
}

export type EndpointParams<T extends keyof typeof ENDPOINTS> = EndpointArgs<typeof ENDPOINTS, EndpointType, T>
