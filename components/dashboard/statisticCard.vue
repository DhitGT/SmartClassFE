<template>
  <div
    class="flex flex-col items-center justify-start p-4 bg-white rounded-lg shadow-md w-[50%] md:min-w-0 md:w-xs"
  >
    <div
      class="flex flex-col md:flex-row md:items-center justify-between min-w-full md:mb-2 text-3xl text-blue-500"
    >
      <component :is="icon" class="w-5 h-5 md:w-8 md:h-8" />
      <p class="text-gray-500 text-base md:text-xl">{{ title }}</p>
    </div>
    <h2 class="text-lg md:text-2xl font-semibold self-start">
      {{ formattedCount }}
    </h2>
    <div class="md:flex hidden items-center gap-1 self-start">
      <component :is="ArrowUpIcon" class="w-4 h-4 text-green-600" />
      <p class="self-start text-green-600">{{ percentage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ArrowUpIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";

const props = defineProps({
  icon: Object, // Fix: Change from String to Object for Vue component
  count: [String, Number], // Fix: Allow numbers as well
  title: String,
  percentage: String,
});

// Fix: Format large numbers (e.g., Revenue)
const formattedCount = computed(() => {
  if (typeof props.count === "number") {
    return props.title === "Revenue"
      ? `$${props.count.toLocaleString()}`
      : props.count.toLocaleString();
  }
  return props.count;
});
</script>
