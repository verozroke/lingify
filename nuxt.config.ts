export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],
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
  }
})
