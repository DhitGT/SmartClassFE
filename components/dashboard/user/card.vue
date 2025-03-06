<template>
  <div
    class="flex flex-col items-start gap-2 p-3 bg-white shadow-md rounded-lg"
  >
    <div class="flex items-center w-full">
      <img
        src="https://placehold.co/50"
        alt="User Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div class="flex-1">
        <h2 class="text-base font-semibold">{{ name }}</h2>
        <p class="text-gray-500 text-xs">{{ email }}</p>
      </div>
      <div class="ml-4">
        <component :is="EllipsisVerticalIcon" class="h-5 w-5 text-gray-600" />
      </div>
    </div>
    <div class="flex w-full justify-between">
      <div>
        <span
          class="px-2 py-1 mt-1 text-xs font-medium rounded"
          :class="[`text-${badge?.color}-600`, `bg-${badge?.color}-100`]"
          >{{ badge.name }}</span
        >
      </div>
      <div>
        <span
          class="px-2 py-1 mt-1 text-xs font-medium text-gray-600 rounded"
          >{{ date }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
// Importing Heroicons
import { EllipsisVerticalIcon } from "@heroicons/vue/24/outline";
import { defineProps } from "vue";

defineProps({
  name: String,
  email: String,
  badge: Object,
  date: String,
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
