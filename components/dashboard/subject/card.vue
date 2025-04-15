<!-- ~/components/CourseCard.vue -->
<template>
  <div class="bg-white shadow-md rounded-lg p-5 flex flex-col">
    <div class="flex items-center justify-between flex-row-reverse">
      <div
          class="relative ml-4"
          
        >
          <!-- Ellipsis Icon -->
          <button @click="toggleDropdown" v-if="useNuxtApp().$checkRole(['Leader','Secretary'])" class="focus:outline-none">
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
            <DashboardFormEditSubjectForm
              @update="updateMemberAction"
              :subject="props.subject"
              :type="'mobile'"
              class="hover:bg-gray-100 rounded-lg p-2 cursor-pointer"
            />
            <ReusableDeleteButton
              :type="'mobile'"

              @delete="confirmDelete(props.subject)"
              class="hover:bg-gray-100 rounded-lg p-2 cursor-pointer"
            />
          </div>
  
          <!-- Edit Member Form (Hidden by default) -->
          <DashboardFormEditSubjectForm
            v-if="isEditFormOpen"
            @update="updateMemberAction"
            @cancle="isDropdownOpen = false"
            :subject="props.subject"
            :type="'mobile'"
          />
        </div>
      <h2 class="text-lg font-semibold">{{ subject.name }}</h2>
    </div>

    <p class="text-gray-500 mb-2">{{ subject.description }}</p>
    <div class="flex justify-between mt-auto items-center">
      <div class="flex items-center gap-2 ">
        <component :is="iconComponent" class="w-4 h-4" />
        <p class="text-sm text-gray-700">{{ subject.task_count ? subject.task_count : 0  }} Task</p>
      </div>
      <div class="flex bg-gray-200 rounded-xl px-3 py-1 items-center gap-2" v-if="subject.teacher">
        <img
        :src="
          subject?.teacher?.avatar
            ? `${useRuntimeConfig().public.apiBaseUrl}/storage/${
              subject?.teacher?.avatar
              }`
            : 'https://placehold.co/300'
        "
        alt="User Avatar"
        class="h-4 w-4 rounded-full object-cover"
      />
        <p class="text-sm text-gray-700 "  >{{ subject.teacher?.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { UserIcon,EllipsisVerticalIcon,CircleStackIcon, BookOpenIcon, CalculatorIcon, BeakerIcon, GlobeAltIcon, ComputerDesktopIcon } from "@heroicons/vue/24/outline";
import clickOutside from "@/directives/clickOutside";


const props = defineProps({
  subject: Object, // Expected to contain `icon`
});

const icons = {
  BookOpenIcon,
  CalculatorIcon,
  BeakerIcon,
  CircleStackIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
};


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



// Map `subject.icon` to the actual icon component
const iconComponent = computed(() => icons[props.subject?.icon] || BookOpenIcon);
</script>
