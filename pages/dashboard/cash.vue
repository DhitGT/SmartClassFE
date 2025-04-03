<template>
  <div
    class="container min-h-screen pb-12 flex flex-col gap-2 md:gap-4 mx-auto rounded-lg"
  >
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
      <DashboardCashCard
        title="Curent Cash"
        :amount="formatToIDR(cashStore?.data?.total_cash)"
        subtitle="Cash Balance"
        icon="CurrencyDollarIcon"
        :iconColor="'yellow'"
        class=""
      />
      <DashboardCashCard
        title="Revenue"
        :amount="formatToIDR(cashStore?.data?.total_revenue)"
        :subtitle="`${cashStore?.data?.percentage_arrow} ${cashStore?.data?.percentage_change} this month`"
        :iconColor="'blue'"
        icon="CurrencyDollarIcon"
      />
      <DashboardCashCard
        title="Pending Payments"
        :amount="formatToIDR(cashStore?.data?.total_pending_payment)"
        :subtitle="`${cashStore?.data?.pending_members_count} Member`"
        icon="ClockIcon"
        :iconColor="'red'"
        />
        <DashboardCashCard
        title="Completed Payments"
        :amount="formatToIDR(cashStore?.data?.total_completed_payment)"
        :subtitle="`${cashStore?.data?.completed_members_count} Member`"
        icon="CheckCircleIcon"
        class=""
        :iconColor="'green'"
      />
    </div>
    <DashboardCashTransactionTable />
    <!-- <DashboardCashTransactionList class="md:hidden" /> -->
    <DashboardCashHistory />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  PlusIcon,
  UserIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";

import { useCashStore } from "/stores/cash";
const cashStore = useCashStore();

const getCashLog = async () => {
  await cashStore.getCashLog();
  console.log("CASH STORE DATA : ", cashStore.cashLogData);
};
const getClassCashSummary = async () => {
  await cashStore.getClassCashSummary();
  console.log("CASH STORE DATA : ", cashStore.data);
};
const listPembayaranPerBulan = async () => {
  await cashStore.listPembayaranPerBulan();
  console.log("CASH STORE DATA : ", cashStore.data);
};

onMounted(() => {
  getClassCashSummary();
  getCashLog();
  listPembayaranPerBulan();
});

definePageMeta({
  layout: "dashboard",
});

function formatToIDR(amount) {
  // Ensure the input is a number
  if (isNaN(amount)) {
    // throw new Error("Input must be a valid number");
    return 0
  }

  // Convert the amount to a string and format it
  return "Rp "+ amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") ;
}
</script>

<style scoped>
/* No additional styles needed */
</style>
