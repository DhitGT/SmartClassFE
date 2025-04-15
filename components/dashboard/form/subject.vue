<script setup>
import { ref, defineEmits } from 'vue';
import { BookOpenIcon, CalculatorIcon,CircleStackIcon, BeakerIcon, GlobeAltIcon,ComputerDesktopIcon } from '@heroicons/vue/24/outline';
const { $checkRole } = useNuxtApp()

const name = ref('');
const description = ref('');
const selectedIcon = ref(null);
const isDropdownOpen = ref(false);
const icons = [
  { name: 'Math', value: 'CalculatorIcon', component: CalculatorIcon },
  { name: 'Science', value: 'BeakerIcon', component: BeakerIcon },
  { name: 'Geography', value: 'GlobeAltIcon', component: GlobeAltIcon },
  { name: 'Literature', value: 'BookOpenIcon', component: BookOpenIcon },
  { name: 'Computer', value: 'ComputerDesktopIcon', component: ComputerDesktopIcon },
  { name: 'Database', value: 'CircleStackIcon', component: CircleStackIcon },
];

const emit = defineEmits(['submit', 'close']);

const selectIcon = (icon) => {
  selectedIcon.value = icon;
  isDropdownOpen.value = false;
};

const submitForm = () => {
  if (!name.value || !description.value || !selectedIcon.value) {
    alert('All fields are required!');
    return;
  }

  const formData = {
    name: name.value,
    description: description.value,
    icon: selectedIcon.value.value, // Store only the value
  };

  emit('submit', formData);
};
</script>

<template>
  <div v-if="$checkRole(['Leader','Secretary'])" class="fixed inset-0 flex items-center justify-center bg-[#00000028] z-[99] bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-md w-xs sm:w-sm md:min-w-md ">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-700">Create New Subject</h2>
        <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">X</button>
      </div>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block text-gray-600">Subject Name</label>
          <input type="text" v-model="name" placeholder="Enter subject name" class="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label class="block text-gray-600">Description</label>
          <textarea v-model="description" placeholder="Enter description" class="w-full p-2 border rounded-md"></textarea>
        </div>
        
        <!-- Custom Dropdown for Icons -->
        <div class="relative">
          <label class="block text-gray-600">Icon</label>
          <div 
            class="w-full p-2 border rounded-md flex items-center justify-between cursor-pointer" 
            @click="isDropdownOpen = !isDropdownOpen"
          >
            <span v-if="selectedIcon" class="flex items-center gap-2">
              <component :is="selectedIcon.component" class="w-5 h-5" />
              {{ selectedIcon.name }}
            </span>
            <span v-else class="text-gray-400">Select an icon</span>
          </div>

          <div v-if="isDropdownOpen" class="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg">
            <ul class="max-h-40 overflow-auto">
              <li 
                v-for="icon in icons" 
                :key="icon.value" 
                @click="selectIcon(icon)"
                class="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <component :is="icon.component" class="w-5 h-5" />
                {{ icon.name }}
              </li>
            </ul>
          </div>
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Create Subject
        </button>
      </form>
    </div>
  </div>
</template>
