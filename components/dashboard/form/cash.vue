<script setup>
import { ref, defineEmits, watch, onMounted } from "vue";
import {
  ArrowLeftIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ListBulletIcon,
  XMarkIcon,
  CalendarIcon,
} from "@heroicons/vue/24/solid";
import { useUserStore } from "/stores/user";
const userStore = useUserStore();

// Initialize reactive variables
const amount = ref("");
const week = ref("");
const month = ref("");
const year = ref("");
const member = ref("");
const selectedMember = ref({});
const description = ref("");
const type = ref("");
const types = ["income", "expense"];

const emit = defineEmits(["submit", "close"]);

watch(member, (newValue, oldValue) => {
  if (!newValue) return; // Ensure newValue is valid

  // Find the member object from userStore.members based on user_id
  selectedMember.value = userStore.members.find((m) => m.user_id === newValue);

  console.log(`Member changed from ${oldValue} to ${newValue}`);
  console.log("Selected Member:", selectedMember.value);
});

onMounted(() => {
  // Set the current month, year, and week
  const currentDate = new Date();
  year.value = currentDate.getFullYear();
  month.value = currentDate.toISOString().slice(0, 7); // Format: YYYY-MM
  // week.value = getWeekNumber(currentDate);

  if (userStore.members.length === 0) {
    userStore.getMember();
  }
});

function getWeekNumber(date) {
  const dayOfMonth = date.getDate();
  const weekNumber = Math.ceil(dayOfMonth / 7);

  console.log("Week number:", weekNumber);
  return `minggu_${weekNumber}`;
}

function convertMonth(monthString) {
  // Split the string by the hyphen to separate year and month
  const parts = monthString.split("-");

  // The month is the second part (index 1), convert it to an integer
  const month = parseInt(parts[1], 10);

  // Return the month as an integer
  return month;
}

const submitForm = () => {
  let formData = {};
  if (type.value == "income") {
    formData = {
      amount: amount.value,
      member_id: member.value,
      week: week.value,
      month: convertMonth(month.value),
      year: year.value,
      type: type.value,
    };
  } else {
    formData = {
      amount: amount.value,
      description: description.value,
      type: type.value,
    };
  }

  emit("submit", formData);

  // Reset fields after submission
  amount.value = "";
  description.value = "";
  type.value = "";
  month.value = "";
  year.value = "";
  week.value = "";
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-[#00000028] bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-md w-xs sm:w-sm md:min-w-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-700 flex items-center">
          <ArrowLeftIcon class="w-5 h-5 mr-2 text-gray-500" /> Add Cash
          Transaction
        </h2>
        <button @click="emit('close')">
          <XMarkIcon class="w-6 h-6 text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Type -->
        <div>
          <label class="block text-gray-600">Type</label>
          <div class="flex items-center border border-gray-300 p-2 rounded-md">
            <ListBulletIcon class="w-5 h-5 text-gray-400 mr-2" />
            <select v-model="type" class="flex-1 outline-none">
              <option value="" disabled>Select Type</option>
              <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
        </div>

        <div v-if="type && type == 'income'">
          <label class="block text-gray-600">Month</label>
          <div class="flex items-center border border-gray-300 p-2 rounded-md">
            <CalendarIcon class="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="month"
              v-model="month"
              class="flex-1 outline-none"
              required
            />
          </div>
        </div>

        <div v-if="type && type == 'income'">
          <label class="block text-gray-600">Year</label>
          <div class="flex items-center border border-gray-300 p-2 rounded-md">
            <CalendarIcon class="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="number"
              v-model="year"
              min="2000"
              max="2100"
              placeholder="Enter year"
              class="flex-1 outline-none"
              required
            />
          </div>
        </div>

        <div v-if="type && type != 'expense'">
          <label class="block text-gray-600">Member</label>
          <div class="flex items-center border border-gray-300 p-2 rounded-md">
            <select v-model="member" class="flex-1 outline-none" required>
              <option value="" disabled>Select Member</option>
              <option
                v-for="s in userStore?.members"
                :key="s.user.id"
                :value="s.user.id"
              >
                {{ s.user.name }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="type && type != 'expense'">
          <label class="block text-gray-600">Week</label>
          <div class="flex items-center border border-gray-300 p-2 rounded-md">
            <select v-model="week" class="flex-1 outline-none" required>
              <option value="" disabled>Select Week</option>
              <option
                value="minggu_1"
                :disabled="
                  selectedMember?.pembayaran?.minggu_1?.status == 'Sudah Bayar'
                "
              >
                Week 1
              </option>
              <option
                value="minggu_2"
                :disabled="
                  selectedMember?.pembayaran?.minggu_2?.status == 'Sudah Bayar'
                "
              >
                Week 2
              </option>
              <option
                value="minggu_3"
                :disabled="
                  selectedMember?.pembayaran?.minggu_3?.status == 'Sudah Bayar'
                "
              >
                Week 3
              </option>
              <option
                value="minggu_4"
                :disabled="
                  selectedMember?.pembayaran?.minggu_4?.status == 'Sudah Bayar'
                "
              >
                Week 4
              </option>
            </select>
          </div>
        </div>

        <!-- Amount -->
        <div v-if="type">
          <label class="block text-gray-600">Amount</label>
          <div class="flex items-center border border-gray-300 p-2 rounded-md">
            <CurrencyDollarIcon class="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="number"
              v-model="amount"
              placeholder="Enter amount"
              class="flex-1 outline-none"
            />
          </div>
        </div>

        <!-- Description -->
        <div v-if="type && type != 'income'">
          <label class="block text-gray-600">Description</label>
          <div class="flex items-center border border-gray-300 p-2 rounded-md">
            <DocumentTextIcon class="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              v-model="description"
              placeholder="Enter description"
              class="flex-1 outline-none"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Add Transaction
        </button>
      </form>
    </div>
  </div>
</template>
