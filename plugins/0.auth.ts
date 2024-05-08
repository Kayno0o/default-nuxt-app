import type { User } from '#auth-utils'

export const EXCLUDED_PATH = ['/login', '/password', '/api']

export default defineNuxtPlugin(() => {
  const route = computed(() => useRoute())
  const { loggedIn, user: sessionUser, clear: clearSession, fetch: fetchSession, session } = useUserSession()

  const user = computed<User | null>(() => loggedIn.value ? sessionUser.value : null)

  const isGuestPath = computed(() => EXCLUDED_PATH.some(path => route.value.path.startsWith(path)))

  async function clear() {
    if (isGuestPath.value)
      return

    await clearSession()
    await navigateTo({ name: 'login', query: { redirect: route.value.fullPath } })
  }

  async function refresh() {
    if (isGuestPath.value)
      return

    await useAPI('/api/me', {}, {
      onSuccess: async () => {
        await fetchSession()
      },
    })
  }

  async function login(credentials: { email: string, password: string }, loading?: Ref<boolean>) {
    const { $api } = useNuxtApp()

    await $api('/api/auth/login', {
      method: 'POST',
      body: {
        email: credentials.email,
        password: credentials.password,
      },
    }, {
      skipProxy: false,
      loading,
      toastErrorMessage: 'Identifiants incorrects',
      onSuccess() {
        let path = '/'
        if (typeof route.value.query.redirect === 'string')
          path = route.value.query.redirect

        navigateTo({ path }, { external: true })
      },
    })
  }

  return {
    provide: {
      auth: {
        loggedIn,
        user,
        session,
        isGuestPath,
        clear,
        refresh,
        login,
      },
    },
  }
})
