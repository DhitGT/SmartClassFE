<template>
  <section class="relative overflow-hidden">
    <!-- Gradient + Grid Background -->
    <div class="absolute inset-0 bg-grid bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 opacity-90 z-0"></div>

    <!-- Main Content -->
    <div class="relative z-10 p-2 my-18 mx-auto container">
      <div class="flex flex-col-reverse gap-4 md:flex-row items-center justify-between p-8 text-black">
        <div class="md:w-1/2">
          <h1 class="text-4xl font-bold mb-4">
            Transform Your Management Class Experience with SmartClass
          </h1>
          <p class="mb-6">
            Manage your class in easy and cool way using SmartClass
          </p>
          <div class="flex flex-col md:flex-row gap-4">
            <NuxtLink
              to="/auth/login"
              class="md:text-start text-center md:mr-4 bg-blue-600 cursor-pointer rounded-4xl px-4 py-3 text-white"
            >
              Get Started
            </NuxtLink>
            <a
              href="#wyUs"
              class="rounded-4xl py-3 px-4 border border-blue-600 md:text-start text-center cursor-pointer"
            >
              Learn More
            </a>
          </div>
        </div>
        <div class="md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <img
            src="/dashboardPic.png"
            alt="SmartClass Dashboard"
            class="rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection"
}
</script>

<style scoped>
.bg-grid {
  background-color: rgb(247, 247, 247);
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.045) 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
