import Aura from '@primevue/themes/aura';

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
    '@pinia/nuxt',
    "@nuxtjs/supabase",
    '@vueuse/nuxt',
    '@primevue/nuxt-module'
  ],
  primevue: {
    importTheme: { from: './assets/css/preset.ts'},
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
    redirect: false
  }
})