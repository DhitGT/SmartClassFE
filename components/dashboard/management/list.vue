<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Management</h2>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <DashboardManagementCard
        title="Teachers"
        description="Manage faculty"
        cardhref="teachers"
        icon="UserGroupIcon"
      />
      <DashboardManagementCard
        title="Members"
        description="Student records"
        cardhref="userManagement"
        icon="UsersIcon"
      />
      <DashboardManagementCard
        title="Cash"
        description="Financial records"
        cardhref="cash"
        icon="BanknotesIcon"
      />
      <DashboardManagementCard
        title="Schedule"
        description="Class timetable"
        cardhref="schedule"
        icon="CalendarIcon"
      />
      <DashboardManagementCard
        title="Subjects"
        description="Course content"
        cardhref="subjects"
        icon="BookOpenIcon"
      />
      <DashboardManagementCard
        title="Tasks"
        description="Assignments"
        cardhref="tasks"
        icon="ClipboardDocumentListIcon"
      />
    </div>
  </div>
</template>

<script setup>
import { DashboardManagementCard } from "#components";
</script>

<style scoped>
/* Optional styles here */
</style>
