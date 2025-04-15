<template>
  <landing-navibar />
  <div class="flex flex-col  gap-20">
    <landing-hero />
    <landing-whyUs />
    <landing-ready />
    <landing-footer />

  </div>
</template>

<script setup>
// import Hero from '~/components/Hero.vue';
import { useAuthStore } from "~/stores/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.token) {
    authStore.token = localStorage.getItem("token"); // Restore token
    authStore.user =  JSON.parse(localStorage.getItem("user")); // Restore token
  }
  if (!authStore.token) {
    // navigateTo("/auth/login");
  }else{
    navigateTo("/dashboard");
  }
});
</script>

<style>
/* Add global styles here */
</style>
