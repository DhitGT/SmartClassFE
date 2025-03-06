<template>
    <div @click="this.$router.push(`${this.$route.path}/${cardhref}`) " class="bg-white rounded-lg shadow-md p-4 flex flex-col items-start transition-transform hover:scale-105">
      <component
        :is="iconComponent"
        class="w-9 h-9 p-2 rounded-full mb-2"
        :class="iconColors[icon] || 'bg-gray-200 text-gray-500'"
      />
      <h3 class="text-lg font-semibold mb-1">{{ title }}</h3>
      <p class="text-gray-500 text-sm text-center">{{ description }}</p>
    </div>
  </template>
  
  <script setup>
  import { computed, defineProps } from "vue";
  import {
    UserGroupIcon,
    UsersIcon,
    BanknotesIcon,
    CalendarIcon,
    BookOpenIcon,
    ClipboardDocumentListIcon,
  } from "@heroicons/vue/24/outline";
  
  // Props
  const props = defineProps({
    title: String,
    description: String,
    icon: String,
    cardhref: String,
  });
  
  // Icon mapping
  const icons = {
    UserGroupIcon,
    UsersIcon,
    BanknotesIcon,
    CalendarIcon,
    BookOpenIcon,
    ClipboardDocumentListIcon,
  };
  
  // Color mapping
  const iconColors = {
    UserGroupIcon: "bg-blue-200 text-blue-500",
    UsersIcon: "bg-green-200 text-green-500",
    BanknotesIcon: "bg-yellow-200 text-yellow-500",
    CalendarIcon: "bg-purple-200 text-purple-500",
    BookOpenIcon: "bg-indigo-200 text-indigo-500",
    ClipboardDocumentListIcon: "bg-red-200 text-red-500",
  };
  
  // Compute icon dynamically
  const iconComponent = computed(() => icons[props.icon] || UserGroupIcon);
  </script>
  