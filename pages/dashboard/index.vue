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

definePageMeta({
  layout: "dashboard",
});
</script>
<template>
  <!-- <DashboardSidebar/> -->

  <div class="flex flex-col gap-4  mb-[3rem]">
    <div class="flex containe justify-between md:gap-4 gap-4 max-w-sm md:max-w-full">
      <DashboardStatisticCard
        :icon="musicIcon"
        :count="24"
        title="Teachers"
        :percentage="'+2.5%'"
      />
      <DashboardStatisticCard
        :icon="studentsIcon"
        :count="485"
        title="Students"
        :percentage="'+12.3%'"
      />
      <DashboardStatisticCard
        :icon="subjectsIcon"
        :count="12"
        title="Subjects"
        class="hidden md:block"
        :percentage="'+1.8%'"
      />
      <DashboardStatisticCard
        :icon="revenueIcon"
        :count="($24, 500)"
        title="Revenue"
        class="hidden md:block"
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
