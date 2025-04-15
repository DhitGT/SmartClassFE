<script setup>
import { ref, defineEmits,onMounted } from "vue";
import { CalendarIcon, ClockIcon } from "@heroicons/vue/24/outline";
const { $checkRole } = useNuxtApp()

const name = ref("");
const description = ref("");
const dueDate = ref("");
const selectedSubject = ref(null);
const status = ref("ToDo");
const isDropdownOpen = ref(false);
const files = ref([]);

import { useSubjectStore } from "~/stores/subject";

const subjectStore = useSubjectStore();
const subjects = ref("");

onMounted(async () => {
  await subjectStore.getSubject();
  subjects.value = subjectStore.data.subject
});

// This would typically come from an API call
// const subjects = [
//   { id: "sub1", name: "Mathematics" },
//   { id: "sub2", name: "Science" },
//   { id: "sub3", name: "Literature" },
//   { id: "sub4", name: "Computer Science" },
//   { id: "sub5", name: "Geography" },
// ];

const statusOptions = [
  { value: "ToDo", label: "To Do" },
  { value: "InProgress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
];

const emit = defineEmits(["submit", "close"]);

const selectSubject = (subject) => {
  selectedSubject.value = subject;
  isDropdownOpen.value = false;
};

const handleFileChange = (event) => {
  const selectedFiles = event.target.files;
  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    if (file.size > 5 * 1024 * 1024) {
      alert(`File ${file.name} is too large. Maximum file size is 5MB.`);
      return;
    }
    if (!file.type.match("image.*") && file.type !== "application/pdf") {
      alert(
        `File ${file.name} is not supported. Only images and PDFs are allowed.`
      );
      return;
    }
    files.value.push(file);
  }
};

const submitForm = () => {
  if (
    !name.value ||
    !description.value ||
    !dueDate.value ||
    !selectedSubject.value
  ) {
    alert("Name, description, due date, and subject are required!");
    return;
  }

  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("description", description.value);
  formData.append("due_to", dueDate.value);
  formData.append("subject_id", selectedSubject.value.id);
  formData.append("status", status.value);
  formData.append("class_id", "class1"); // class_id would typically come from the current context or be set by the parent component

  files.value.forEach((file, index) => {
    formData.append(`files[${index}]`, file);
  });

  emit("submit", formData);
};
</script>

<template>
  <div v-if="$checkRole(['Leader','Secretary'])" class="fixed inset-0 flex items-center justify-center bg-[#00000025]">
    <div class="bg-white mt-6 p-6 rounded-lg shadow-md w-xs sm:w-sm md:min-w-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-700">Add New Task</h2>
        <button
          @click="emit('close')"
          class="text-gray-500 hover:text-gray-700"
        >
          X
        </button>
      </div>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block text-gray-600">Task Name</label>
          <input
            type="text"
            v-model="name"
            placeholder="Enter task name"
            class="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label class="block text-gray-600">Description</label>
          <textarea
            v-model="description"
            placeholder="Enter description"
            class="w-full p-2 border rounded-md h-24"
          ></textarea>
        </div>

        <div>
          <label class="block text-gray-600">Due Date</label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <CalendarIcon class="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="date"
              v-model="dueDate"
              class="w-full p-2 pl-10 border rounded-md"
            />
          </div>
        </div>

        <!-- Subject Dropdown -->
        <div class="relative">
          <label class="block text-gray-600">Subject</label>
          <div
            class="w-full p-2 border rounded-md flex items-center justify-between cursor-pointer"
            @click="isDropdownOpen = !isDropdownOpen"
          >
            <span v-if="selectedSubject">{{ selectedSubject.name }}</span>
            <span v-else class="text-gray-400">Select a subject</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div
            v-if="isDropdownOpen"
            class="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg"
          >
            <ul class="max-h-40 overflow-auto">
              <li
                v-for="subject in subjects"
                :key="subject.id"
                @click="selectSubject(subject)"
                class="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {{ subject.name }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Status Selection -->
        <div>
          <label class="block text-gray-600">Status</label>
          <select
            v-model="status"
            class="w-full p-2 border rounded-md bg-white"
          >
            <option
              v-for="option in statusOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- File Input -->
        <div>
          <label class="block text-gray-600"
            >Attachments (Images or PDFs, max 5MB each)</label
          >
          <input
            type="file"
            @change="handleFileChange"
            multiple
            accept="image/*,application/pdf"
            class="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  </div>
</template>
