<template>
  <nav class="bg-white shadow-md fixed w-full z-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <h1 class="text-2xl font-bold text-blue-600">SmartClass</h1>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-6">
          <a href="#features" class="text-gray-600 hover:text-blue-600">Features</a>
          <a href="#solutions" class="text-gray-600 hover:text-blue-600">Solutions</a>
          <a href="#pricing" class="text-gray-600 hover:text-blue-600">Pricing</a>
          <a href="#about" class="text-gray-600 hover:text-blue-600">About</a>
          <a href="#sign-in" class="text-gray-600 hover:text-blue-600">Sign In</a>
          <a href="#sign-up" class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">Sign Up</a>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMenu" class="md:hidden text-gray-600 focus:outline-none">
          <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden absolute top-16 left-0 w-full bg-white shadow-md z-40">
        <div class="flex flex-col items-center space-y-4 py-4">
          <a href="#features" class="text-gray-600 hover:text-blue-600" @click="toggleMenu">Features</a>
          <a href="#solutions" class="text-gray-600 hover:text-blue-600" @click="toggleMenu">Solutions</a>
          <a href="#pricing" class="text-gray-600 hover:text-blue-600" @click="toggleMenu">Pricing</a>
          <a href="#about" class="text-gray-600 hover:text-blue-600" @click="toggleMenu">About</a>
          <a href="#sign-in" class="text-gray-600 hover:text-blue-600" @click="toggleMenu">Sign In</a>
          <a href="#sign-up" class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700" @click="toggleMenu">Sign Up</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
