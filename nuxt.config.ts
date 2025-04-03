import tailwindcss from "@tailwindcss/vite";


export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],
  modules: ["@pinia/nuxt", "@vite-pwa/nuxt"],


  postcss: {
    plugins: {
      "@tailwindcss/postcss": {}, // Updated line
      autoprefixer: {},
      "postcss-nesting": {},
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    transpile: ["vuetify"],
  },

  devServer: {
    host: "192.168.5.220", // Change to "localhost" or specific IP
    port: 3000, // Change the port as needed
  },

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Smart Class",
      short_name: "SClass",
      description: "Class management app",
      theme_color: "#ffffff",
      icons: [
        {
          src: "/favicon.ico",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.example\.com\//,
          handler: "NetworkFirst",
          options: {
            cacheName: "api-cache",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 86400,
            },
          },
        },
      ],
    },
    devOptions: {
      enabled: true, // Enables PWA in development mode
      type: "module",
    },
  },

  nitro: {
    devProxy: {
      '/api': {
        target: 'http://192.168.5.220:8000',
        changeOrigin: true,
        prependPath: false,
      }
    }
  },

  runtimeConfig: {
    public: {
      apiBase: "http://192.168.5.220:8000/api",
      apiBaseUrl: "http://192.168.5.220:8000",
    },
  },

  devtools: { enabled: false },
  compatibilityDate: "2025-03-04",
});