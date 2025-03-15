<template>
  <div class="bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center p-4 rounded-lg">
      <div class="items-center flex  gap-4" >
        <input
          type="text"
          placeholder="Search subjects..."
          class="border rounded-lg p-2 w-full"
        />
        <select class="border rounded-lg p-2  w-full">
          <option>All Grades</option>
          <option>Grade 10</option>
          <option>Grade 11</option>
          <!-- Add more options as needed -->
        </select>
      </div>
      <div class="flex space-x-2">
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">
          <div class="flex items-center justify-center gap-1">
            <PlusIcon class="text-white w-6 h-6" />
            Add New Subject
          </div>
        </button>
      </div>
    </div>
  </div>
  <div class="container mx-auto bg-white rounded-lg shadow-md p-4">
    <!-- Header Section -->

    <!-- Search and Filter -->

    <!-- Subjects Table -->
    <table class="min-w-full">
      <thead>
        <tr class="text-start">
          <th class="py-2 px-4 text-start border-b">Subject</th>
          <th class="py-2 px-4 text-start border-b">Grade Level</th>
          <th class="py-2 px-4 text-start border-b">Teachers</th>
          <th class="py-2 px-4 text-start border-b">Students</th>
          <th class="py-2 px-4 text-start border-b">Status</th>
          <th class="py-2 px-4 text-start border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="subject in subjects"
          class="border-b-2 border-gray-100"
          :key="subject.id"
        >
          <td class="py-2 px-4 text-sm">{{ subject.name }}</td>
          <td class="py-2 px-4 text-sm">{{ subject.gradeLevel }}</td>
          <td class="py-2 px-4 text-sm flex items-center">
            <img
              v-for="teacher in subject.teachers"
              :key="teacher.id"
              src="https://placehold.co/400"
              class="rounded-full w-6 h-6 mr-1"
            />
            {{ subject.teacherCount }}
          </td>
          <td class="py-2 px-4 text-sm">{{ subject.studentCount }}</td>
          <td class="py-2 px-4 text-sm">
            <span
              class="rounded-xl text-xs py-1 px-2 text-green-600 bg-green-200"
            >
              {{ subject.status }}
            </span>
          </td>
          <td class="py-2 px-4 text-sm">
            <EllipsisVerticalIcon
              class="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Section -->
    <div class="flex justify-between items-center mt-4">
      <span>Showing 1 to 10 of 18 entries</span>
      <div class="flex space-x-2">
        <button class="border px-2 py-1 rounded-lg">Previous</button>
        <button class="border px-2 py-1 rounded-lg">1</button>
        <button class="border px-2 py-1 rounded-lg">2</button>
        <button class="border px-2 py-1 rounded-lg">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/vue/24/outline";

// Sample Subjects Data
const subjects = ref([
  {
    id: 1,
    name: "Chemistry",
    gradeLevel: "Grade 11",
    teachers: [{ id: 1 }, { id: 2 }],
    teacherCount: 2,
    studentCount: 45,
    status: "Active",
  },
  {
    id: 2,
    name: "Literature",
    gradeLevel: "Grade 10",
    teachers: [{ id: 3 }],
    teacherCount: 1,
    studentCount: 38,
    status: "Active",
  },
  // Add more subjects as needed
]);
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
