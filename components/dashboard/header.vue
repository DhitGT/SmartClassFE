<template>
  <div class="px-4 py-3 mb-3 bg-white rounded-lg">
    <div class="flex justify-between items-center">
      <!-- Dashboard Title -->
      <!-- Sidebar Toggle Button -->
      <div class="flex items-center gap-2">
        <Bars3Icon
          class="w-9 h-9 text-blue-600 lg:hidden"
          @click="toggleSidebar"
        />
        <div class="hidden md:block">
          <h1 class="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p class="text-gray-600">Welcome back, {{ user?.name || "User" }}</p>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <!-- User Dropdown -->
        <div class="relative">
          <div class="flex items-center cursor-pointer" @click="toggleDropdown">
            <img
              :src="
                user?.avatar
                  ? `${useRuntimeConfig().public.apiBaseUrl}/storage/${
                      user?.avatar
                    }`
                  : 'https://placehold.co/300'
              "
              alt="User Avatar"
              class="w-10 h-10 object-cover rounded-full"
            />
            <span class="ml-2 text-gray-900">{{ user?.name || "User" }}</span>
          </div>

          <!-- Dropdown Menu -->
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 z-30 w-48 bg-white shadow-lg rounded-lg border"
          >
            <button
              @click="logout"
              class="block w-full text-left px-4 py-2 text-gray-700 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, defineProps } from "vue";
import { useAuthStore } from "~/stores/auth";
import { BellIcon, Bars3Icon } from "@heroicons/vue/24/outline";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isDropdownOpen = ref(false);
const emit = defineEmits(["isSidebarOpen"]);
const props = defineProps(["sidebarVal"]);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleSidebar = () => {
  emit("isSidebarOpen", !props.sidebarVal);
};

const logout = () => {
  authStore.logout();
  navigateTo("/auth/login");
};
</script>
