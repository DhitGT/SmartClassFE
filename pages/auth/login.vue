<script setup>
import { useAuthStore } from '~/stores/auth';
import { ref } from 'vue';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const login = async () => {
    await authStore.login({ email: email.value, password: password.value });
    if (authStore.token) {
        navigateTo('/dashboard');
    }
};
</script>

<template>
    <div class="p-6 max-w-md mx-auto">
        <h2 class="text-xl font-bold">Login</h2>
        <input v-model="email" type="email" placeholder="Email" class="p-2 border rounded w-full mt-2" />
        <input v-model="password" type="password" placeholder="Password" class="p-2 border rounded w-full mt-2" />
        <button @click="login" class="mt-3 bg-blue-500 text-white p-2 rounded w-full">Login</button>
    </div>
</template>
