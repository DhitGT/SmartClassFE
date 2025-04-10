<template>
  <div class="">
    <section class="bg-blue-600 px-4 md:px-0 text-white text-center py-12">
      <h2 class="text-xl md:text-3xl font-bold mb-4">
        Ready to Transform Your Manage Class System?
      </h2>
      <p class="mb-6">
        Change the system using SmartClass
      </p>
      <div class="flex justify-center space-x-4">
        <nuxt-link to="/auth/register" class="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full shadow">
          Start Now
        </nuxt-link>
        <nuxt-link to="/auth/login" class="border border-white text-white font-semibold py-2 px-4 rounded-full hover:bg-white hover:text-blue-600 transition">
          Sign In
        </nuxt-link>
      </div>
    </section>
  </div>
  </template>
  
  <script setup>
  // No additional script needed for this static component
  </script>
  
  <style scoped>
  /* You can add any specific styles here if necessary */
  </style>