<template>
  <div>
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
              <label class="block text-gray-600 mb-2">Select Members</label>
              <div
                class="max-h-48 overflow-y-auto border border-gray-300 p-2 rounded-md space-y-1"
              >
                <div
                  v-for="member in idleMember"
                  :key="member.id"
                  class="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    :value="member.id"
                    v-model="formData.member_ids"
                    :disabled="member.teacher != null"
                    class="accent-blue-500"
                  />
                  <label class="text-gray-800">
                    {{ member.user?.name || "Unknown" }}
                  </label>
                </div>
              </div>
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
import { useUserStore } from "~/stores/user";
import { useScheduleStore } from "~/stores/schedule";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const scheduleStore = useScheduleStore();
const { idleMember } = storeToRefs(scheduleStore); // reactive ref

const GetIdleMember = async () => {
  console.log("get iddle 1 : ", idleMember.value);
  if (!idleMember.value) {
    console.log("get iddle 2");
    await scheduleStore.GetIdleMember();
    console.log("IDLE SUBJECT:", idleMember.value);
  }
};

onMounted(async () => {
  await GetIdleMember();
});

const props = defineProps({
  type: String,
  day: String,
  dayNum: String,
  isOpen: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update"]);
const showModal = ref(false);
const formData = ref({
  member_ids: [],
});

const openModal = () => {
  // formData.value = JSON.parse(JSON.stringify(props.member)); // Deep copy to prevent direct mutation
  showModal.value = true;
};

watch(
  () => props.isOpen,
  (val) => {
    GetIdleMember();
    console.log("isOpen changed to:", val);
    showModal.value = val;
  }
);

const handleClose = () => {
  emit("close");
};

const submitEdit = () => {
  const FormDatas = new FormData();
  formData.value.member_ids.forEach((id) => {
    FormDatas.append("member_ids[]", id);
  });
  FormDatas.append("day_number", props.dayNum);

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
