<template>
  <div class="container min-h-screen flex flex-col gap-4 mx-auto rounded-lg">
    <!-- Search & Filter -->
    <input
      type="text"
      v-model="search"
      placeholder="Search teachers..."
      class="md:hidden block input input-bordered w-full border bg-white border-gray-300 rounded-md p-2"
      @input="debouncedSearch"
    />
    <div class="flex justify-between gap-4">
      <div class="flex items-center w-full md:w-fit justify-start gap-4">
        <input
          type="text" 
          v-model="search"
          placeholder="Search teachers..."
          class="hidden md:block input input-bordered w-full border bg-white border-gray-300 rounded-md p-2"
          @input="debouncedSearch"
        />
        <!-- <select
          v-model="subject"
          class="select w-full border border-gray-300 bg-white rounded-md p-2"
          @change="handleSubjectFilter(subject)"
        >
          <option value="">All Subjects</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="History">History</option>
        </select> -->
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
        <span class="hidden md:block"> Add New Teacher </span>
      </button>
      <DashboardFormTeacher
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
              Teacher
            </th>
            <th class="px-4 text-start text-gray-500 py-2">Subject</th>
            <th class="px-4 text-start text-gray-500 py-2">Joined Date</th>
            <th class="px-4 text-start text-gray-500 py-2 rounded-t-xl">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="teacher in teachers"
            :key="teacher.id"
            class="bg-white border-y-1 border-gray-200 hover:bg-gray-50"
          >
            <td class="px-4 py-2 flex items-center gap-2">
              <img
                :src="teacher.avatar ? `${useRuntimeConfig().public.apiBaseUrl}/storage/${teacher.avatar}`: 'https://placehold.co/300'"
                class="h-10 w-10 object-cover rounded-full"
              />
              <div class="leading-5">
                <span class="font-semibold">{{ teacher.name }}</span>
              </div>
            </td>
            <td class="px-4 py-2">{{ teacher.subject ? teacher.subject.name : 'Not assigned' }}</td>
            <td class="px-4 py-2">{{ formatDate(teacher.created_at) }}</td>

            <td class="px-4 py-2 flex gap-2">
              <DashboardFormEditTeacherForm
                @update="updateTeacherAction"
                :teacher="teacher"
              />
              <ReusableDeleteButton @delete="deleteTeacherAction(teacher)" />
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
            {{ Math.min(page * pageSize, teacherStore.data.teachers?.total) }} of
            {{ teacherStore.data.teachers?.total }} entries
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
      <DashboardTeacherCard
        v-for="teacher in teachers"
        :key="teacher.id"
        :name="teacher.name"
        :subject="teacher.subject ? teacher.subject.name : 'Not assigned'"
        :date="formatDate(teacher.created_at)"
        :avatar="teacher.avatar"
        :icon="teacher.subject?.icon"
        :teacher="teacher"
        @update="updateTeacherAction"
        @delete="deleteTeacherAction(teacher)"
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
import { DashboardFormTeacher, ReusableDeleteButton } from "#components";
import { useTeacherStore } from "~/stores/teacher";

const teacherStore = useTeacherStore();
const route = useRoute();
const search = ref("");
const page = ref(1);
const subject = ref("");
const menuOpen = ref(false);
const showModal = ref(false);
const teachers = ref([]);
const totalPages = ref(1);
const pageSize = ref(10); // Default page size
const currentClass = ref({});

const userType = computed(() => route.query.is || "default");

const handleSubmit = async (formData) => {
  console.log("New Teacher Data:", formData);
  // toast.success('Success Add New Teacher');
  await teacherStore.addTeacher(formData);
  showModal.value = false;
  await getTeachers();
};

const setPage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    page.value = newPage;
    getTeachers();
  }
};

const handleSearch = () => {
  page.value = 1; // Reset to first page when searching
  getTeachers();
};

const handleSubjectFilter = (selectedSubject) => {
  subject.value = selectedSubject;
  page.value = 1; // Reset to first page when filtering
  getTeachers();
};

const clearFilters = () => {
  search.value = "";
  subject.value = "";
  page.value = 1;
  getTeachers();
};

const deleteTeacherAction = async (teacher) => {
  console.log("Deleting teacher:", teacher);
  const formData = new FormData();
  formData.append('id',teacher.id)
  await teacherStore.deleteTeacher(formData);
  await getTeachers();
};

const updateTeacherAction = async (teacher) => {
  let formData = new FormData()
  formData.append('id', teacher.id)
  formData.append('name', teacher.name)
  formData.append('subject_id', teacher.subject_id)
  if(teacher.avatar){
    formData.append('avatar', teacher.avatar)
  }
  
  await teacherStore.editTeacher(formData);
  showModal.value = false;
  await getTeachers();
  console.log("Updating teacher:", teacher);
};

const getTeachers = async () => {
  console.log("search val : ", search.value);
  await teacherStore.getTeacher(
    search.value,
    subject.value,
    page.value,
    pageSize.value
  );
  teachers.value = teacherStore.data.teachers.data || []; // Ensure reactivity
  currentClass.value = teacherStore.data.class || {};
  totalPages.value = teacherStore.data.teachers.last_page || 1;
  console.log("Updated teachers:", teachers.value);
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
  getTeachers();
}, 500);

// Watch for changes in search input
watch(search, () => {
  debouncedSearch();
});

// Watch for changes in subject filter
watch(subject, () => {
  page.value = 1; // Reset to first page when filter changes
  getTeachers();
});

onMounted(() => {
  getTeachers();
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
  getTeachers();
};

definePageMeta({
  layout: "dashboard",
});
</script>