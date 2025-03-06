import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],
  modules: ["@pinia/nuxt"],


  

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}, // Updated line
      autoprefixer: {},
      "postcss-nesting": {},
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  build: {
    transpile: ['vuetify'],
  },

  devServer: {
    host: "192.168.200.220", // Change to "localhost" or specific IP
    port: 3000, // Change the port as needed
  },

  devtools: { enabled: true },
  compatibilityDate: "2025-03-04",
});