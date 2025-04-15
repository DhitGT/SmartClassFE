<template>
  <div
    class="flex flex-col items-start gap-2 p-3 bg-white shadow-md rounded-lg"
  >
    <div class="flex items-center w-full">
      <img
        :src="
          teacher?.avatar
            ? `${useRuntimeConfig().public.apiBaseUrl}/storage/${
                teacher?.avatar
              }`
            : 'https://placehold.co/300'
        "
        alt="User Avatar"
        class="h-12 w-12 rounded-full object-cover mr-4"
      />
      <div class="flex-1">
        <h2 class="text-base font-semibold">{{ teacher?.name }}</h2>
        <p class="text-gray-500 text-xs">
          {{
            teacher?.subject?.description
              ? teacher?.subject?.description
              : "Not assigned"
          }}
        </p>
        <!-- <div class="flex items-center gap-2">
            <LockClosedIcon class="w-3 h-3 text-gray-500" />
            <p class="text-gray-500 text-xs">{{ access_code ? access_code : 'testtt '}}</p>
          </div> -->
      </div>
      <div
        class="relative ml-4"
        v-if="useNuxtApp().$checkRole(['Leader','Secretary'])"
      >
        <!-- Ellipsis Icon -->
        <button @click="toggleDropdown" class="focus:outline-none">
          <component
            :is="EllipsisVerticalIcon"
            class="cursor-pointer h-5 w-5 text-gray-600"
          />
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="isDropdownOpen"
          class="absolute right-0 mt-2 w-48 gap-2 flex flex-col bg-white border rounded-lg shadow-lg z-10"
        >
          <DashboardFormEditTeacherForm
            @update="updateMemberAction"
            :teacher="props.teacher"
            :type="'mobile'"
            class="hover:bg-gray-100 rounded-lg p-2 cursor-pointer"
          />
          <ReusableDeleteButton
            :type="'mobile'"
            @delete="confirmDelete(props.teacher)"
            class="hover:bg-gray-100 rounded-lg p-2 cursor-pointer"
          />
        </div>

        <!-- Edit Member Form (Hidden by default) -->
        <DashboardFormEditMemberForm
          v-if="isEditFormOpen"
          @update="updateMemberAction"
          @cancle="isDropdownOpen = false"
          :member="props.member"
          :type="'mobile'"
        />
      </div>
    </div>
    <div class="flex w-full justify-between">
      <div>
        <span
          class="px-2 py-1 mt-1 text-xs font-medium rounded"
          :class="[`text-yellow-600`, `bg-yellow-100`]"
          >{{
            teacher?.subject?.name ? teacher?.subject?.name : "Not assigned"
          }}</span
        >
      </div>
      <!-- <div>
          <span
            class="px-2 py-1 mt-1 text-xs font-medium text-gray-600 rounded"
            >{{ teacher.created_at }}</span
          >
        </div> -->
    </div>
  </div>
</template>

<script setup>
import clickOutside from "@/directives/clickOutside";
const { $checkRole } = useNuxtApp()
import { computed } from "vue";
import {
  BookOpenIcon,
  CalculatorIcon,
  EllipsisVerticalIcon,
  BeakerIcon,
  GlobeAltIcon,
  CircleStackIcon,
  ComputerDesktopIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  teacher: Object, // Expected to contain `icon`
  //   name: String,
  //   email: String,
  //   access_code: String,
  //   badge: Object,
  //   date: String,
  //   member: Object,
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
  isDropdownOpen.value = false;
  console.log("update woi , ", formdata);
  emit("update", formdata); // Close dropdown when opening edit form
};

const icons = {
  BookOpenIcon,
  CalculatorIcon,
  BeakerIcon,
  GlobeAltIcon,
  CircleStackIcon,
  ComputerDesktopIcon,
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // hour12: true,
  });
};

// Map `teacher.icon` to the actual icon component
const iconComponent = computed(
  () => icons[props.teacher?.icon] || BookOpenIcon
);
</script>
