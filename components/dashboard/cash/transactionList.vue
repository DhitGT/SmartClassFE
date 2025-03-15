<template>
    <div class="bg-white shadow-md rounded-lg p-6 min-w-full mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">Recent Transactions</h3>
        <button
          class="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full"
        >
          <PlusIcon class="w-5 h-5 text-gray-700" />
        </button>
      </div>
  
      <!-- Transactions List -->
      <div v-for="transaction in transactions" :key="transaction.id" class="flex items-center justify-between py-3 border-gray-300 border-b">
        <div class="flex items-center">
          <!-- Avatar -->
          <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <img src="https://placehold.co/400" class="rounded-full text-gray-600" />
          </div>
          <!-- Transaction Details -->
          <div class="ml-3">
            <div class="text-gray-900 font-medium">{{ transaction.student }}</div>
            <div class="text-gray-500 text-sm">{{ transaction.type }}</div>
          </div>
        </div>
        <!-- Amount and Status -->
        <div class="text-right">
          <div class="text-gray-900 font-semibold">${{ transaction.amount }}</div>
          <span
            class="text-sm px-2 py-1 rounded-md"
            :class="{
              'bg-green-100 text-green-600': transaction.status === 'Completed',
              'bg-yellow-100 text-yellow-600': transaction.status === 'Pending',
              'bg-red-100 text-red-600': transaction.status === 'Failed',
            }"
          >
            {{ transaction.status }}
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { PlusIcon, UserIcon } from "@heroicons/vue/24/outline";
  
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
  </script>
  
  <style scoped>
  /* Additional styling if needed */
  </style>
  