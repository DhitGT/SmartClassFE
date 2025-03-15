<!-- ~/components/CourseCard.vue -->
<template>
  <div class="bg-white shadow-md rounded-lg p-5 flex flex-col">
    <div class="flex items-center justify-between w-full">
      <component :is="iconComponent" class="h-6 w-6 text-gray-600 mr-2" />
      <component :is="EllipsisVerticalIcon" class="h-6 w-6 text-black" />
    </div>
    <h2 class="text-lg font-semibold">{{ course.title }}</h2>

    <p class="text-gray-500 mb-2">{{ course.description }}</p>
    <div class="flex justify-between mt-auto">
        <p class="text-sm text-gray-700">{{ course.classes }} Classes</p>
        <p class="text-sm text-gray-700 bg-gray-200 rounded-xl px-3 py-1">{{ course.teachers }} Teachers</p>
    </div>
  </div>
</template>

<script setup>
import { EllipsisVerticalIcon,DevicePhoneMobileIcon,AcademicCapIcon,BookOpenIcon } from "@heroicons/vue/24/outline";
  const props = defineProps({
    course: Object,
    icon: String,
  });

  const icons = {
    EllipsisVerticalIcon,DevicePhoneMobileIcon,AcademicCapIcon,BookOpenIcon
  }

  const iconComponent = computed(() => icons[props.icon]);
</script>
