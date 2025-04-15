<script setup>
import { useAuthStore } from "~/stores/auth";
import { ref, onMounted } from "vue";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowPathIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/outline";

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const googleLoading = ref(false);

onMounted(() => {
  const clientId = useRuntimeConfig().public.googleClientId;
  console.log("Google Client ID:", clientId);

  window.google.accounts.id.initialize({
    client_id: useRuntimeConfig().public.googleClientId,
    callback: handleGoogleSignIn
  })

  window.google.accounts.id.renderButton(
    document.getElementById("google-login-button"),
    { theme: "outline", size: "large",text:'continue_with' }
  )
})

const login = async () => {
  isLoading.value = true;
  await authStore.login({ email: email.value, password: password.value });
  isLoading.value = false;

  if (authStore.token) {
    navigateTo("/dashboard/");
  }
};

const handleGoogleSignIn = async (response) => {
  try {
    const credential = response.credential;
    console.log("Google credential:", credential);

    await authStore.handleGoogleCallback({ token: credential });

    if (authStore.token) {
      navigateTo("/dashboard");
    }
  } catch (error) {
    console.error("Google Sign-In failed:", error);
    authStore.message = "Google Sign-In failed. Please try again.";
  } finally {
    googleLoading.value = false;
  }
};

// const loginWithGoogle = async () => {
//   googleLoading.value = true;

//   try {
//     if (!window.google || !window.google.accounts) {
//       await new Promise((resolve, reject) => {
//         const script = document.createElement("script");
//         script.src = "https://accounts.google.com/gsi/client";
//         script.async = true;
//         script.defer = true;
//         script.onload = resolve;
//         script.onerror = reject;
//         document.head.appendChild(script);
//       });
//     }

//     const clientId = useRuntimeConfig().public.googleClientId;
//     console.log("Google Client ID:", clientId);

//     window.google.accounts.id.initialize({
//       client_id: clientId,
//       callback: handleGoogleSignIn,
//     });

//     window.google.accounts.id.prompt((notification) => {
//       if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
//         authStore.message = "Google Sign-In was blocked or skipped.";
//         googleLoading.value = false;
//       }
//     });
//   } catch (error) {
//     console.error("Failed to load Google Sign-In:", error);
//     authStore.message = "Failed to initialize Google Sign-In.";
//     googleLoading.value = false;
//   }
// };
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="bg-white rounded-xl shadow-sm w-full max-w-md overflow-hidden">
      <div class="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-center">
        <div class="flex justify-center items-center space-x-3">
          <div class="bg-white p-2 rounded-lg shadow-sm">
            <img src="/icons/smartclass.jpeg" class="w-8 h-8" alt="logo" />
          </div>
          <h1 class="text-2xl font-bold text-white">Smart Class</h1>
        </div>
        <p class="mt-2 text-blue-100">Sign in to your account</p>
      </div>

      <div class="p-8">
        <!-- Google Sign-In -->
        <!-- <button
          :disabled="googleLoading"
          @click="loginWithGoogle"
          class="w-full flex justify-center items-center gap-3 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          <img src="/icons/googleIcons.png" class="w-5 h-5" />
          <span>{{
            googleLoading ? "Signing in..." : "Continue with Google"
          }}</span>
        </button>  -->
        <div :disabled="googleLoading" id="google-login-button">
          <ArrowPathIcon v-if="googleLoading" class="w-5 h-5 animate-spin" />

        </div>

        <div class="flex items-center my-6">
          <div class="flex-grow border-t border-gray-200"></div>
          <span class="mx-4 text-gray-400 text-sm">OR</span>
          <div class="flex-grow border-t border-gray-200"></div>
        </div>

        <!-- Email/Password Sign-In -->
        <div class="space-y-5">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input
                v-model="email"
                type="email"
                placeholder="you@example.com"
                class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input
                v-model="password"
                type="password"
                placeholder="••••••••"
                class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            @click="login"
            :disabled="isLoading"
            class="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <ArrowPathIcon v-if="isLoading" class="w-5 h-5 animate-spin" />
            <span>{{ isLoading ? "Signing in..." : "Sign in" }}</span>
          </button>
        </div>

        <div class="mt-6 text-center text-sm">
          <p class="text-gray-600">
            Don't have an account?
            <router-link
              to="/auth/register"
              class="font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center"
            >
              Register here <ArrowRightIcon class="w-4 h-4 ml-1" />
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
