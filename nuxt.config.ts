// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   // 使用するscssファイルを指定
  css: ["@/assets/main.scss"],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  nitro: {
    firebase: {
      gen: 2
    }
  },
  modules: ["@vuestic/nuxt"],
  vuestic: {
    config: {
      colors: {
        variables: {
          // Default colors
          primary: "#23e066",
          secondary: "#002c85",
          success: "#40e583",
          info: "#2c82e0",
          danger: "#e34b4a",
          warning: "#ffc200",
          gray: "#babfc2",
          dark: "#34495e",

          // Custom colors
          yourCustomColor: "#d0f55d",
        },
      },
    },
    css: ["typography", "reset"],
  },
})