import { joinURL } from 'ufo'
import type { LoginResponse, LoginUser } from '~/types/entity'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const credentials = await readBody(event)
  const tokenRes = await $fetch<LoginResponse>(joinURL(config.public.apiUrl, 'user', 'login'), {
    method: 'POST',
    body: credentials,
  })

  const userRes = await $fetch<LoginUser>(joinURL(config.public.apiUrl, 'user', 'me'), {
    method: 'GET',
    headers: {
      Authorization: tokenRes.token,
    },
  })

  await setSession(event, {
    user: userRes,
    token: tokenRes.token,
  })

  return {}
})
