// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  css: ['material-symbols',"~/assets/css/main.css","~/assets/css/tailwind.css",'aos/dist/aos.css' ],
  devtools: { enabled: false },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@vite-pwa/nuxt","@pinia/nuxt"
  ],
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {},
      "postcss-nesting": {},
    },
  },
  devServer: {
    // host: "192.168.187.220",
    host: "192.168.73.73",
    port: 3000,
  },
});
