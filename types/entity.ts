import type { RoleType } from '~/utils/isGranted'

export interface Hydra<T> {
  '@context': string
  '@id': string
  '@type': string
  'hydra:member': T[]
  'hydra:totalItems': number
  'hydra:view': {
    '@id': string
    '@type': string
    'hydra:first': string
    'hydra:last': string
    'hydra:next': string | null
    'hydra:previous': string | null
  }
}

export interface HydraError {
  'error'?: string
  'hydra:description': string
}

export interface Identifiable {
  id: number
}

export interface Timestampable {
  created_at: Date
  updated_at: Date
}

export interface User extends Identifiable, Timestampable {
  username: string
}

export interface LoginResponse {
  token: string
  expire_at: string
}

export interface LoginUser extends User {
  email: string
  roles: RoleType[]
}
