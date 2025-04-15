import { defineNuxtPlugin } from '#app';
import Toast, { useToast } from 'vue-toastification';
import type { PluginOptions } from 'vue-toastification/dist/types';
import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    timeout: 3000,
    hideProgressBar: true,
    closeButton: 'button',
    pauseOnHover: true,
  };

  nuxtApp.vueApp.use(Toast, options);

  // ✅ Inject the `useToast` function for global access
  nuxtApp.provide('toast', useToast());
});
