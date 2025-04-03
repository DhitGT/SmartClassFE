<!-- ~/pages/index.vue -->
<template>
  <div
    class="container min-h-screen pb-12 flex flex-col gap-4 mx-auto rounded-lg"
  >
    <div class="bg-white rounded-lg shadow-md">
      <div
        class="flex flex-col md:flex-row justify-between items-center p-4 rounded-lg"
      >
        <div class="items-center flex-col md:flex-row flex gap-4 min-w-full">
          
          <div class="flex w-full gap-4">
            
            <div class="md:ms-auto min-w-fit">
              <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">
                <div
                  @click="toggleModal"
                  class="flex items-center justify-center gap-1"
                >
                  <PlusIcon class="text-white w-6 h-6" />
                  <span class="hidden md:block"> Add New Subject </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DashboardFormSubject
      v-if="showModal"
      @submit="handleSubmit"
      @close="showModal = false"
    />
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardSubjectCard
        v-for="subject in subjects"
        :key="subject.id"
        @update="handleUpdate"
        @delete="handleDelete"
        :subject="subject"
        :icon="subject.icon"
      />
    </div>
    <!-- <DashboardSubjectTable /> -->
  </div>
</template>

<script setup>
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/vue/24/outline";
const showModal = ref(false);
import { onMounted } from "vue";

import { useSubjectStore } from "~/stores/subject";
const subjectStore = useSubjectStore();
const subjects =ref('');

const courses = [
  {
    id: 1,
    title: "Mathematics",
    description: "Advanced calculus and algebra for senior students",
    classes: 12,
    teachers: 4,
    icon: "DevicePhoneMobileIcon", // Replace with the actual Heroicon name
  },
  {
    id: 2,
    title: "Physics",
    description: "Fundamental physics concepts and laboratory work",
    classes: 8,
    teachers: 3,
    icon: "AcademicCapIcon", // Replace with the actual Heroicon name
  },
  {
    id: 3,
    title: "English",
    description: "Literature and language arts curriculum",
    classes: 10,
    teachers: 5,
    icon: "BookOpenIcon", // Replace with the actual Heroicon name
  },
];

const handleSubmit = async (formData) => {
  console.log("New Member Data:", formData);
  // toast.success('Success Add New Member');
  await subjectStore.addSubject(formData);
  showModal.value = false;
  await getSubjectData();
};


const handleDelete = async (subject) => {
  console.log("Deleting subject:", subject);
  const formData = new FormData();
  formData.append('id',subject.id)
  await subjectStore.deleteSubject(formData);
  await getSubjectData();
};

const handleUpdate = async (subject) => {
  let formData = new FormData()
  formData.append('id', subject.id)
  formData.append('name', subject.name)
  if(subject.icon){
    formData.append('icon', subject.icon)
  }
  formData.append('description', subject.description)
 
  
  await subjectStore.editSubject(formData);
  showModal.value = false;
  await getSubjectData();
  console.log("Updating subject:", subject);
};

const getSubjectData = async () => {
  await subjectStore.getSubject();
  subjects.value = subjectStore.data.subject

  console.log("subject getted : ", subjects);
};

const toggleModal = () => {
  showModal.value = !showModal.value;
};

onMounted(() => {
  getSubjectData();
});

definePageMeta({
  layout: "dashboard",
});
</script>
