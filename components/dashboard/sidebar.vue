<template>
  <div>
    <!-- Mobile Menu Button -->

    <!-- Sidebar -->
    <div
      :class="[
        'fixed left-0 top-0 h-full w-64 bg-white shadow-md p-4 z-40 transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:block',
      ]"
    >
      <h1 class="text-xl font-bold text-blue-600">Smart Class</h1>
      <nav class="mt-4">
        <ul>
          <li v-for="item in menuItems" :key="item.name" class="my-2">
            <NuxtLink
              @click="$emit('update:isOpen', false)"
              :to="item.path"
              class="flex items-center p-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded-md"
            >
              <component
                :is="item.icon"
                class="w-5 h-5 text-gray-700 hover:text-white"
              />
              <span class="ml-2">{{ item.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Overlay for mobile -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
      @click="$emit('update:isOpen', false)"
    ></div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import {
  HomeIcon,
  UserIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  BookOpenIcon,
  ClipboardDocumentIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  isOpen: Boolean, // Controlled by parent
});

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
  {
    name: "Member",
    path: "/dashboard/userManagement",
    icon: UserIcon,
  },
  {
    name: "Teacher",
    path: "/dashboard/teachers",
    icon: UsersIcon,
  },
  {
    name: "Cash Management",
    path: "/dashboard/cash",
    icon: CurrencyDollarIcon,
  },
  { name: "Schedule", path: "/dashboard/schedule", icon: CalendarIcon },
  { name: "Subjects", path: "/dashboard/subjects", icon: BookOpenIcon },
  { name: "Tasks", path: "/dashboard/tasks", icon: ClipboardDocumentIcon },
];
</script>
