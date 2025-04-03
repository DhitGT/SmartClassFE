<template>
  <div
    class="container min-h-screen pb-12 flex flex-col gap-4 mx-auto rounded-lg"
  >
    <div class="bg-white rounded-lg shadow-md">
      <div
        class="flex flex-col md:flex-row justify-between items-center p-4 rounded-lg"
      >
        <div class="items-center flex-col md:flex-row flex gap-4 min-w-full">
          <input
            type="text"
            v-model="search"
            placeholder="Search Tasks..."
            class="md:hidden input input-bordered w-full border bg-white border-gray-300 rounded-md p-2"
            @input="debouncedSearch"
          />
          <div class="flex w-full gap-4">
            <div class="flex items-center w-full md:w-fit justify-start gap-4">
              <input
                type="text"
                v-model="search"
                placeholder="Search Tasks..."
                class="hidden md:block input input-bordered w-full border bg-white border-gray-300 rounded-md p-2"
                @input="debouncedSearch"
              />
              <select
                v-model="selectedSubject"
                class="select w-full border border-gray-300 bg-white rounded-md p-2"
                @change="handleSubjectFilter"
              >
                <option value="0" selected>All Subjects</option>
                <option
                  v-for="subject in subjectStore?.data?.subject"
                  :key="subject.id"
                  :value="subject.id"
                >
                  {{ subject.name }}
                </option>
              </select>
            </div>
            <div class="md:ms-auto min-w-fit">
              <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">
                <div
                  @click="toggleModal"
                  class="flex items-center justify-center gap-1"
                >
                  <PlusIcon class="text-white w-6 h-6" />
                  <span class="hidden md:block"> Add New task </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DashboardFormTask
      v-if="showModal"
      @submit="handleSubmit"
      @close="showModal = false"
    />
    <DashboardTaskKanban  />
  </div>
</template>

<script setup>
import { DashboardFormTask, DashboardTaskKanban } from "#components";
import { PlusIcon } from "@heroicons/vue/24/outline";
import { ref, onMounted, watch } from "vue";
import { useTaskStore } from "../../stores/task";
import { useSubjectStore } from "../../stores/subject";
import { debounce } from "lodash"; // Import lodash for debouncing

const showModal = ref(false);
const selectedSubject = ref("0");
const search = ref("");
const tasks = ref([]);
const taskStore = useTaskStore();
const subjectStore = useSubjectStore();

// Fetch subjects when the component is mounted
onMounted(async () => {
  await subjectStore.getSubject();
  await fetchTasks(); // Initial fetch of tasks
});

// Function to fetch tasks based on search and selected subject
const fetchTasks = async () => {
  tasks.value = await taskStore.getTask(search.value, selectedSubject.value);
};

// Debounced function to handle search input
const debouncedSearch = debounce(() => {
  fetchTasks();
}, 300); // Adjust the debounce delay as needed

// Watch for changes in selectedSubject and search to fetch tasks
watch([selectedSubject], () => {
  fetchTasks();
});

const handleSubmit = async (formData) => {
  console.log("New task Data:", formData);
  await taskStore.addTask(formData);
  showModal.value = false;
  await fetchTasks(); // Refresh tasks after adding a new one
};

const toggleModal = () => {
  showModal.value = !showModal.value;
};

definePageMeta({
  layout: "dashboard",
});
</script>
