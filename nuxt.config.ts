export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/core/assets/fontstyle.css', '~/core/assets/main.css'],
  modules: [
    'vuetify-nuxt-module',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
  ],
  alias: {
    "@": "/<rootDir>",
  },
  app: {
    head: {
      title: 'Lingify',
      meta: [
        {
          name: "description",
          content: "Learn languages."
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }

  },
  ssr: false,
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
      directives: true,
      icons: {
        defaultSet: 'mdi'
      }
    }
  },
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default 
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
