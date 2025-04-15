<template>
  <div v-if="$checkRole(['Leader','Treasurer'])">
    <div @click.prevent="openModal" class="flex gap-3 items-center">
      <button class="text-blue-500 hover:text-blue-700">
        <PencilIcon class="h-5 w-5 cursor-pointer" />
      </button>
      <div class="text-blue-500" v-if="props.type == 'mobile'">edit</div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showModal" class="fixed inset-0 bg-[#00000028] bg-opacity-50 flex items-center justify-center p-4 z-50">
          <form @submit.prevent="submitEdit" class="bg-white p-4 rounded-lg shadow-md w-96">
            <div class="text-lg font-bold">Edit Payment Amount</div>
            <div class="px-4 py-2 flex items-center gap-2">
              <img
                :src="
                  member?.avatar
                    ? `${useRuntimeConfig().public.apiBaseUrl}/storage/${
                        member?.avatar
                      }`
                    : 'https://placehold.co/300'
                "
                class="h-5 w-5 md:h-10 md:w-10 object-cover rounded-full"
              />
              <div class="leading-5">
                <span class="font-semibold md:text-base text-sm">{{
                  member?.nama
                }}</span>
              </div>
              <hr>
            </div>
            <!-- Weekly Payment Amounts -->
            <div class="mb-4" v-for="(week, key) in formData.pembayaran" :key="key">
              <label class="block text-gray-700 capitalize">{{ key.replace('_', ' ') }}</label>
              <input v-model.number="week.nominal" type="number" class="w-full border rounded p-2" min="0" required />
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
import { ref, defineProps, defineEmits } from "vue";
import { PencilIcon } from "@heroicons/vue/24/outline";
const { $checkRole } = useNuxtApp()

const props = defineProps({ member: Object, type: String });
const emit = defineEmits(["update"]);
const showModal = ref(false);
const formData = ref({ ...props.member });

const openModal = () => {
  formData.value = JSON.parse(JSON.stringify(props.member)); // Deep copy to prevent direct mutation
  showModal.value = true;
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
