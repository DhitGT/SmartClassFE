<template>
  <div class="w-full mx-auto">
    <div class="bg-white max-h-[60vh] overflow-y-scroll shadow-lg rounded-lg p-6">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Recent Tasks</h2>
        <a href="#" class="text-blue-500 hover:underline">View All</a>
      </div>

      <!-- Responsive Wrapper -->
      <div class="overflow-x-auto mt-4">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th
                class="border-b-2 border-gray-300 px-4 py-2 text-left text-sm md:text-base"
              >
                Task Name
              </th>
              <th
                class="border-b-2 border-gray-300 px-4 py-2 text-left text-sm md:text-base"
              >
                Subject
              </th>
              <th
                class="border-b-2 border-gray-300 px-4 py-2 text-left text-sm md:text-base"
              >
                Due Date
              </th>
              <th
                class="border-b-2 border-gray-300 px-4 py-2 text-left text-sm md:text-base"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="task in taskStore?.tasks"
              :key="task.id"
              class="hover:bg-gray-100 transition"
            >
              <td
                class="border-b border-gray-200 px-2 py-3 text-sm md:text-base"
              >
                {{ task.name }}
              </td>
              <td
                class="border-b border-gray-200 px-2 py-3 text-sm md:text-base"
              >
                {{ task.subject.name }}
              </td>
              <td
                class="border-b border-gray-200 px-2 py-3 text-sm md:text-base"
              >
                {{ formatDate(task.due_to)}}
              </td>
              <td class="border-b border-gray-200 px-2 py-3">
                <p
                  class="rounded-3xl px-3 py-1 w-fit text-xs md:text-base"
                  :class="statusClass(task.status)"
                >
                  {{ task.status }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useTaskStore } from "~/stores/task";
import { useSubjectStore } from "~/stores/subject";

const tasks = ref([]);
const taskStore = useTaskStore();
const subjectStore = useSubjectStore();

// Fetch subjects when the component is mounted
onMounted(async () => {
  await fetchTasks(); // Initial fetch of tasks
  await subjectStore.getSubject();
});

// Function to fetch tasks based on search and selected subject
const fetchTasks = async () => {
  tasks.value = await taskStore.getTask();
  console.log("TASK : ",tasks.value)
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // hour12: true,
  });
};



const task = [
  {
    id: 1,
    name: "Physics Assignment #4",
    subject: "Physics",
    assignedTo: "Grade 11",
    dueDate: "Mar 15, 2025",
    status: "In Progress",
  },
  {
    id: 2,
    name: "Math Quiz",
    subject: "Mathematics",
    assignedTo: "Grade 10",
    dueDate: "Mar 18, 2025",
    status: "Completed",
  },
  {
    id: 3,
    name: "Chemistry Lab Report",
    subject: "Chemistry",
    assignedTo: "Grade 12",
    dueDate: "Mar 20, 2025",
    status: "Pending",
  },
];

// Dynamic class for status
const statusClass = (status) => {
  return computed(() => {
    return {
      "text-yellow-600 bg-yellow-200 ": status === "InProgress",
      "text-green-600 bg-green-200": status === "Completed",
      "text-red-600 bg-red-200": status === "ToDo",
    };
  }).value;
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
</style>
