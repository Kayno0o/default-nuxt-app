import { joinURL, withQuery } from 'ufo'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  if (!event.context.params)
    throw createError({ statusCode: 404, statusMessage: 'Error in url not found' })

  return proxyRequest(event, withQuery(joinURL(config.apiUrl, event.context.params.path), getQuery(event)), {
    headers: {
      Accept: 'application/ld+json',
    },
  })
})
