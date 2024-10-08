import type { User } from '#auth-utils'
import type { RouteLocationNormalized } from 'vue-router'

export const EXCLUDED_PATH = ['/login', '/password', '/api']

function isGuestPath(route?: RouteLocationNormalized) {
  route ??= useRoute()
  return EXCLUDED_PATH.some(path => route.path.startsWith(path))
}

async function login(credentials: { email: string, password: string }, loading?: Ref<boolean>) {
  const { $api } = useNuxtApp()

  await $api('/api/auth/login', {
    body: {
      email: credentials.email.toLowerCase(),
      password: credentials.password,
    },
    defaultError: 'Identifiants incorrects',
    errorMessage: '{status}: {error}',
    loading,
    method: 'POST',
    onSuccess() {
      const route = useRoute()

      let path = '/'
      if (typeof route.query.redirect === 'string')
        path = route.query.redirect

      navigateTo({ path }, { external: true })
    },
  })
}

export default function () {
  const { clear: clearSession, fetch: fetchSession, loggedIn: sessionLoggedIn, session, user: sessionUser } = useUserSession()
  const loggedIn = computed<boolean>(() => sessionLoggedIn.value && !isExpired())
  const user = computed<User | null>(() => loggedIn.value ? sessionUser.value : null)

  function isExpired() {
    return !sessionLoggedIn.value || !sessionUser.value // || dayjs(sessionUser.value!.expireAt).isBefore(dayjs())
  }

  async function refresh() {
    if (isGuestPath())
      return

    await useAPI('/api/me')
    await fetchSession()
  }

  async function startImpersonation(uuid: string) {
    const { $api } = useNuxtApp()
    await $api('/api/auth/impersonation/start', {
      body: {
        impersonate: uuid,
      },
      method: 'POST',
    })

    await fetchSession()
    await navigateTo(null, { external: true })
  }

  async function endImpersonation() {
    const { $api } = useNuxtApp()
    await $api('/api/auth/impersonation/end', {
      method: 'POST',
    })

    await fetchSession()
    await navigateTo(null)
  }

  function clear() {
    if (isGuestPath())
      return
    clearSession()
    return navigateTo({ name: 'login', query: { redirect: encodeURI(useRoute().fullPath) } }, { external: true })
  }

  return {
    clear,
    isExpired,
    isGuestPath,
    loggedIn,
    login,
    refresh,
    session,
    user,
    startImpersonation,
    endImpersonation,
  }
}
