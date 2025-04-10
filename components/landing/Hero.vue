<template>
    <div class="p-2 my-18 mx-auto container">
        <div class=" flex flex-col-reverse gap-4 md:flex-row items-center justify-between p-8">
          <div class="md:w-1/2 ">
            <h1 class="text-4xl font-bold mb-4">Transform Your Management Class Experience with SmartClass</h1>
            <p class="mb-6">Manage your class in easy and cool way using SmartClass</p>
            <div class="flex flex-col md:flex-row gap-4">
              <NuxtLink to="/auth/login" color="blue" class="md:text-start text-center md:mr-4 bg-blue-600 cursor-pointer rounded-4xl px-4 py-3 text-white">Get Started</NuxtLink>
              <a href="#wyUs" color="blue" class="rounded-4xl py-3 px-4 border-[0.01rem] md:text-start text-center border-blue-600 cursor-pointer">Learn More</a>
            </div>
          </div>
          <div class="md:w-1/2  mt-6 md:mt-0  flex justify-center ">
            <img src="/dashboardPic.png" alt="SmartClass Dashboard" class="rounded-lg shadow-md">
          </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "HeroSection"
  }
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>