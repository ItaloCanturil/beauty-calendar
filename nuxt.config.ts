import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    vue: {
      customElement: true
    },
    vueJsx: {
      mergeProps: true
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    "@nuxtjs/supabase"
  ],
  primevue: {
    options: {
        unstyled: true
    },
    importPT: { from: path.resolve(__dirname, './presets/aura/') }
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
    redirectOptions: {
      login: '/admin',
      callback: '/',
      include: undefined,
      exclude: [],
      cookieRedirect: false,
    }
  }
})