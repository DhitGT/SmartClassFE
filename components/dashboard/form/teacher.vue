<script setup>
import { ref, defineEmits } from "vue";
import {
  UserIcon,
  XMarkIcon,
  PhotoIcon,
  BookOpenIcon,
} from "@heroicons/vue/24/solid";
const { $checkRole } = useNuxtApp();

const name = ref("");
const subject = ref("");
const avatar = ref(null);
const avatarPreview = ref("");
// const subjects = ['Mathematics', 'Science', 'History', 'English', 'Physics', 'Chemistry']; // Example subjects

const emit = defineEmits(["submit", "close"]);

import { onMounted } from "vue";
import { useSubjectStore } from "~/stores/subject";
const subjectStore = useSubjectStore();
const subjects = ref("");
onMounted(async () => {
  await subjectStore.getSubject();
  subjects.value = subjectStore.data.subject;
});

const submitForm = () => {
  if (!name.value || !subject.value) {
    alert("All fields are required!");
    return;
  }

  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("subject_id", subject.value);

  if (avatar.value) {
    formData.append("avatar", avatar.value);
  }

  emit("submit", formData);
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    avatar.value = file;
    avatarPreview.value = URL.createObjectURL(file);
  }
};

const removeAvatar = () => {
  avatar.value = null;
  avatarPreview.value = "";
  const fileInput = document.getElementById("avatar-input");
  if (fileInput) fileInput.value = "";
};
</script>

<template>
  <div
    v-if="$checkRole(['Leader', 'Secretary'])"
    class="fixed inset-0 flex items-center justify-center bg-[#00000028] z-[99] bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-md w-xs sm:w-sm md:min-w-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-700 flex items-center">
          Create New Teacher
        </h2>
        <button @click="emit('close')">
          <XMarkIcon class="w-6 h-6 text-gray-500 hover:text-gray-700" />
        </button>
      </div>
      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Avatar Upload -->
        <div>
          <label class="block text-gray-600 mb-2">Profile Picture</label>
          <div class="flex items-center space-x-4">
            <div v-if="avatarPreview" class="relative">
              <img
                :src="avatarPreview"
                alt="Avatar preview"
                class="w-16 h-16 rounded-full object-cover"
              />
              <button
                type="button"
                @click="removeAvatar"
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center"
              >
                <XMarkIcon class="w-3 h-3" />
              </button>
            </div>
            <div
              v-else
              class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center"
            >
              <UserIcon class="w-8 h-8 text-gray-400" />
            </div>
            <div class="flex-1">
              <label
                for="avatar-input"
                class="cursor-pointer flex items-center justify-center border border-gray-300 p-2 rounded-md hover:bg-gray-50"
              >
                <PhotoIcon class="w-5 h-5 text-gray-400 mr-2" />
                <span>Choose Image</span>
              </label>
              <input
                id="avatar-input"
                type="file"
                @change="handleFileChange"
                accept="image/*"
                class="hidden"
              />
              <p class="text-xs text-gray-500 mt-1">JPG, PNG, GIF. Max 3MB</p>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-gray-600">Name</label>
          <div class="flex items-center border border-gray-300 p-2 rounded-md">
            <UserIcon class="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              v-model="name"
              placeholder="Enter teacher's name"
              class="flex-1 outline-none"
            />
          </div>
        </div>
        <div>
          <label class="block text-gray-600">Subject Teaches</label>
          <div class="flex items-center border border-gray-300 p-2 rounded-md">
            <BookOpenIcon class="w-5 h-5 text-gray-400 mr-2" />
            <select v-model="subject" class="flex-1 outline-none">
              <option value="" disabled>Select Subject</option>
              <option value="0">Not Asigned</option>
              <option
                :disabled="s.teacher != {}"
                v-for="s in subjects"
                :key="s.id"
                :value="s.id"
              >
                {{ s.name }}
              </option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Create Teacher
        </button>
      </form>
    </div>
  </div>
</template>
