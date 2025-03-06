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
</script>

<template>
  <div class="flex max-w-sm md:overflow-auto md:max-w-full overflow-x-hidden">
    <!-- Bind the reactive property with v-model -->
    <DashboardSidebar v-model:isOpen="isSidebarOpen" />
    <div  class="flex-1 md:pl-64 bg-gray-100 container md:max-w-none md:px-0 ">
      <!-- Emit event to update sidebar state -->
      <DashboardHeader @isSidebarOpen="handleSidebar" />
      <div class="px-6">
        <slot />
      </div>
    </div>
  </div>
</template>
