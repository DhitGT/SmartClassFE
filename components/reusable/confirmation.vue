<template>
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="modelValue" class="fixed inset-0 bg-[#00000028] bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div class="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
            <p class="text-gray-600 mt-2">{{ message }}</p>
  
            <div class="flex justify-end space-x-2 mt-4">
              <button @click="cancel" class="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100">Cancel</button>
              <button @click="confirm" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">{{ confirmText }}</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup>
  defineProps({
    modelValue: Boolean,
    type : { type: String, default: "pc" },
    title: { type: String, default: "Are you sure?" },
    message: { type: String, default: "This action cannot be undone." },
    confirmText: { type: String, default: "Delete" },
  });
  const emit = defineEmits(["update:modelValue", "confirm", "cancel"]);
  
  const confirm = () => {
    emit("confirm");
    emit("update:modelValue", false);
  };
  
  const cancel = () => {
    emit("cancel");
    emit("update:modelValue", false);
  };
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  