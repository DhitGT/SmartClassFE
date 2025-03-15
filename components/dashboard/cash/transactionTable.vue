<template>
  <div class="container mx-auto bg-white rounded-lg shadow-md p-4">
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Recent Transactions</h2>
      <div class="flex space-x-2">
        <button class="bg-gray-200 text-base px-4 py-2 rounded-lg">
          <div class="flex items-center justify-center gap-1">
            <component :is="FunnelIcon" class="text-gray-800 w-4 h-4" />
            Filter
          </div>
        </button>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">
          <div class="flex items-center justify-center gap-1">
            <component :is="PlusIcon" class="text-white w-6 h-6 " />
            New Transaction
          </div>
        </button>
      </div>
    </div>

    <!-- Transactions Table -->
    <table class="min-w-full">
      <thead>
        <tr class="text-start">
          <th class="py-2 px-4 text-start border-b">Transaction ID</th>
          <th class="py-2 px-4 text-start border-b">Student</th>
          <th class="py-2 px-4 text-start border-b">Type</th>
          <th class="py-2 px-4 text-start border-b">Amount</th>
          <th class="py-2 px-4 text-start border-b">Date</th>
          <th class="py-2 px-4 text-start border-b">Status</th>
          <th class="py-2 px-4 text-start border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="transaction in transactions"
          class="border-b-2 border-gray-100"
          :key="transaction.id"
        >
          <td class="py-2 px-4 text-sm">{{ transaction.id }}</td>
          <td class="py-2 px-4 text-sm flex items-center">
            <img
              src="https://placehold.co/400"
              class="rounded-full w-6 h-6 mr-2"
            />
            {{ transaction.student }}
          </td>
          <td class="py-2 px-4 text-sm">{{ transaction.type }}</td>
          <td class="py-2 px-4 text-sm">${{ transaction.amount }}</td>
          <td class="py-2 px-4 text-sm">{{ transaction.date }}</td>
          <td class="py-2 px-4 text-sm">
            <span class="rounded-xl text-xs py-1 px-2" :class="statusClass(transaction.status)">{{
              transaction.status
            }}</span>
          </td>
          <td class="py-2 px-4 text-sm">
            <EllipsisVerticalIcon
              class="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  UserIcon,
  EllipsisVerticalIcon,
  FunnelIcon,
  PlusIcon
} from "@heroicons/vue/24/outline";

// Sample Transactions Data
const transactions = ref([
  {
    id: "#TRX-2345",
    student: "Emma Wilson",
    type: "Tuition Fee",
    amount: 1200,
    date: "Mar 15, 2025",
    status: "Completed",
  },
  {
    id: "#TRX-2344",
    student: "James Brown",
    type: "Lab Fee",
    amount: 300,
    date: "Mar 14, 2025",
    status: "Pending",
  },
  {
    id: "#TRX-2343",
    student: "Sophia Miller",
    type: "Library Fee",
    amount: 50,
    date: "Mar 12, 2025",
    status: "Failed",
  },
]);

// Function to determine status color class
const statusClass = (status) => {
  switch (status) {
    case "Completed":
      return "text-green-600 bg-green-200";
    case "Pending":
      return "text-yellow-600 bg-yellow-200";
    case "Failed":
      return "text-red-600 bg-red-200";
    default:
      return "text-gray-600 bg-red-200";
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
