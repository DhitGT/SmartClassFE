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
    authStore.user =  JSON.parse(localStorage.getItem("user")); // Restore token
  }
  if (!authStore.token) {
    navigateTo("/auth/login");
  }
});
</script>

<template>
  <div class="flex  md:overflow-auto md:max-w-full overflow-x-hidden">
    <!-- Bind the reactive property with v-model -->
    <DashboardSidebar v-model:isOpen="isSidebarOpen" />
    <div class="flex-1 lg:pl-64 bg-gray-100 container max-w-none md:px-0">
      <!-- Emit event to update sidebar state -->
      <DashboardHeader :sidebarVal="isSidebarOpen"  @isSidebarOpen="handleSidebar" />
      <div class="px-6">
        <slot />
      </div>
    </div>
  </div>
</template>
