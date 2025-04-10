<template>
  <div class="container px-4 md:px-0 mx-auto" id="wyUs">
    <h2 class="text-2xl font-bold text-center mb-2">Why Choose SmartClass</h2>
    <p class="text-xl opacity-80 text-center mb-18">Our Best Feature</p>
    <div class="flex gap-4 flex-col md:flex-row">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="text-center mb-4 md:text-start"
      >
        <div
          class="bg-blue-200 rounded-full max-w-fit p-2 mx-auto md:mx-0 flex items-center mb-2 justify-center"
        >
          <component :is="item.icon" class="h-8 w-h-8 text-blue-500 mx-auto" />
        </div>
        <h3 class="text-xl font-semibold">{{ item.title }}</h3>
        <p class="text-gray-600">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  VideoCameraIcon,
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/vue/24/outline";

const items = [
  {
    icon: CurrencyDollarIcon,
    title: "Cash Management",
    description:
      "Easily track and manage class finances with a secure and transparent system.",
  },
  {
    icon: CalendarDaysIcon,
    title: "Schedule Management",
    description:
      "Organize class schedules, important dates, and deadlines in one central place.",
  },
  {
    icon: ClipboardDocumentListIcon,
    title: "Task Management",
    description:
      "Simplify group projects and individual tasks with collaborative tools and progress tracking.",
  },
];
</script>
