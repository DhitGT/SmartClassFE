<template>
  <div class="container min-h-screen pb-12 flex flex-col gap-4 mx-auto rounded-lg">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 ">
      <DashboardCashCard
        title="Total Revenue"
        amount="$124,500"
        subtitle="↑ 8.4% this month"
        icon="CurrencyDollarIcon"
      />
      <DashboardCashCard
        title="Pending Payments"
        amount="$12,850"
        subtitle="15 transactions"
        icon="ClockIcon"
      />
      <DashboardCashCard
        title="Completed Payments"
        amount="$98,230"
        subtitle="243 transactions"
        icon="CheckCircleIcon"
        class="hidden md:block"
      />
      <DashboardCashCard
        title="Active Students"
        amount="485"
        subtitle="Paid this month"
        icon="UserIcon"
        class="hidden md:block"
      />
    </div>
    <DashboardCashTransactionTable class="hidden md:block" />
    <DashboardCashTransactionList class="md:hidden" />
    <DashboardCashHistory/>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  PlusIcon,
  UserIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";

definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
/* No additional styles needed */
</style>
