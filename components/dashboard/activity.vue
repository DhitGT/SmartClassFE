<template>
  <div class="flex flex-col-reverse md:flex-row min-w-full gap-4">
    <div class="flex space-x-4 md:w-[50%] p-6 bg-white rounded-lg shadow">
      <div
        class="flex flex-col w-full justify-start max-h-[50vh] overflow-y-scroll gap-4"
      >
        <h2 class="text-lg font-semibold mb-4">Recent Cash Activities</h2>
        <div
          v-for="(log, index) in cashStore.cashLogData"
          :key="index"
          class="flex flex-col mb-2"
        >
          <div class="flex items-center">
            <component
              :is="cashIcon(log.type)"
              class="h-6 w-6"
              :class="log.type == 'income' ? 'text-teal-500' : 'text-red-500'"
            />
            <div class="ml-3 flex justify-between w-full">
              <div>
                <p class="font-medium">{{ log.type }}</p>
                <p class="text-gray-700 text-xs sm:text-sm mt-[-0.3em]">
                  {{ log.description }}
                </p>
              </div>
            </div>
            <div class="w-max flex flex-col">
              <div
                class="ml-auto text-sm sm:text-base w-max"
                :class="log.type == 'income' ? 'text-teal-600' : 'text-red-600'"
              >
                {{ log.type == "income" ? "+" : "-"
                }}{{ formatToIDR(Math.abs(log.amount)) }}
              </div>
              <div class="text-gray-500 text-end text-xs">
                {{ formatDate(log.created_at) }}
              </div>
            </div>
          </div>
        </div>
        <span v-if="!cashStore.cashLogData" class="text-center text-gray-300"
          >No data available</span
        >
      </div>
    </div>
    <div class="flex space-x-4 md:w-[50%] p-6 bg-white rounded-lg shadow">
      <div class="flex-1">
        <h2 class="text-lg font-semibold mb-4">Today's Schedule</h2>
        <div
          v-if="scheduleStore.nowScheduleSubject"
          v-for="(schedule, index) in scheduleStore.nowScheduleSubject"
          :key="index"
          :class="[
            isCurrentTime(
              schedule.subject.start_time,
              schedule.subject.end_time
            )
              ? 'shadow-md inset-ring-2 inset-ring-gray-300 my-1 bg-white'
              : 'bg-gray-100 inset-ring-0 shadow-none inset-shadow-sm',
          ]"
          class="rounded-lg my-2 px-2 w-full flex items-center gap-1"
        >
          <div :class="schedule.color + ' p-2 rounded-full'">
            <component
              :is="iconComponent(schedule.subject.icon)"
              class="w-6 h-6 text-black"
            />
          </div>
          <div class="ml-3 py-1">
            <p class="font-medium leading-5">{{ schedule.subject.name }}</p>
            <p class="text-gray-500 text-sm">
              {{ schedule.subject.start_time }} -
              {{ schedule.subject.end_time }}
            </p>
            <span :class="schedule.gradeClass" class="text-sm font-semibold">{{
              schedule.grade
            }}</span>
          </div>
        </div>
        <span v-else class="text-center text-gray-300">No data available</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  UserIcon,
  EllipsisVerticalIcon,
  BookOpenIcon,
  CalculatorIcon,
  BeakerIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
  PencilIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  CircleStackIcon,
  TrashIcon,
  PlusIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/vue/24/outline";

import { onMounted } from "vue";
import { useScheduleStore } from "~/stores/schedule"; // adjust path as needed
const scheduleStore = useScheduleStore();
const { idleSubject } = storeToRefs(scheduleStore);
import { useCashStore } from "/stores/cash";
const cashStore = useCashStore();

const getCashLog = async () => {
  await cashStore.getCashLog();
  console.log("CASH STORE DATA : ", cashStore.cashLogData);
};

const cashIcon = (type) => {
  return type == "expense" ? ArrowUpRightIcon : ArrowDownRightIcon;
};

// Data for activities
const activities = [
  {
    title: "New teacher registered",
    time: "2h ago",
    desc: "lorem ipsum dolor site amet",
  },
  {
    title: "Task completed",
    time: "4h ago",
    desc: "lorem ipsum dolor site amet",
  },
  {
    title: "Schedule updated",
    time: "6h ago",
    desc: "lorem ipsum dolor site amet",
  },
];

// Data for schedules
const schedules = [
  {
    subject: "Mathematics",
    time: "09:00 AM - 10:30 AM",
    grade: "Grade 10",
    color: "bg-purple-500",
    gradeClass: "text-purple-500",
    icon: AcademicCapIcon,
  },
  {
    subject: "Physics Lab",
    time: "11:00 AM - 12:30 PM",
    grade: "Grade 11",
    color: "bg-blue-500",
    gradeClass: "text-blue-500",
    icon: ClipboardDocumentListIcon,
  },
  {
    subject: "Chemistry",
    time: "02:00 PM - 03:30 PM",
    grade: "Grade 12",
    color: "bg-green-500",
    gradeClass: "text-green-500",
    icon: AcademicCapIcon,
  },
];

const icons = {
  BookOpenIcon: BookOpenIcon,
  CalculatorIcon: CalculatorIcon,
  BeakerIcon: BeakerIcon,
  CircleStackIcon: CircleStackIcon,
  GlobeAltIcon: GlobeAltIcon,
  ComputerDesktopIcon: ComputerDesktopIcon,
};
// Map `subject.icon` to the actual icon component
const iconComponent = (iconName) => {
  return icons[iconName] || BookOpenIcon; // Default to BookOpenIcon if not found
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

onMounted(async () => {
  await getCashLog();
  await getScheduleSubject();
});

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

function formatToIDR(amount) {
  return (
    "Rp " +
    (isNaN(amount)
      ? 0
      : amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
  );
}

async function getScheduleSubject() {
  await scheduleStore.GetClassNowSubjectSchedule();
}
</script>

<style scoped>
/* Customize styles here if needed */
</style>
