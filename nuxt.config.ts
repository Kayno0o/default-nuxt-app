export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    'nuxt-auth-utils',
  ],

  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/main.css',
  ],

  runtimeConfig: {
    public: {
      baseApiUrl: process.env.BASE_API_URL,
      apiUrl: process.env.API_URL,
    },
  },

  app: {
    head: {
      title: 'Kaynooo',
      htmlAttrs: { dir: 'ltr', lang: 'en' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Anta&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap' },
      ],
    },
  },

  compatibilityDate: '2024-10-08',
})
