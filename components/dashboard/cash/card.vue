<template>
  <div class="bg-white shadow-md rounded-lg p-4 md:p-6">
    <div class="flex items-center justify-between mb-4">
      <component
        :is="iconComponent"
        class="h-9 w-9 bg-gray-200 p-2 rounded text-gray-900 mr-2"
      />
      <h3 class="text-sm md:text-base font-semibold">{{ displayTitle }}</h3>
    </div>
    <p class="text-2xl font-bold">{{ amount }}</p>
    <p class="text-gray-500 text-xs md:text-base ">{{ subtitle }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import {
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";

// Props
const props = defineProps({
  title: String,
  amount: String,
  subtitle: String,
  icon: String,
});

// Icons mapping
const icons = {
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  UserIcon,
};

const iconComponent = computed(() => icons[props.icon]);

// Reactive state for window width
const windowWidth = ref(1024);

// Tailwind breakpoints mapping
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// Function to check if the viewport matches a specific Tailwind breakpoint
const isViewWidth = (size) => {
  return windowWidth.value >= breakpoints[size];
};

// Function to update window width
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

// Lifecycle hooks
onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWidth);
});

// Compute subtitle dynamically based on breakpoint
const displayTitle = computed(() =>
  isViewWidth("md") ? props.title : props.title.split(" ")[0]
);
</script>
