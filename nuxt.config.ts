export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/core/assets/fontstyle.css', '~/core/assets/main.css'],
  modules: [
    'vuetify-nuxt-module',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],
  alias: {
    "@": "/<rootDir>",
  },
  app: {
    head: {
      title: 'Verozroke\'s blog',
      meta: [
        {
          name: "description",
          content: "I created this simple blog to practice in tailwind css and nuxt 3"
        },

      ]
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
