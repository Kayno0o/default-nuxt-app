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

export type RoleType = 'ROLE_SUPER_ADMIN' | 'ROLE_ADMIN' | 'ROLE_EDITOR' | 'ROLE_USER' | 'ROLE_VIEWER'

export interface LoginResponse {
  token: string
  expire_at: string
}

export interface LoginUser extends User {
  email: string
  roles: Array<RoleType>
}

export interface Todolist extends Identifiable {
  checked: boolean
  content: string
}
