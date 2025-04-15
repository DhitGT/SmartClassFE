<template>
  <div v-if="$checkRole(['Leader','Secretary'])">
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
            <div class="text-lg font-bold">
              Add Schedule For {{ props.day }}
            </div>

            <div class="mb-4">
              <label class="block text-gray-600">Subject</label>
              <div
                class="flex items-center border border-gray-300 p-2 rounded-md"
              >
                <select
                  v-model="formData.subject_id"
                  class="flex-1 outline-none"
                >
                  <option value="" disabled>Select Subject</option>
                  <option
                    :disabled="subject.teacher != null"
                    v-for="subject in props.subjects"
                    :key="subject.id"
                    :value="subject.id"
                  >
                    {{ subject.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Start Time -->
            <div class="mb-4">
              <label class="block text-gray-600">Start Time</label>
              <input
                type="time"
                v-model="formData.start_time"
                class="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            <!-- End Time -->
            <div class="mb-4">
              <label class="block text-gray-600">End Time</label>
              <input
                type="time"
                v-model="formData.end_time"
                class="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-2">
              <button
                type="button"
                @click="handleClose"
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
import { onMounted, ref, defineProps, defineEmits, watch } from "vue";
import { PencilIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
const { $checkRole } = useNuxtApp()

import { useScheduleStore } from "~/stores/schedule"; // adjust path as needed
const scheduleStore = useScheduleStore();
const { idleSubject } = storeToRefs(scheduleStore); // reactive ref
const subjects = ref("");

const GetIdleSubject = async () => {
  console.log("get iddle 1 : ", idleSubject.value);
  if (!idleSubject.value) {
    console.log("get iddle 2");
    await scheduleStore.GetIdleSubject();
    console.log("IDLE SUBJECT:", idleSubject.value);
  }
};

onMounted(async () => {
  await GetIdleSubject();
});

const props = defineProps({
  type: String,
  subjects: Array,
  day: String,
  dayNum: String,
  isOpen: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update"]);
const showModal = ref(false);
const formData = ref({});

const openModal = () => {
  // formData.value = JSON.parse(JSON.stringify(props.member)); // Deep copy to prevent direct mutation
  showModal.value = true;
};

watch(
  () => props.isOpen,
  (val) => {
    GetIdleSubject();
    console.log("isOpen changed to:", val);
    showModal.value = val;
  }
);

const handleClose = () => {
  emit("close");
};

const submitEdit = () => {
  const FormDatas = new FormData();
  FormDatas.append("subject_id", formData.value.subject_id);
  FormDatas.append("day_number", props.dayNum);
  FormDatas.append("start_time", formData.value.start_time);
  FormDatas.append("end_time", formData.value.end_time);

  emit("update", FormDatas);
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
