<script setup>
import { ref, defineEmits } from 'vue';
import { ArrowLeftIcon, UserIcon, LockClosedIcon, AtSymbolIcon, BriefcaseIcon, XMarkIcon, PhotoIcon } from '@heroicons/vue/24/solid';

const name = ref('');
const email = ref('');
const role = ref('');
const password = ref('');
const avatar = ref(null);
const avatarPreview = ref('');
const roles = ['Secretary', 'Treasurer', 'Member'];

const emit = defineEmits(['submit', 'close']);

const submitForm = () => {
  if (!name.value || !email.value || !role.value || !password.value) {
    alert('All fields are required!');
    return;
  }
  
  // Create FormData object to handle file upload
  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('email', email.value);
  formData.append('role', role.value);
  formData.append('password', password.value);
  
  if (avatar.value) {
    formData.append('avatar', avatar.value);
  }
  
  emit('submit', formData);
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    avatar.value = file;
    
    // Create preview URL
    avatarPreview.value = URL.createObjectURL(file);
  }
};

const removeAvatar = () => {
  avatar.value = null;
  avatarPreview.value = '';
  // Reset the file input
  const fileInput = document.getElementById('avatar-input');
  if (fileInput) fileInput.value = '';
};
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-[#00000028] bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-700 flex items-center">
          <ArrowLeftIcon class="w-5 h-5 mr-2 text-gray-500" /> Create New Member
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
              <img  :src="avatarPreview" alt="Avatar preview" class="w-16 h-16 rounded-full object-cover" />
              <button 
                type="button" 
                @click="removeAvatar" 
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center"
              >
                <XMarkIcon class="w-3 h-3" />
              </button>
            </div>
            <div v-else class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
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
              <p class="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 1MB</p>
            </div>
          </div>
        </div>
        
        <div>
          <label class="block text-gray-600">Name</label>
          <div class="flex items-center border border-gray-300 p-2 rounded-md">
            <UserIcon class="w-5 h-5 text-gray-400 mr-2" />
            <input type="text" v-model="name" placeholder="Enter name" class="flex-1 outline-none" />
          </div>
        </div>
        <div>
          <label class="block text-gray-600">Email</label>
          <div class="flex items-center border border-gray-300 p-2 rounded-md">
            <AtSymbolIcon class="w-5 h-5 text-gray-400 mr-2" />
            <input type="email" v-model="email" placeholder="Enter email" class="flex-1 outline-none" />
          </div>
        </div>
        <div>
          <label class="block text-gray-600">Role</label>
          <div class="flex items-center border border-gray-300 p-2 rounded-md">
            <BriefcaseIcon class="w-5 h-5 text-gray-400 mr-2" />
            <select v-model="role" class="flex-1 outline-none">
              <option value="" disabled>Select Role</option>
              <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-gray-600">Password</label>
          <div class="flex items-center border border-gray-300 p-2 rounded-md">
            <LockClosedIcon class="w-5 h-5 text-gray-400 mr-2" />
            <input type="password" v-model="password" placeholder="Enter password" class="flex-1 outline-none" />
          </div>
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Create Member
        </button>
      </form>
    </div>
  </div>
</template>