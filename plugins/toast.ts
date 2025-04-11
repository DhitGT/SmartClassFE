import { defineNuxtPlugin } from '#app';
import Toast from 'vue-toastification';
import type { PluginOptions } from 'vue-toastification/dist/types'; // ✅ Use this path for type safety
import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: 'button',
    icon: true,
    rtl: false,
  };

  nuxtApp.vueApp.use(Toast, options);
});
