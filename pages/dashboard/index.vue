<script setup>
import {
  DashboardActivity,
  DashboardHeader,
  DashboardManagementList,
  DashboardRecentTask,
  DashboardSidebar,
  DashboardStatisticCard,
} from "#components";

import {
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";

const musicIcon = AcademicCapIcon;
const studentsIcon = UserGroupIcon;
const subjectsIcon = BookOpenIcon;
const revenueIcon = CurrencyDollarIcon;


import { useDashboardStore } from '~/stores/dashboard';
const dashboardStore = useDashboardStore();
const getCountData = async () => {
    await dashboardStore.getCountData()
    console.log("data ini : ",dashboardStore.data.data) 
};

onMounted(() => {
    getCountData()
});


definePageMeta({
  layout: "dashboard",
});
</script>
<template>
  <!-- <DashboardSidebar/> -->

  <div class="flex flex-col gap-4  mb-[3rem]">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-sm md:max-w-full">
      <DashboardStatisticCard
        :icon="musicIcon"
        :count="dashboardStore?.data?.data?.teachers"
        title="Teachers"
        :percentage="'+2.5%'"
      />
      <DashboardStatisticCard
        :icon="studentsIcon"
        :count="dashboardStore?.data?.data?.students"
        title="Students"
        :percentage="'+12.3%'"
      />
      <DashboardStatisticCard
        :icon="subjectsIcon"
        :count="dashboardStore?.data?.data?.subjects"
        title="Subjects"
      
        :percentage="'+1.8%'"
      />
      <DashboardStatisticCard
        :icon="revenueIcon"
        :count="(dashboardStore?.data?.data?.cash)"
        title="Cash"
      
        :percentage="'+8.4%'"
      />
    </div>
    <div class="md:hidden">
        <DashboardManagementList/>
    </div>
    <DashboardActivity />
    <DashboardRecentTask/>
  </div>
</template>
