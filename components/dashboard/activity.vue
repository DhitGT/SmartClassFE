<template>
  <div class="flex flex-col md:flex-row min-w-full gap-4 ">
    <div class="flex space-x-4 md:w-[50%] p-6 bg-white rounded-lg shadow">
      <div class="flex flex-col w-full justify-start gap-4 ">
        <h2 class="text-lg font-semibold mb-4">Recent Activities</h2>
        <div
          v-for="(activity, index) in activities"
          :key="index"
          class=" flex items-center mb-2 "
        >
          <div class="bg-blue-500 p-2 rounded-full text-white">
            <PlusIcon class="w-4 h-4" />
          </div>
          <div class="ml-3 flex justify-between w-full">
            <div>
                <p class="font-medium">{{ activity.title }}</p>
                <p class="text-gray-700 text-sm mt-[-0.3em]">{{ activity.desc }}</p>
            </div>
            <p class="text-gray-500 text-sm">{{ activity.time }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex space-x-4 md:w-[50%] p-6 bg-white rounded-lg shadow">
      <div class="flex-1 ">
        <h2 class="text-lg font-semibold mb-4">Today's Schedule</h2>
        <div
          v-for="(schedule, index) in schedules"
          :key="index"
          class="flex items-center  mb-2"
        >
          <div :class="schedule.color + ' p-2 rounded-full'">
            <component :is="schedule.icon" class="w-4 h-4 text-white" />
          </div>
          <div class="ml-3">
            <p class="font-medium">{{ schedule.subject }}</p>
            <p class="text-gray-500 text-sm">{{ schedule.time }}</p>
            <span :class="schedule.gradeClass" class="text-sm font-semibold">{{
              schedule.grade
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  PlusIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/vue/24/solid";

// Data for activities
const activities = [
  { title: "New teacher registered", time: "2h ago",desc:'lorem ipsum dolor site amet' },
  { title: "Task completed", time: "4h ago",desc:'lorem ipsum dolor site amet' },
  { title: "Schedule updated", time: "6h ago",desc:'lorem ipsum dolor site amet' },
];

// Data for schedules
const schedules = [
  {
    subject: "Mathematics",
    time: "09:00 AM - 10:30 AM",
    grade: "Grade 10",
    color: "bg-purple-500",
    gradeClass: "text-purple-500",
    icon: AcademicCapIcon,
  },
  {
    subject: "Physics Lab",
    time: "11:00 AM - 12:30 PM",
    grade: "Grade 11",
    color: "bg-blue-500",
    gradeClass: "text-blue-500",
    icon: ClipboardDocumentListIcon,
  },
  {
    subject: "Chemistry",
    time: "02:00 PM - 03:30 PM",
    grade: "Grade 12",
    color: "bg-green-500",
    gradeClass: "text-green-500",
    icon: AcademicCapIcon,
  },
];
</script>

<style scoped>
/* Customize styles here if needed */
</style>
