<template>
  <div class="p-6 rounded-lg">
    <div class="flex justify-between items-center">
      <div class="hidden md:block">
        <h1 class="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p class="text-gray-600">Welcome back, Admin</p>
      </div>

      <Bars3Icon
        class="w-9 h-9 text-blue-600 md:hidden"
        @click="isSidebarOpen"
      />

      <div class="flex items-center space-x-4">
        <!-- Heroicons Bell Icon -->
        <div class="relative">
          <BellIcon
            class="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800"
          />
          <span
            class="hidden absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"
          ></span>
        </div>

        <div class="flex items-center">
          <img
            src="https://placehold.co/40"
            alt="User Avatar"
            class="w-10 h-10 rounded-full"
          />
          <span class="ml-2 text-gray-900">John Doe</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  sidebarVal: Boolean, // Controlled by parent
});
const emit = defineEmits(["isSidebarOpen"]);

const isSidebarOpen = () => {
  emit("isSidebarOpen", !props.sidebarVal);
};

import { BellIcon, Bars3Icon } from "@heroicons/vue/24/outline"; // Import Heroicons Bell icon
</script>
