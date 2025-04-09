<template>
  <div class="container min-h-screen flex flex-col gap-4 mx-auto rounded-lg">
    <!-- Search & Filter -->
    <input
      type="text"
      v-model="search"
      placeholder="Search users..."
      class="md:hidden block input input-bordered w-full border bg-white border-gray-300 rounded-md p-2"
      @input="debouncedSearch"
    />
    <div class="flex justify-between gap-4">
      <div class="flex items-center w-full md:w-fit justify-start gap-4">
        <input
          type="text"
          v-model="search"
          placeholder="Search users..."
          class="hidden md:block input input-bordered w-full border bg-white border-gray-300 rounded-md p-2"
          @input="debouncedSearch"
        />
        <select
          v-model="role"
          class="select w-full border border-gray-300 bg-white rounded-md p-2"
          @change="handleRoleFilter(role)"
        >
          <option value="">All</option>
          <option value="Secretary">Secretary</option>
          <option value="Treasurer">Treasurer</option>
          <option value="Member">Member</option>
        </select>
      </div>
      <select
        v-model="pageSize"
        @change="changePageSize(pageSize)"
        class="border md:hidden border-gray-300 rounded-md p-1 text-sm"
      >
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="25">25</option>
        <option :value="100">100</option>
      </select>
      <button
        @click="showModal = true"
        class="btn btn-primary rounded-lg flex items-center bg-blue-500 text-white px-4 hover:bg-blue-600"
      >
        <PlusIcon class="h-4 w-4 md:mr-2" />
        <span class="hidden md:block"> Add New User </span>
      </button>
      <DashboardFormMember
        v-if="showModal"
        @submit="handleSubmit"
        @close="showModal = false"
      />
    </div>

    <!-- Table -->
    <div class="hidden md:block">
      <table class="table-auto w-full bg-white rounded-t-xl shadow-sm">
        <thead>
          <tr class="bg-white text-start">
            <th class="px-4 text-start text-gray-500 py-2 rounded-t-xl">
              User
            </th>
            <th class="px-4 text-start text-gray-500 py-2">Role</th>
            <th class="px-4 text-start text-gray-500 py-2">Joined Date</th>
            <th class="px-4 text-start text-gray-500 py-2">Password</th>
            <th class="px-4 text-start text-gray-500 py-2 rounded-t-xl">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="member in members"
            :key="member.user.email"
            class="bg-white border-y-1 border-gray-200 hover:bg-gray-50"
          >
            <td class="px-4 py-2 flex items-center gap-2">
              <img
                :src="member.user.avatar ? `${useRuntimeConfig().public.apiBaseUrl}/storage/${member.user.avatar}`: 'https://placehold.co/300'"
                class="h-10 w-10 object-cover rounded-full"
              />
              <div class="leading-5">
                <span class="font-semibold">{{ member.user.name }}</span
                ><br />
                <span class="text-sm text-gray-500">{{
                  member.user.email
                }}</span>
              </div>
            </td>
            <td class="px-4 py-2">{{ member.user.role }}</td>
            <td class="px-4 py-2">{{ formatDate(member.user.created_at) }}</td>
            <td class="px-4 py-2">{{ member.access_code }}</td>

            <td class="px-4 py-2 flex gap-2">
              <DashboardFormEditMemberForm
                @update="updateMemberAction"
                :member="member"
              />
              <ReusableDeleteButton @delete="deleteMemberAction(member)" />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="flex p-4 min-w-full bg-white shadow-md rounded-b-xl justify-between items-center"
      >
        <div class="flex items-center gap-4">
          <p class="text-sm">
            Showing {{ (page - 1) * pageSize + 1 }} to
            {{ Math.min(page * pageSize, userStore.totalMembers) }} of
            {{ userStore.totalMembers }} entries
          </p>
          <select
            v-model="pageSize"
            @change="changePageSize(pageSize)"
            class="border border-gray-300 rounded-md p-1 text-sm"
          >
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="100">100</option>
          </select>
        </div>
        <nav class="flex space-x-2">
          <button
            class="btn btn-secondary text-black px-4 py-2 hover:bg-gray-100 cursor-pointer border-1 border-gray-300 rounded-lg"
            @click="setPage(page - 1)"
            :disabled="page === 1"
            :class="{ 'opacity-50': page === 1 }"
          >
            Previous
          </button>
          <button
            v-for="pageNum in getPageNumbers()"
            :key="pageNum"
            @click="pageNum !== '...' && setPage(pageNum)"
            class="btn px-3 py-1 rounded-md"
            :class="
              pageNum === page
                ? 'bg-blue-500 text-white'
                : 'border border-gray-300'
            "
            :disabled="pageNum === '...'"
          >
            {{ pageNum }}
          </button>
          <button
            class="btn btn-secondary text-black px-4 py-2 hover:bg-gray-100 cursor-pointer border-1 border-gray-300 rounded-lg"
            @click="setPage(page + 1)"
            :disabled="page === totalPages"
            :class="{ 'opacity-50': page === totalPages }"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
    <div class="md:hidden flex flex-col gap-4">
      <DashboardUserCard
        v-for="member in members"
        :key="member.user.email"
        :name="member.user.name"
        :email="member.user.email"
        :access_code="member.access_code"
        :date="formatDate(member.user.created_at)"
        :badge="{ name: member.user.role, color: 'red' }"
        :member="member"
        @update="updateMemberAction"
        @delete="deleteMemberAction(member)"
      />

      <!-- Mobile Pagination -->
      <div
        class="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm"
      >
        <button
          class="btn btn-secondary text-black px-4 py-2 hover:bg-gray-100 cursor-pointer border-1 border-gray-300 rounded-lg"
          @click="setPage(page - 1)"
          :disabled="page === 1"
          :class="{ 'opacity-50': page === 1 }"
        >
          Previous
        </button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button
          class="btn btn-secondary text-black px-4 py-2 hover:bg-gray-100 cursor-pointer border-1 border-gray-300 rounded-lg"
          @click="setPage(page + 1)"
          :disabled="page === totalPages"
          :class="{ 'opacity-50': page === totalPages }"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";
import { DashboardFormMember, ReusableDeleteButton } from "#components";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const route = useRoute();
const search = ref("");
const page = ref(1);
const role = ref("");
const menuOpen = ref(false);
const selectedCategory = ref("Teachers");
const showModal = ref(false);
const members = ref([]);
const totalPages = ref(1);
const pageSize = ref(10); // Default page size

const userType = computed(() => route.query.is || "default");

const handleSubmit = async (formData) => {
  console.log("New Member Data:", formData);
  // toast.success('Success Add New Member');
  await userStore.addMember(formData);
  showModal.value = false;
  await getMember();
};

const setPage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    page.value = newPage;
    getMember();
  }
};

const handleSearch = () => {
  page.value = 1; // Reset to first page when searching
  getMember();
};

const handleRoleFilter = (selectedRole) => {
  role.value = selectedRole;
  page.value = 1; // Reset to first page when filtering
  getMember();
};

const clearFilters = () => {
  search.value = "";
  role.value = "";
  page.value = 1;
  getMember();
};

const deleteMemberAction = async (member) => {
  console.log("Deleting member:", member);

  const formData = { member_id: member.id, user_id: member.user.id };

  await userStore.deleteMember(formData);
  await getMember();
};

const updateMemberAction = async (member) => {
  let formData = new FormData()
  formData.append('id',member.id)
  formData.append('name',member.user.name)
  formData.append('email',member.user.email)
  formData.append('role',member.user.role)
  formData.append('access_code',member.access_code)

  if(member.avatar){
    formData.append('avatar',member.avatar)
  }

  // let formDatas = {
  //   id: member.id,
  //   name: member.user.name,
  //   email: member.user.email,
  //   role: member.user.role,
  //   access_code: member.access_code,
  // };
  await userStore.editMember(formData);
  showModal.value = false;
  await getMember();
  console.log("Updating member:", member);
};

const getMember = async () => {
  console.log("search val : ", search.value);
  await userStore.getMember(
    search.value,
    role.value,
    page.value,
    pageSize.value
  );
  members.value = userStore.members; // Ensure reactivity
  totalPages.value = userStore.pagination.last_page;
  console.log("Updated members:", members.value);
};

// Debounce function to prevent excessive API calls during typing
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

// Apply debounce to search
const debouncedSearch = debounce(() => {
  page.value = 1; // Reset to first page when search changes
  getMember();
}, 500);

// Watch for changes in search input
watch(search, () => {
  debouncedSearch();
});

// Watch for changes in role filter
watch(role, () => {
  page.value = 1; // Reset to first page when filter changes
  getMember();
});

onMounted(() => {
  getMember();
});

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

// Pagination helpers
const getPageNumbers = () => {
  const pages = [];
  const maxVisiblePages = 5;

  if (totalPages.value <= maxVisiblePages) {
    // Show all pages if there are few pages
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // Show limited pages with ellipsis for many pages
    if (page.value <= 3) {
      // Beginning of pagination
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages.value);
    } else if (page.value >= totalPages.value - 2) {
      // End of pagination
      pages.push(1);
      pages.push("...");
      for (let i = totalPages.value - 3; i <= totalPages.value; i++) {
        pages.push(i);
      }
    } else {
      // Middle of pagination
      pages.push(1);
      pages.push("...");
      pages.push(page.value - 1);
      pages.push(page.value);
      pages.push(page.value + 1);
      pages.push("...");
      pages.push(totalPages.value);
    }
  }

  return pages;
};

// Change page size
const changePageSize = (size) => {
  pageSize.value = size;
  page.value = 1; // Reset to first page
  getMember();
};

definePageMeta({
  layout: "dashboard",
});
</script>
