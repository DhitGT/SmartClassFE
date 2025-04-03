<template>
  <div>
    <div
      @click.prevent="openModal"
      class="flex gap-3 cursor-pointer items-center"
    >
      <button class="text-blue-500 hover:text-blue-700 cursor-pointer">
        <PencilIcon class="h-5 w-5" />
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
            class="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
          >
            <div class="text-xl font-semibold text-gray-700 mb-4">
              Edit Subject
            </div>

            <!-- Subject Name -->
            <div class="mb-4">
              <label class="block text-gray-600 mb-2">Subject Name</label>
              <input
                v-model="formData.name"
                type="text"
                placeholder="Enter subject name"
                class="w-full p-2 border rounded-md"
                required
              />
            </div>

            <!-- Description -->
            <div class="mb-4">
              <label class="block text-gray-600 mb-2">Description</label>
              <textarea
                v-model="formData.description"
                placeholder="Enter description"
                class="w-full p-2 border rounded-md"
              ></textarea>
            </div>

            <!-- Icon Selection -->
            <div class="mb-4 relative">
              <label class="block text-gray-600 mb-2">Icon</label>
              <div
                class="w-full p-2 border rounded-md flex items-center justify-between cursor-pointer"
                @click="isDropdownIconOpen = !isDropdownIconOpen"
              >
                <span v-if="selectedIcon" class="flex items-center gap-2">
                  <component :is="selectedIcon.component" class="w-5 h-5" />
                  {{ selectedIcon.name }}
                </span>
                <span v-else class="text-gray-400">Select an icon</span>
              </div>

              <div
                v-if="isDropdownIconOpen"
                class="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg"
              >
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
import { ref, defineProps, defineEmits, onMounted } from "vue";
import {
  PencilIcon,
  BookOpenIcon,
  CalculatorIcon,
  BeakerIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  subject: Object,
  type: String,
  closeModal: Function,
});
const emit = defineEmits(["update"]);
const showModal = ref(false);
const formData = ref({});
const isDropdownIconOpen = ref(false);
const selectedIcon = ref(null);

const icons = [
  { name: "Math", value: "CalculatorIcon", component: CalculatorIcon },
  { name: "Science", value: "BeakerIcon", component: BeakerIcon },
  { name: "Geography", value: "GlobeAltIcon", component: GlobeAltIcon },
  { name: "Literature", value: "BookOpenIcon", component: BookOpenIcon },
  {
    name: "Computer",
    value: "ComputerDesktopIcon",
    component: ComputerDesktopIcon,
  },
];

const openModal = () => {
  // Make a deep copy of the subject object to avoid modifying the original
  formData.value = {
    id: props.subject.id,
    name: props.subject.name,
    description: props.subject.description || "",
    icon: props.subject.icon || "",
  };

  // Set the selected icon based on the subject's icon value
  const foundIcon = icons.find((icon) => icon.value === props.subject.icon);
  selectedIcon.value = foundIcon || null;

  showModal.value = true;
};

const selectIcon = (icon) => {
  selectedIcon.value = icon;
  formData.value.icon = icon.value;
  isDropdownIconOpen.value = false;
};

const submitEdit = () => {
  if (
    !formData.value.name ||
    !formData.value.description ||
    !formData.value.icon
  ) {
    alert("All fields are required!");
    return;
  }

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
