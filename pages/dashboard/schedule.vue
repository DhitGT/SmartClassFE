<template>
  <div
    class="container min-h-screen pb-12 flex flex-col gap-2 md:gap-4 mx-auto rounded-lg"
  >
    <p class="text-lg font-bold">Subject Schedule</p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full justify-evenly"
    >
      <DashboardScheduleSubjectCardDay
        :subjects="getSubjectsByDay(1)"
        :dayName="'Monday'"
        :dayNum="'1'"
        @delete="handleDelete"
        @refresh="refreshApi"
      />

      <DashboardScheduleSubjectCardDay
        :subjects="getSubjectsByDay(2)"
        :dayName="'Tuesday'"
        :dayNum="'2'"
        @delete="handleDelete"
        @refresh="refreshApi"
        :isToday="true"
      />
      <DashboardScheduleSubjectCardDay
        :subjects="getSubjectsByDay(3)"
        :dayName="'Wednesday'"
        :dayNum="'3'"
        @delete="handleDelete"
        @refresh="refreshApi"
      />
      <DashboardScheduleSubjectCardDay
        :subjects="getSubjectsByDay(4)"
        :dayName="'Thursday'"
        :dayNum="'4'"
        @delete="handleDelete"
        @refresh="refreshApi"
      />
      <DashboardScheduleSubjectCardDay
        :subjects="getSubjectsByDay(5)"
        :dayName="'Friday'"
        :dayNum="'5'"
        @delete="handleDelete"
        @refresh="refreshApi"
      />
      <DashboardScheduleSubjectCardDay
        :subjects="getSubjectsByDay(6)"
        :dayName="'Saturday'"
        :dayNum="'6'"
        @delete="handleDelete"
        @refresh="refreshApi"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useScheduleStore } from "~/stores/schedule"; // adjust path as needed
import { storeToRefs } from "pinia";

const scheduleStore = useScheduleStore();
const subjects = ref("");

const GetIdleSubject = async () => {
  await scheduleStore.GetIdleSubject();
  console.log("IDLE SUBJECT:", scheduleStore.idleSubject);
};

const getSubjectsByDay = (dayNum) => {
  console.log(
    "Subject BY day  ",
    dayNum,
    " : ",
    scheduleStore?.scheduleSubject
      .filter((item) => item.day === String(dayNum))
      .flatMap((item) => item.subject)
  );
  return scheduleStore?.scheduleSubject
    .filter((item) => item.day === String(dayNum))
    .flatMap((item) => item.subject);
};

const GetClassSubjectSchedule = async () => {
  await scheduleStore.GetClassSubjectSchedule();
  // scheduleStore.scheduleSubject
  console.log("IDLE SUBJECT:", scheduleStore.scheduleSubject);
};

const handleDelete = async (schedule_id) => {
  const formData = new FormData();
  formData.append("id", schedule_id);

  await scheduleStore.RemoveSchedule(formData);
  await refreshApi();
};

const refreshApi = async () => {
  await GetIdleSubject();
  await GetClassSubjectSchedule();
};

onMounted(async () => {
  await GetIdleSubject();
  await GetClassSubjectSchedule();
});

definePageMeta({
  layout: "dashboard",
});
</script>
