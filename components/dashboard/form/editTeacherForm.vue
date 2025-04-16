<template>
  <div v-if="$checkRole(['Leader','Secretary'])">
    <div @click.prevent="openModal" class="flex gap-3 cursor-pointer items-center">
      <button class="text-blue-500 hover:text-blue-700 cursor-pointer ">
        <PencilIcon class="h-5 w-5 " />
      </button>
      <div class="text-blue-500 " v-if="props.type == 'mobile'">edit</div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showModal" class="fixed inset-0 bg-[#00000028] bg-opacity-50 flex items-center justify-center p-4 z-[90]">
          <form @submit.prevent="submitEdit" class="bg-white p-4 rounded-lg shadow-md w-96">
            <div class="text-lg font-bold">Edit Teacher</div>
            
            <!-- Avatar Upload -->
            <div class="mb-4">
              <label class="block text-gray-600 mb-2">Profile Picture</label>
              <div class="flex items-center space-x-4">
                <div v-if="avatarPreview" class="relative">
                  <img :src="avatarPreview" alt="Avatar preview" class="w-16 h-16 rounded-full object-cover" />
                  <button type="button" @click="removeAvatar" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center">
                    <XMarkIcon class="w-3 h-3" />
                  </button>
                </div>
                <div v-else class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <UserIcon class="w-8 h-8 text-gray-400" />
                </div>
                
                <div class="flex-1">
                  <label for="avatar-input" class="cursor-pointer flex items-center justify-center border border-gray-300 p-2 rounded-md hover:bg-gray-50">
                    <PhotoIcon class="w-5 h-5 text-gray-400 mr-2" />
                    <span>Choose Image</span>
                  </label>
                  <input id="avatar-input" type="file" @change="handleFileChange" accept="image/*" class="hidden" />
                  <p class="text-xs text-gray-500 mt-1">JPG, PNG, or GIF. Max 1MB</p>
                </div>
              </div>
            </div>

            <!-- Name -->
            <div class="mb-4">
              <label class="block text-gray-700">Name</label>
              <input v-model="formData.name" type="text" class="w-full border rounded p-2" required />
            </div>
            
            <!-- Subject Selection -->
            <div class="mb-4">
              <label class="block text-gray-600">Subject</label>
              <div class="flex items-center border border-gray-300 p-2 rounded-md">
                <BookOpenIcon class="w-5 h-5 text-gray-400 mr-2" />
                <select v-model="formData.subject_id" class="flex-1 outline-none">
                  <option value="" disabled>Select Subject</option>
                  <option value="0">Not Asigned</option>
                  <option :disabled="subject.teacher != null" v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
                </select>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex justify-end space-x-2">
              <button type="button" @click="showModal = false" class="px-4 py-2 bg-gray-500 text-white rounded">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
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
import { ref, defineProps, defineEmits, onMounted } from "vue";
import { PencilIcon, XMarkIcon, UserIcon, PhotoIcon, BookOpenIcon } from "@heroicons/vue/24/outline";
import { useSubjectStore } from "~/stores/subject"; // Assuming you have a subject store
const { $checkRole } = useNuxtApp()

const props = defineProps({ teacher: Object, type: String,closeModal : Function });
const emit = defineEmits(["update"]);
const showModal = ref(false);
const formData = ref({});
const avatarPreview = ref("");
const subjects = ref([]);
const subjectStore = useSubjectStore();

onMounted(async () => {
  // Fetch subjects when component is mounted
  if(!subjectStore.data.subject){
    await fetchSubjects();
  }
});

const fetchSubjects = async () => {
  try {
    // Assuming your store has a method to get all subjects
    await subjectStore.getSubject();
    subjects.value = subjectStore.data.subject || [];
  } catch (error) {
    console.error("Error fetching subjects:", error);
  }
};

const openModal = async () => {
  await fetchSubjects();
  // Make a deep copy of the teacher object to avoid modifying the original
  formData.value = {
    id: props.teacher.id,
    name: props.teacher.name,
    subject_id: props.teacher.subject_id || "",
    avatar: null // We'll set this if a new file is uploaded
  };
  
  // Set avatar preview from teacher's existing avatar
  if (props.teacher.avatar) {
    avatarPreview.value = `${useRuntimeConfig().public.apiBaseUrl}/storage/${props.teacher.avatar}`;
  } else {
    avatarPreview.value = "";
  }
  
  // Make sure subjects are loaded
  if (subjects.value.length === 0) {
    await fetchSubjects();
  }
  
  showModal.value = true;
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.size <= 1048576) { // 1MB limit
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
  showModal.value = false;
  emit("update", formData.value);
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