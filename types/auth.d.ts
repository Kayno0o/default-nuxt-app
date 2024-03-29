import type { LoginUser } from './entity'

declare module '#auth-utils' {
  interface User extends LoginUser {
  }

  interface UserSession {
    accessToken: string
  }
}

export { }
