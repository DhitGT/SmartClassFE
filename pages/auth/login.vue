<script setup>
import { useAuthStore } from "~/stores/auth";
import { ref } from "vue";

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const isLoading = ref(false);

const login = async () => {
  isLoading.value = true;
  await authStore.login({ email: email.value, password: password.value });
  isLoading.value = false;

  if (authStore.token) {
    navigateTo("/dashboard");
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div
      class="bg-white mx-4 sm:mx-0 shadow-2xl rounded-2xl p-8 w-full max-w-md transition duration-300"
    >
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Login
      </h2>
      <div class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          @click="login"
          :disabled="isLoading"
          class="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <svg
            v-if="isLoading"
            class="w-5 h-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 12a8 8 0 018-8v0m0 0a8 8 0 018 8m-8 8a8 8 0 01-8-8"
            />
          </svg>
          <span>{{ isLoading ? "Logging in..." : "Login" }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
