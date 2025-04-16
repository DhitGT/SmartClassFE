<template>
  <div
    class="flex flex-col items-start gap-2 p-3 bg-white shadow-md rounded-lg"
  >
    <div class="flex items-center w-full">
      <img
      :src="
          avatar
            ? `${useRuntimeConfig().public.apiBaseUrl}/storage/${
                avatar
              }`
            : 'https://placehold.co/300'
        "
        alt="User Avatar"
        class="h-12 w-12 object-cover rounded-full mr-4"
      />
      <div class="flex-1">
        <h2 class="text-base font-semibold">{{ name }}</h2>
        <p class="text-gray-500 text-xs">{{ email }}</p>
        <div class="flex items-center gap-2" v-if="useNuxtApp().$checkRole(['Leader'])">
          <LockClosedIcon class="w-3 h-3 text-gray-500" />
          <p class="text-gray-500 text-xs">{{ access_code }}</p>
        </div>
      </div>
      <div class="relative ml-4" v-if="useNuxtApp().$checkRole(['Leader'])">
        <!-- Ellipsis Icon -->
        <button @click="toggleDropdown" class="cursor-pointer focus:outline-none">
          <component :is="EllipsisVerticalIcon" class="h-5 w-5 text-gray-600" />
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="isDropdownOpen"
          class="absolute right-0 mt-2 w-48 p-2 gap-2 flex flex-col bg-white border rounded-lg shadow-lg z-10"
        >
          <DashboardFormEditMemberForm
            @update="updateMemberAction"
            :member="props.member"
            :type="'mobile'"
          />
          <ReusableDeleteButton
            :type="'mobile'"
            @delete="confirmDelete(props.member)"
          />
        </div>

        <!-- Edit Member Form (Hidden by default) -->
        <DashboardFormEditMemberForm
          v-if="isEditFormOpen"
          @update="updateMemberAction"
          :member="props.member"
          :type="'mobile'"
        />
      </div>
    </div>
    <div class="flex w-full justify-between">
      <div>
        <span
          class="px-2 py-1 mt-1 text-xs font-medium rounded"
          :class="[`text-${badge?.color}-600`, `bg-${badge?.color}-100`]"
          >{{ badge.name }}</span
        >
      </div>
      <div>
        <span
          class="px-2 py-1 mt-1 text-xs font-medium text-gray-600 rounded"
          >{{ date }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
// Importing Heroicons
import {
  EllipsisVerticalIcon,
  LockClosedIcon,
} from "@heroicons/vue/24/outline";
import { defineProps, ref, defineEmits } from "vue";

const props = defineProps({
  name: String,
  email: String,
  avatar: String,
  access_code: String,
  badge: Object,
  date: String,
  member: Object,
});

const emit = defineEmits(["update", "delete", "close"]);

const isDropdownOpen = ref(false);
const isEditFormOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const confirmDelete = (member) => {
  emit("delete", member);
  showModal.value = false;
};
const updateMemberAction = (formdata) => {
  console.log("update woi , ",formdata)
  emit("update", formdata); // Close dropdown when opening edit form
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
