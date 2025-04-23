
export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],
  modules: ["@vite-pwa/nuxt","@pinia/nuxt"],

  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'icons/*.png'],
    manifest: {
      name: 'Smart Class',
      short_name: 'SClass',
      description: 'An educational PWA',
      theme_color: '#ffffff',
      background_color: '#9dbcd5',
      display: 'standalone',
      icons: [
        {
          src: '/icons/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: '/icons/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
  

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {},
      "postcss-nesting": {},
    },
  },

  build: {
    transpile: ["vuetify"],
  },

  devServer: {
    // host: "192.168.187.220",
    host: "0.0.0.0",
    port: 3000,
  },

  nitro: {
    devProxy: {
      "/api": {
        target: "https://smartclassbe-production.up.railway.app", // ✅ Add protocol
        // target: "http://192.168.187.220:8000", // ✅ Add protocol
        changeOrigin: true,
        prependPath: false,
      },
    },
  },

  runtimeConfig: {
    public: {
      apiBase: "https://smartclassbe-production.up.railway.app/api", // ✅ Use /api so it's clean and works with proxy
      apiBaseUrl: "https://smartclassbe-production.up.railway.app", // ✅ Use /api so it's clean and works with proxy
      // apiBase: "http://192.168.187.220:8000/api", // ✅ Use /api so it's clean and works with proxy
      // apiBaseUrl: "http://192.168.187.220:8000",
      googleClientId: process.env.GOOGLE_CLIENT_ID,
    },
  },

  devtools: { enabled: false },
  compatibilityDate: "2025-03-04",
});
