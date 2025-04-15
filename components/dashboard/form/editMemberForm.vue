<template>
  <div v-if="$checkRole(['Leader'])" >
    <div  class="flex gap-3 items-center">
      <button @click="openModal" class="text-blue-500 hover:text-blue-700">
        <PencilIcon class="h-5 w-5 cursor-pointer" />
      </button>
      <div class="text-blue-500" v-if="props.type == 'mobile'">edit</div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-[#00000028] bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <form
            @submit.prevent="submitEdit"
            class="bg-white p-4 rounded-lg shadow-md w-96"
          >
            <div class="text-lg font-bold">Edit Member</div>

            <!-- Avatar Upload -->
            <div class="mb-4">
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
                  <p class="text-xs text-gray-500 mt-1">
                    JPG, PNG, or GIF. Max 1MB
                  </p>
                </div>
              </div>
            </div>

            <!-- Name -->
            <div class="mb-4">
              <label class="block text-gray-700">Name</label>
              <input
                v-model="formData.user.name"
                type="text"
                class="w-full border rounded p-2"
                required
              />
            </div>

            <!-- Email -->
            <div class="mb-4">
              <label class="block text-gray-700">Email</label>
              <input
              id="emailInput"
                v-model="formData.user.email"
                type="email"
                class="w-full border rounded p-2"
                required
              />
            </div>

            <!-- Password -->
            <div class="mb-4">
              <label class="block text-gray-700">Password</label>
              <input
                v-model="formData.access_code"
                type="text"
                class="w-full border rounded p-2"
                required
              />
            </div>

            <!-- Role Selection -->
            <div class="mb-4">
              <label class="block text-gray-600">Role</label>
              <div
                class="flex items-center border border-gray-300 p-2 rounded-md"
              >
                <BriefcaseIcon class="w-5 h-5 text-gray-400 mr-2" />
                <select
                  v-model="formData.user.role"
                  class="flex-1 outline-none"
                >
                  <option value="" disabled>Select Role</option>
                  <option v-for="r in roles" :key="r" :value="r">
                    {{ r }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-2">
              <button
                type="button"
                @click="showModal = false"
                class="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
const { $checkRole } = useNuxtApp()
import { ref, defineProps, defineEmits } from "vue";
import {
  PencilIcon,
  BriefcaseIcon,
  XMarkIcon,
  UserIcon,
  PhotoIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({ member: Object, type: String });
const emit = defineEmits(["update"]);
const roles = ["Secretary", "Treasurer", "Member"];
const showModal = ref(false);
const formData = ref({ ...props.member });
const avatarPreview = ref(props.member.avatar || "");

const openModal = () => {
  formData.value = { ...props.member };
  avatarPreview.value = props.member.avatar || "";
  showModal.value = true;
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.size <= 1048576) {
    // 1MB limit
    const reader = new FileReader();
    reader.onload = () => {
      avatarPreview.value = reader.result;
      formData.value.avatar = file;
    };
    reader.readAsDataURL(file);
  } else {
    alert("File size must be less than 1MB");
  }
};

const removeAvatar = () => {
  avatarPreview.value = "";
  formData.value.avatar = null;
};

const submitEdit = () => {
  emit("update", formData.value);
  showModal.value = false;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
