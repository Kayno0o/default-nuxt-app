import { joinURL, withQuery } from 'ufo'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  if (!event.context.params)
    throw createError({ statusCode: 404, statusMessage: 'Error in url not found' })

  const { accessToken } = await requireUserSession(event)

  return proxyRequest(event, withQuery(joinURL(config.public.apiUrl, event.context.params.path), getQuery(event)), {
    headers: {
      Accept: 'application/ld+json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
})
