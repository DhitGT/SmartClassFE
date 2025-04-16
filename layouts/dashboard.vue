<script setup lang="ts">
import { ref } from "vue";
import { DashboardHeader, DashboardSidebar } from "#components";

// Make isSidebarOpen reactive
const isSidebarOpen = ref(false);

// Handle sidebar state
const handleSidebar = (val: boolean) => {
  isSidebarOpen.value = val;
  console.log("Sidebar state:", val);
};

import { useAuthStore } from "~/stores/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.token) {
    authStore.token = localStorage.getItem("token"); // Restore token
    authStore.user = JSON.parse(localStorage.getItem("user")); // Restore token
  }
  if (!authStore.token) {
    navigateTo("/auth/login");
  }
});
</script>

<template>
  <div class="relative flex min-h-screen overflow-x-hidden">
    <!-- Grid background that expands as content grows -->
    <div
      class="absolute inset-0 w-full min-h-full bg-grid bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 opacity-90 z-0"
    ></div>

    <!-- Foreground content -->
    <div class="relative z-10 flex w-full">
      <DashboardSidebar v-model:isOpen="isSidebarOpen" />
      <div class="flex-1 lg:pl-64 container max-w-none md:px-0">
        <DashboardHeader
          :sidebarVal="isSidebarOpen"
          @isSidebarOpen="handleSidebar"
        />

        <div class="px-6 pb-10">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-grid {
  background-color: rgb(241, 240, 240);
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.045) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.045) 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
