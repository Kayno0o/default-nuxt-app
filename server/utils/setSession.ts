import type { H3Event } from 'h3'
import { defu } from 'defu'
import type { LoginUser } from '~/types/entity'

export async function setSession(event: H3Event, { user, token }: { user: LoginUser, token: string }): Promise<any> {
  // @ts-expect-error (from the lib doc)
  const session = await useSession(event, defu({ password: process.env.NUXT_SESSION_PASSWORD }, useRuntimeConfig(event).session))

  return await session.update({
    user,
    accessToken: token,
  })
}
