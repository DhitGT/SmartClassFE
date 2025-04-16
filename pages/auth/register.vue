<script setup>
import { useAuthStore } from "~/stores/auth";
import { ref } from "vue";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ArrowPathIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/outline";

const authStore = useAuthStore();
const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const isLoading = ref(false);
const googleLoading = ref(false);

const register = async () => {
  isLoading.value = true;
  await authStore.register({
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
  });
  isLoading.value = false;

  if (authStore.token) {
    navigateTo("/dashboard");
  }
};

// const loginWithGoogle = async () => {
//   googleLoading.value = true;
  
//   try {
//     // Load Google API client library
//     await new Promise((resolve, reject) => {
//       const script = document.createElement('script');
//       script.src = 'https://accounts.google.com/gsi/client';
//       script.async = true;
//       script.defer = true;
//       script.onload = resolve;
//       script.onerror = reject;
//       document.head.appendChild(script);
//     });


//     console.log("google client id  : ",useRuntimeConfig().public.googleClientId )

//     // Initialize Google Auth
//     window.google.accounts.id.initialize({
//       client_id: useRuntimeConfig().public.googleClientId, // Make sure to set this in your .env
//       callback: handleGoogleSignIn,
//     });

//     // Prompt Google Sign In
//     window.google.accounts.id.prompt((notification) => {
//       if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
//         // Try fallback method if popup blocked
//         window.google.accounts.id.renderButton(
//           document.getElementById('googleSignInButton'),
//           { theme: 'outline', size: 'large' }
//         );
//       }
//     });
//   } catch (error) {
//     console.error('Google Sign-In failed:', error);
//     authStore.message = 'Failed to initialize Google Sign-In';
//     googleLoading.value = false;
//   }
// };

// const handleGoogleSignIn = async (response) => {
//   try {
//     // Send the credential to your Laravel backend
//     console.log("callback response 0: ",response)
//     console.log("callback response : ",response.credential)
//     await authStore.handleGoogleCallback({ token: response.credential });
//     // const { data, error } = await $fetch('/api/auth/google', {
//     //   method: 'POST',
//     //   body: JSON.stringify({ token: response.credential } ),
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //   },
//     // });

//     if (error) {
//       throw new Error(error);
//     }

//     // Handle successful authentication
//     // authStore.setToken(data.token);
//     // authStore.setUser(data.user);
//     navigateTo('/dashboard');
    
//   } catch (error) {
//     console.error('Google authentication failed:', error);
//     authStore.message = 'Google authentication failed';
//   } finally {
//     googleLoading.value = false;
//   }
// };
</script>

<template>
  <div class="absolute inset-0 h-screen bg-grid bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 opacity-90 z-0"></div>
  <div class="relative z-10  mx-auto container">
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br  p-4">
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden border border-gray-100">
        <!-- Header with Logo -->
        <div class="bg-gradient-to-r from-green-600 to-green-500 p-6 text-center">
          <div class="flex justify-center items-center space-x-3">
            <div class="bg-white p-2 rounded-lg shadow-sm">
              <img src="/icons/smartclass.jpeg" class="w-8 h-8" alt="">
            </div>
            <h1 class="text-2xl font-bold text-white">Create Account</h1>
          </div>
          <p class="mt-2 text-green-100">Join our community today</p>
        </div>
  
        <div class="p-8">
          <!-- Error Message -->
          <div
            v-if="authStore.message"
            class="p-3 rounded-lg mb-6 text-sm text-center bg-red-50 text-red-700 border border-red-100"
          >
            {{ authStore.message }}
          </div>
  
          <!-- Google Login Button -->
          <!-- <button
            @click="loginWithGoogle"
            :disabled="googleLoading"
            class="w-full flex justify-center items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition mb-6"
          >
            <img src="/icons/googleIcons.png" class="w-5 h-5" />
            <span>{{ googleLoading ? "Signing in..." : "Continue with Google" }}</span>
          </button>
           -->
          <!-- Fallback button (hidden by default) -->
          <!-- <div id="googleSignInButton" class="hidden"></div>
  
          <div class="flex items-center my-6">
            <div class="flex-grow border-t border-gray-200"></div>
            <span class="mx-4 text-gray-400 text-sm">OR</span>
            <div class="flex-grow border-t border-gray-200"></div>
          </div> -->
  
          <!-- Registration Form -->
          <div class="space-y-5">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  v-model="name"
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                />
              </div>
            </div>
  
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  v-model="email"
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
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
                  id="password"
                  placeholder="••••••••"
                  class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                />
              </div>
            </div>
  
            <div>
              <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  v-model="password_confirmation"
                  type="password"
                  id="password_confirmation"
                  placeholder="••••••••"
                  class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                />
              </div>
            </div>
  
            <button
              @click="register"
              :disabled="isLoading"
              class="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold hover:from-green-700 hover:to-green-600 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              <ArrowPathIcon v-if="isLoading" class="w-5 h-5 animate-spin" />
              <span>{{ isLoading ? "Creating account..." : "Register Now" }}</span>
            </button>
          </div>
  
          <div class="mt-6 text-center text-sm">
            <p class="text-gray-600">
              Already have an account?
              <NuxtLink
                to="/auth/login"
                class="font-medium text-green-600 hover:text-green-500 flex items-center justify-center"
              >
                Sign in <ArrowRightIcon class="w-4 h-4 ml-1" />
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bg-grid {
  background-color: rgb(247, 247, 247);
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.045) 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>