<!-- ~/components/CourseCard.vue -->
<template>
  <div
    class="shadow-md rounded-lg p-4 flex flex-col bg-white"
    :class="[isCurrentDayNumber(props.dayNum) ? 'shadow-md inset-ring-3 inset-ring-blue-200' : 'inset-shadow-sm']"
  >
    <div class="flex items-start justify-between flex-col">
      <div class="pb-3 flex items-center justify-between w-full">
        <h2 class="text-lg font-semibold">{{ props.dayName }}</h2>
        <PencilIcon
          v-if="useNuxtApp().$checkRole(['Leader','Secretary'])"
          @click="toggleEditMode"
          class="w-4 h-4 text-gray-500 hover:text-gray-800 cursor-pointer"
        />
      </div>
      <div class="flex-col flex gap-1 w-full">
        <div
          v-for="subject in props.subjects"
          :class="[isCurrentDayNumber(props.dayNum) && isCurrentTime(subject.start_time,subject.end_time) ? 'shadow-md inset-ring-2 inset-ring-gray-300 my-1 bg-white' : 'bg-gray-100 inset-ring-0 shadow-none inset-shadow-sm']"
          class="rounded-lg px-2 w-full flex items-center gap-1"
        >
          <component
            class="w-6 h-6 my-1 me-2"
            :is="iconComponent(subject.icon)"
          ></component>
          <div class="flex items-center py-1   justify-between w-full">
            <div class="flex flex-col w-full">
              <p class="">{{ subject.name }}</p>
              <span class="text-start text-xs text-gray-500"
                >{{ subject.start_time }} - {{ subject.end_time }}</span
              >
            </div>
            <ReusableDeleteButton
              v-if="isEditMode && useNuxtApp().$checkRole(['Leader','Secretary'])"
              @delete="confirmDelete(subject.schedule_id)"
              class="hover:bg-gray-100 rounded-lg  cursor-pointer"
            />
          </div>
        </div>
        <div
          v-if="isEditMode"
          @click="toggleDropdown"
          :class="[props.isToday ? 'bg-blue-200' : 'bg-gray-100']"
          class="cursor-pointer hover:bg-gray-200 rounded-lg p-2 w-full flex items-center gap-1"
        >
          <PlusIcon
            class="w-4 h-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          />
          <DashboardFormScheduleSubject
            @close="toggleDropdown"
            @update="handleSetSchedule"
            :isOpen="isDropdownOpen"
            :day="props.dayName"
            :dayNum="props.dayNum"
            :subjects="scheduleStore.idleSubject"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {
  UserIcon,
  EllipsisVerticalIcon,
  BookOpenIcon,
  CalculatorIcon,
  BeakerIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/vue/24/outline";
import clickOutside from "@/directives/clickOutside";

import { useScheduleStore } from "~/stores/schedule";
import { CircleStackIcon } from "@heroicons/vue/24/outline";
const scheduleStore = useScheduleStore();

const props = defineProps({
  subjects: Array, // Expected to contain `icon`
  dayName: String,
  dayNum: String,
  isToday: Boolean,
});

const icons = {
  BookOpenIcon: BookOpenIcon,
  CalculatorIcon: CalculatorIcon,
  BeakerIcon: BeakerIcon,
  CircleStackIcon : CircleStackIcon,
  GlobeAltIcon: GlobeAltIcon,
  ComputerDesktopIcon: ComputerDesktopIcon,
};
// Map `subject.icon` to the actual icon component
const iconComponent = (iconName) => {
  return icons[iconName] || BookOpenIcon; // Default to BookOpenIcon if not found
};

const emit = defineEmits(["update", "delete", "close", "refresh"]);

const isEditMode = ref(false);
const isDropdownOpen = ref(false);
const isEditFormOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const confirmDelete = (schedule_id) => {
  emit("delete", schedule_id);
  showModal.value = false;
};

const isCurrentDayNumber = (dayNum) => {
  const day = new Date().getDay();
  // console.log(`is current day num ${dayNum} : ${day}`, dayNum == day)
  return dayNum == day; // Convert Sunday (0) to 7
};

const isCurrentTime = (start, end) => {
  const now = new Date();

  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const startTime = new Date();
  startTime.setHours(startHour, startMinute, 0, 0);

  const endTime = new Date();
  endTime.setHours(endHour, endMinute, 0, 0);

  return now >= startTime && now <= endTime;
};

const handleSetSchedule = async (formdata) => {
  isDropdownOpen.value = false;
  console.log("update woi , ", formdata);
  await scheduleStore.SetSchedule(formdata);
  await scheduleStore.GetIdleSubject();
  emit("refresh");
};

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value;
};
</script>
