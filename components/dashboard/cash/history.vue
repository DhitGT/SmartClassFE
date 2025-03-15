<template>
  <div
    class="min-w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden "
  >
    <div class="p-5">
      <h2 class="text-xl font-bold">Payment History</h2>
      <div class="mt-4">
        <div
          v-for="(transaction, index) in transactions"
          :key="index"
          class="flex items-center py-3 border-b border-gray-300"
        >
          <component
            :is="cashIcon(transaction.type)"
            class="h-6 w-6"
            :class="transaction.amount > 0 ? 'text-teal-500' : 'text-red-500'"
          />
          <div class="ml-3">
            <div class="text-gray-800 text-sm">{{ transaction.title }}</div>
            <div class="text-gray-600 text-xs">{{ transaction.details }}</div>
          </div>
          <div class="flex ml-auto flex-col">
              <div
                class="ml-auto text-base"
                :class="transaction.amount > 0 ? 'text-teal-600' : 'text-red-600'"
              >
                {{ transaction.amount > 0 ? "+" : "-" }}${{
                  Math.abs(transaction.amount)
                }}
              </div>
              <div class="text-gray-500 text-xs">{{ transaction.date }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
} from "@heroicons/vue/24/outline";

// Sample Transaction Data
const transactions = ref([
  {
    title: "Received Payment",
    details: "From John Smith",
    amount: 850,
    date: "Mar 12, 2025",
    type: "in",
  },
  {
    title: "Refund Processed",
    details: "To Sarah Davis",
    amount: -200,
    date: "Mar 10, 2025",
    type: "out",
  },
  {
    title: "Tuition Fee Paid",
    details: "To School Account",
    amount: -1200,
    date: "Mar 8, 2025",
    type: "out",
  },
  {
    title: "Scholarship Received",
    details: "From Gov Program",
    amount: 500,
    date: "Mar 5, 2025",
    type: "in",
  },
]);

const cashIcon = (type) => {
  return type == "out" ? ArrowUpRightIcon : ArrowDownRightIcon;
};
</script>

<style scoped>
/* Add any local styles here if needed */
</style>
