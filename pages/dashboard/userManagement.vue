<template>
  <div class="container min-h-screen flex flex-col gap-4 mx-auto rounded-lg">
    <!-- Top Bar with Dropdown -->
    <div class="flex items-center justify-between">
      <div class="relative inline-flex">
        <button
          class="block w-fit text-left px-4 py-2"
          :class="
            selectedCategory == 'Teachers' ? 'border-b-2 border-gray-400' : ''
          "
          @click="selectCategory('Teachers')"
        >
          Teachers
        </button>
        <button
          class="block w-fit text-left px-4 py-2"
          :class="
            selectedCategory == 'Members' ? 'border-b-2 border-gray-400' : ''
          "
          @click="selectCategory('Members')"
        >
          Members
        </button>
      </div>
    </div>

    <!-- Search & Filter -->
    <input
      type="text"
      placeholder="Search users..."
      class="md:hidden block input input-bordered w-full border bg-white border-gray-300 rounded-md p-2"
    />
    <div class="flex justify-between gap-4">
      <div class="flex items-center w-full md:w-fit justify-start gap-4">
        <input
          type="text"
          placeholder="Search users..."
          class="hidden md:block input input-bordered w-full border bg-white border-gray-300 rounded-md p-2"
        />
        <select
          class="select w-full border border-gray-300 bg-white rounded-md p-2"
        >
          <option>All Departments</option>
          <option>Mathematics</option>
          <option>Science</option>
        </select>
      </div>
      <button
        class="btn btn-primary rounded-lg flex items-center bg-blue-500 text-white px-4 hover:bg-blue-600"
      >
        <PlusIcon class="h-4 w-4 md:mr-2" />
        <span class="hidden md:block"> Add New User </span>
      </button>
    </div>

    <!-- Table -->
    <div class="hidden md:block">
      <table class="table-auto w-full bg-white rounded-t-xl shadow-sm">
        <thead>
          <tr class="bg-white text-start">
            <th class="px-4 text-start text-gray-500 py-2 rounded-t-xl">
              User
            </th>
            <th class="px-4 text-start text-gray-500 py-2">Department</th>
            <th class="px-4 text-start text-gray-500 py-2">Status</th>
            <th class="px-4 text-start text-gray-500 py-2">Joined Date</th>
            <th class="px-4 text-start text-gray-500 py-2 rounded-t-xl">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.email"
            class="bg-white border-y-1 border-gray-200 hover:bg-gray-50"
          >
            <td class="px-4 py-2 flex items-center gap-2">
              <img
                src="https://placehold.co/100"
                class="h-10 w-10 rounded-full"
              />
              <div class="leading-5">
                <span class="font-semibold">{{ user.name }}</span
                ><br />
                <span class="text-sm text-gray-500">{{ user.email }}</span>
              </div>
            </td>
            <td class="px-4 py-2">{{ user.department }}</td>
            <td class="px-4 py-2">{{ user.status }}</td>
            <td class="px-4 py-2">{{ user.joinedDate }}</td>
            <td class="px-4 py-2 flex gap-2">
              <PencilIcon
                class="h-5 w-5 cursor-pointer text-blue-500 hover:text-blue-700"
              />
              <TrashIcon
                class="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="flex p-4 min-w-full bg-white shadow-md rounded-b-xl justify-between items-center"
      >
        <p class="text-sm">
          Showing 1 to {{ filteredUsers.length }} of
          {{ filteredUsers.length }} entries
        </p>
        <nav class="flex space-x-2">
          <button
            class="btn btn-secondary text-black px-4 py-2 hover:bg-gray-100 cursor-pointer border-1 border-gray-300 rounded-lg"
          >
            Previous
          </button>
          <button
            class="btn btn-secondary text-black px-4 py-2 hover:bg-gray-100 cursor-pointer border-1 border-gray-300 rounded-lg"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
    <div class="md:hidden flex flex-col gap-4">
      <DashboardUserCard
        v-for="user in filteredUsers"
        :key="user.email"
        :name="user.name"
        :email="user.email"
        :date="user.joinedDate"
        :badge="{ name: user.department, color: 'red' }"
      />
    </div>

    <!-- Pagination -->
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  PlusIcon,
  UserIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { useRoute } from 'vue-router';

const route = useRoute();
const menuOpen = ref(false);
const selectedCategory = ref("Teachers");
const userType = computed(() => route.query.is || "default");

// Update selectedCategory based on userType
watch(userType, (newVal) => {
  selectedCategory.value = newVal === "members" ? "Members" : "Teachers";
}, { immediate: true }); // Run immediately when the component is created

const teachers = [
  {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    department: "Mathematics",
    status: "Active",
    joinedDate: "Mar 15, 2025",
  },
  {
    name: "Michael Smith",
    email: "m.smith@example.com",
    department: "Science",
    status: "Active",
    joinedDate: "Mar 10, 2025",
  },
];

const members = [
  {
    name: "Emma Brown",
    email: "emma.b@example.com",
    department: "Leader",
    status: "Active",
    joinedDate: "Feb 5, 2025",
  },
  {
    name: "James Wilson",
    email: "j.wilson@example.com",
    department: "Scretaries",
    status: "Inactive",
    joinedDate: "Jan 20, 2025",
  },
];

const selectCategory = (category) => {
  selectedCategory.value = category;
  menuOpen.value = false;
};

const filteredUsers = computed(() =>
  selectedCategory.value === "Teachers" ? teachers : members
);
definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
/* No additional styles needed */
</style>
