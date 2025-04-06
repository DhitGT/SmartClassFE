<template>
  <div  @click="openModal">
    <button class="text-red-500 hover:text-red-700">
      <div class="flex gap-3 items-center">
          <TrashIcon class="h-5 w-5 cursor-pointer" />
          <div v-if="prop.type == 'mobile'">
              delete
          </div>
      </div>
    </button>
    <ReusableConfirmation
      v-model="showModal"
      title="Confirm Deletion"
      message="Are you sure you want to delete this item?"
      confirmText="Delete"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TrashIcon } from "@heroicons/vue/24/outline";

const showModal = ref(false);
const emit = defineEmits(["delete"]);
const prop = defineProps({type : { type: String, default: "pc" }});

const openModal = () => {
  showModal.value = true;
};

const confirmDelete = () => {
  showModal.value = false;
  emit("delete");
};
</script>
