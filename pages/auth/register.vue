<script setup>
import { useAuthStore } from '~/stores/auth';
import { ref } from 'vue';

const authStore = useAuthStore();
const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

const register = async () => {
    await authStore.register({ name: name.value, email: email.value, password: password.value, password_confirmation: password_confirmation.value });
    if (authStore.token) {
        navigateTo('/dashboard');
    }
};
</script>

<template>
    <div class="p-6 max-w-md mx-auto">
        <h2 class="text-xl font-bold">Register</h2>
        <input v-model="name" type="text" placeholder="Name" class="p-2 border rounded w-full mt-2" />
        <input v-model="email" type="email" placeholder="Email" class="p-2 border rounded w-full mt-2" />
        <input v-model="password" type="password" placeholder="Password" class="p-2 border rounded w-full mt-2" />
        <input v-model="password_confirmation" type="password" placeholder="Confirm Password" class="p-2 border rounded w-full mt-2" />
        <button @click="register" class="mt-3 bg-green-500 text-white p-2 rounded w-full">Register</button>
    </div>
</template>
    