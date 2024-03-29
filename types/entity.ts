import type { RoleType } from '~/utils/isGranted'

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
