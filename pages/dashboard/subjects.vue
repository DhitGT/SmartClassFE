<!-- ~/pages/index.vue -->
<template>
  <div
    class="container min-h-screen pb-12 flex flex-col gap-4 mx-auto rounded-lg"
  >
    <div class="bg-white rounded-lg shadow-md">
      <div
        class="flex flex-col md:flex-row justify-between items-center p-4 rounded-lg"
      >
        <div class="items-center flex-col md:flex-row flex gap-4 min-w-full">
          <div class="flex  w-full items-center gap-4">
            <input
              type="text"
              placeholder="Search subjects..."
              class="border rounded-lg p-2 w-full"
            />
            <select class="border hidden md:block rounded-lg p-2 w-full">
              <option>All Grades</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <!-- Add more options as needed -->
            </select>
          </div>
          <div class="flex w-full gap-4">
            <select class="border md:hidden rounded-lg p-2 w-full">
              <option>All Grades</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <!-- Add more options as needed -->
            </select>
            <div class="md:ms-auto min-w-fit">
              <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">
                <div class="flex items-center justify-center gap-1">
                  <PlusIcon class="text-white w-6 h-6" />
                  <span class="hidden md:block">
                      Add New Subject
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      <DashboardSubjectCard
        v-for="course in courses"
        :key="course.id"
        :course="course"
        :icon="course.icon"
      />
    </div>
    <!-- <DashboardSubjectTable /> -->
  </div>
</template>

<script setup>
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/vue/24/outline";
const courses = [
  {
    id: 1,
    title: "Mathematics",
    description: "Advanced calculus and algebra for senior students",
    classes: 12,
    teachers: 4,
    icon: "DevicePhoneMobileIcon", // Replace with the actual Heroicon name
  },
  {
    id: 2,
    title: "Physics",
    description: "Fundamental physics concepts and laboratory work",
    classes: 8,
    teachers: 3,
    icon: "AcademicCapIcon", // Replace with the actual Heroicon name
  },
  {
    id: 3,
    title: "English",
    description: "Literature and language arts curriculum",
    classes: 10,
    teachers: 5,
    icon: "BookOpenIcon", // Replace with the actual Heroicon name
  },
];

definePageMeta({
  layout: "dashboard",
});
</script>
