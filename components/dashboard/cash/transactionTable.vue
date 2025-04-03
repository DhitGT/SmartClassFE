<template>
  <div class="container mx-auto bg-white rounded-lg shadow-md p-4">
    <!-- Header Section -->
    <div class="flex items-center gap-4">
      <span class="text-lg md:text-xl font-bold">{{
        cashStore?.dataPerBulan?.month
      }}</span>
      <span class="text-lg md:text-xl font-bold">{{ selectedYear }}</span>
    </div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-sm md:text-lg font-semibold">Recent Transactions</h2>
      <div class="flex space-x-2">
        <button
          @click="showFilterModal = true"
          class="bg-gray-200 text-base px-4 py-2 rounded-lg"
        >
          <div
            class="flex items-center text-xs md:text-base justify-center gap-1"
          >
            <component :is="FunnelIcon" class="text-gray-800 w-4 h-4" />
            Filter
          </div>
        </button>
        <button
          @click="showModal = true"
          class="btn btn-primary rounded-lg flex items-center bg-blue-500 text-white px-4 hover:bg-blue-600"
        >
          <PlusIcon class="h-4 w-4 md:mr-2" />
          <span class="hidden md:block"> New Transaction </span>
        </button>
        <DashboardFormCash
          v-if="showModal"
          @submit="handleSubmit"
          @close="showModal = false"
        />
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="overflow-x-auto">
      <table class="table-auto w-full bg-white rounded-t-xl shadow-sm">
        <thead>
          <tr class="bg-white text-start">
            <th class="px-4 text-start text-gray-500 py-2 md:text-base text-sm">
              Name
            </th>
            <th class="px-4 text-start text-gray-500 py-2 md:text-base text-sm">
              Week 1
            </th>
            <th class="px-4 text-start text-gray-500 py-2 md:text-base text-sm">
              Week 2
            </th>
            <th class="px-4 text-start text-gray-500 py-2 md:text-base text-sm">
              Week 3
            </th>
            <th class="px-4 text-start text-gray-500 py-2 md:text-base text-sm">
              Week 4
            </th>
            <th class="px-4 text-start text-gray-500 py-2 md:text-base text-sm">
              Total
            </th>
            <th class="px-4 text-start text-gray-500 py-2 md:text-base text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in cashStore?.dataPerBulan?.data"
            :key="item.id"
            class="bg-white border-y-1 border-gray-200 hover:bg-gray-50"
          >
            <td class="px-4 py-2 flex items-center gap-2">
              <img
                :src="
                  item.avatar
                    ? `${useRuntimeConfig().public.apiBaseUrl}/storage/${
                        item.avatar
                      }`
                    : 'https://placehold.co/300'
                "
                class="h-5 w-5 md:h-10 md:w-10 object-cover rounded-full"
              />
              <div class="leading-5">
                <span class="font-semibold md:text-base text-sm">{{
                  item.nama
                }}</span>
              </div>
            </td>
            <td class="py-2 px-4 md:text-base text-xs">
              {{ item.pembayaran.minggu_1.nominal }}
            </td>
            <td class="py-2 px-4 md:text-base text-xs">
              {{ item.pembayaran.minggu_2.nominal }}
            </td>
            <td class="py-2 px-4 md:text-base text-xs">
              {{ item.pembayaran.minggu_3.nominal }}
            </td>
            <td class="py-2 px-4 md:text-base text-xs">
              {{ item.pembayaran.minggu_4.nominal }}
            </td>
            <td class="py-2 px-4 md:text-base text-xs">
              {{ formatToIDR(item.total_pembayaran) }}
            </td>
            <td class="py-2 px-4 md:text-base text-xs">
              <!-- <button
                @click="handleAction(item.id)"
                class="text-blue-500 hover:text-blue-700"
              >
                <PencilIcon class="w-5 h-5 inline" />
              </button> -->
              <DashboardFormEditCashForm
                @update="updateCashAction"
                :member="item"
                :type="'pc'"
                class="hover:bg-gray-100 rounded-lg p-2 cursor-pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Filter Modal -->
  <div
    v-if="showFilterModal"
    class="fixed inset-0 flex items-center justify-center bg-[#00000025] bg-opacity-50"
  >
    <div class="bg-white w-xs sm:w-sm md:min-w-md p-6 rounded-lg shadow-lg">
      <h3 class="text-lg font-semibold mb-4">Filter Transactions</h3>
      <div class="mb-4">
        <label class="block text-gray-600">Select Month & Year</label>
        <input
          type="month"
          v-model="selectedDate"
          class="border p-2 w-full rounded-md"
          :max="maxDate"
        />
      </div>
      <div class="flex justify-end gap-2">
        <button
          @click="applyFilter"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Apply
        </button>
        <button
          @click="showFilterModal = false"
          class="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCashStore } from "/stores/cash";
import { useUserStore } from "/stores/user";
import { FunnelIcon, PlusIcon, PencilIcon } from "@heroicons/vue/24/outline";

const showModal = ref(false);
const showFilterModal = ref(false);
const cashStore = useCashStore();
const userStore = useUserStore();
const selectedDate = ref(new Date().toISOString().slice(0, 7));
const maxDate = computed(() => new Date().toISOString().slice(0, 7));
const selectedYear = computed(() => parseInt(selectedDate.value.split("-")[0]));
const selectedMonth = computed(() =>
  parseInt(selectedDate.value.split("-")[1])
);

async function handleSubmit(payload) {
  showModal.value = false;
  await cashStore.addCash(payload);
  await userStore.getMember();
  await cashStore.listPembayaranPerBulan({year: selectedYear.value,
    month: selectedMonth.value,});
  await cashStore.getCashLog({year: selectedYear.value,
    month: selectedMonth.value,});
  await cashStore.getClassCashSummary({year: selectedYear.value,
    month: selectedMonth.value,});
}

function formatToIDR(amount) {
  return (
    "Rp " +
    (isNaN(amount)
      ? 0
      : amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
  );
}

const handleAction = (id) => {
  console.log(`Edit item with id: ${id}`);
};

const updateCashAction = async (member) => {
  const formData = new FormData();

  formData.append("id", member.id);
  formData.append("month", selectedMonth.value);
  formData.append("year", selectedYear.value);
  formData.append("minggu_1", member.pembayaran.minggu_1.nominal);
  formData.append("minggu_2", member.pembayaran.minggu_2.nominal);
  formData.append("minggu_3", member.pembayaran.minggu_3.nominal);
  formData.append("minggu_4", member.pembayaran.minggu_4.nominal);

  console.log("update woi , ", formData);
  await cashStore.updateCash(formData);
  await cashStore.listPembayaranPerBulan({
    year: selectedYear.value,
    month: selectedMonth.value,
  });
  await cashStore.getClassCashSummary({
    year: selectedYear.value,
    month: selectedMonth.value,
  });
  await cashStore.getCashLog({year: selectedYear.value,
    month: selectedMonth.value,});
  await userStore.getMember();
};

async function applyFilter() {

  userStore.filterMonth = selectedMonth
  userStore.filterYear = selectedYear

  showFilterModal.value = false;
  await cashStore.listPembayaranPerBulan({
    year: selectedYear.value,
    month: selectedMonth.value,
  });
  await cashStore.getClassCashSummary({
    year: selectedYear.value,
    month: selectedMonth.value,
  });
  await cashStore.getCashLog({
    year: selectedYear.value,
    month: selectedMonth.value,
  });
  await userStore.getMember();
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
