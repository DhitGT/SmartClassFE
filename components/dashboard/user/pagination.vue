<template>
    <div class="flex justify-between items-center mt-4">
      <span>Showing 1 to 10 of {{ totalPages * 10 }} entries</span>
      <div>
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['currentPage', 'totalPages']);
  
  const emit = defineEmits(['change-page']);
  
  const prevPage = () => {
    if (currentPage > 1) emit('change-page', currentPage - 1);
  };
  
  const nextPage = () => {
    if (currentPage < totalPages) emit('change-page', currentPage + 1);
  };
  </script>