<template>
  <div>
    <!-- Desktop View: Horizontal Layout -->
    <div class="hidden md:flex gap-4">
      <!-- To Do Column -->
      <div
        class="bg-gray-200 rounded-lg p-4 w-1/3 shadow-lg inset-ring-neutral-500"
        @dragover.prevent
        @drop="onDrop('ToDo')"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-semibold text-lg">To Do</h2>
          <span class="text-sm text-gray-500"
            >{{ todoTasks?.length }} Tasks</span
          >
        </div>
        <div class="space-y-3">
          <div
            v-for="task in todoTasks"
            :key="task.id"
            class="bg-white p-4 rounded-lg shadow-sm"
            draggable="true"
            @dragstart="startDrag($event, task)"
            @touchstart="touchStart($event, task)"
            @touchmove="touchMove($event)"
            @touchend="touchEnd($event, 'todo')"
          >
            <div class="flex justify-between items-start mb-1">
              <span class="text-xs text-blue-600 font-medium">{{
                task.subject.name
              }}</span>
              <!-- <button class="text-gray-400">
                <span class="block">···</span>
              </button> -->
            </div>
            <h3 class="font-bold text-gray-800 mb-1">{{ task.name }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ task.description }}</p>
            <div v-if="task.attachments && task?.attachments?.length">
              <h4 class="font-semibold text-sm text-gray-700 mt-2">
                Attachments:
              </h4>
              <ul class="list-disc pl-5">
                <li v-for="attachment in task.attachments" :key="attachment.id">
                  <a
                    class="text-slate-700 text-xs"
                    :href="attachment.path"
                    target="_blank"
                    >{{
                      attachment.name.length > 20
                        ? attachment.name.substring(0, 20 - 3) + "..."
                        : attachment.name
                    }}</a
                  >
                </li>
              </ul>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex -space-x-2">
                <!-- Assuming you have assignees data -->
                <img
                  v-for="avatar in task.assignees"
                  :key="avatar"
                  :src="avatar"
                  class="w-6 h-6 rounded-full border border-white bg-gray-200"
                />
              </div>
              <div class="text-xs text-gray-500">Due: {{ task.due_to }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- In Progress Column -->
      <div
        class="bg-gray-200 rounded-lg p-4 w-1/3 shadow-lg inset-ring-neutral-500"
        @dragover.prevent
        @drop="onDrop('InProgress')"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-semibold text-lg">In Progress</h2>
          <span class="text-sm text-gray-500"
            >{{ inProgressTasks?.length }} Tasks</span
          >
        </div>
        <div class="space-y-3">
          <div
            v-for="task in inProgressTasks"
            :key="task.id"
            class="bg-white p-4 rounded-lg shadow-sm"
            draggable="true"
            @dragstart="startDrag($event, task)"
            @touchstart="touchStart($event, task)"
            @touchmove="touchMove($event)"
            @touchend="touchEnd($event, 'InProgress')"
          >
            <div class="flex justify-between items-start mb-1">
              <span class="text-xs text-blue-600 font-medium">{{
                task.subject.name
              }}</span>
              <!-- <button class="text-gray-400">
                <span class="block">···</span>
              </button> -->
            </div>
            <h3 class="font-bold text-gray-800 mb-1">{{ task.name }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ task.description }}</p>
            <div v-if="task.attachments && task?.attachments?.length">
              <h4 class="font-semibold text-sm text-gray-700 mt-2">
                Attachments:
              </h4>
              <ul class="list-disc pl-5">
                <li v-for="attachment in task.attachments" :key="attachment.id">
                  <a
                    class="text-slate-700 text-xs"
                    :href="attachment.path"
                    target="_blank"
                    >{{ attachment.name }}</a
                  >
                </li>
              </ul>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex -space-x-2">
                <!-- Assuming you have assignees data -->
                <img
                  v-for="avatar in task.assignees"
                  :key="avatar"
                  :src="avatar"
                  class="w-6 h-6 rounded-full border border-white bg-gray-200"
                />
              </div>
              <div class="text-xs text-gray-500">Due: {{ task.due_to }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Completed Column -->
      <div
        class="bg-gray-200 rounded-lg p-4 w-1/3 shadow-lg inset-ring-neutral-500"
        @dragover.prevent
        @drop="onDrop('Completed')"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-semibold text-lg">Completed</h2>
          <span class="text-sm text-gray-500"
            >{{ completedTasks?.length }} Tasks</span
          >
        </div>
        <div class="space-y-3">
          <div
            v-for="task in completedTasks"
            :key="task.id"
            class="bg-white p-4 rounded-lg shadow-sm"
            draggable="true"
            @dragstart="startDrag($event, task)"
            @touchstart="touchStart($event, task)"
            @touchmove="touchMove($event)"
            @touchend="touchEnd($event, 'completed')"
          >
            <div class="flex justify-between items-start mb-1">
              <span class="text-xs text-blue-600 font-medium">{{
                task.subject.name
              }}</span>
              <!-- <button class="text-gray-400">
                <span class="block">···</span>
              </button> -->
            </div>
            <h3 class="font-bold text-gray-800 mb-1">{{ task.name }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ task.description }}</p>
            <div v-if="task.attachments && task?.attachments?.length">
              <h4 class="font-semibold text-sm text-gray-700 mt-2">
                Attachments:
              </h4>
              <ul class="list-disc pl-5">
                <li v-for="attachment in task.attachments" :key="attachment.id">
                  <a
                    class="text-slate-700 text-xs"
                    :href="attachment.path"
                    target="_blank"
                    >{{ attachment.name }}</a
                  >
                </li>
              </ul>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex -space-x-2">
                <!-- Assuming you have assignees data -->
                <img
                  v-for="avatar in task.assignees"
                  :key="avatar"
                  :src="avatar"
                  class="w-6 h-6 rounded-full border border-white bg-gray-200"
                />
              </div>
              <div class="text-xs text-gray-500">
                Completed: {{ task.due_to }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile View: Tab-based Layout -->
    <div class="md:hidden">
      <div class="flex mb-4 border-b">
        <button
          v-for="tab in ['To Do', 'In Progress', 'Completed']"
          :key="tab"
          @click="activeTab = tab"
          class="px-4 py-2 text-sm font-medium"
          :class="
            activeTab === tab
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          "
        >
          {{ tab }}
          <span class="ml-1 text-xs bg-gray-200 rounded-full px-2 py-0.5">
            {{
              tab === "To Do"
                ? todoTasks?.length
                : tab === "In Progress"
                ? inProgressTasks?.length
                : completedTasks?.length
            }}
          </span>
        </button>
      </div>

      <!-- Mobile Task Column -->
      <div class="p-4 bg-gray-200 min-h-screen">
        <div
          class="space-y-4"
          @dragover.prevent
          @drop="onDrop(activeTabStatus)"
        >
          <div
            v-for="task in activeTasks"
            :key="task.id"
            class="bg-white p-4 rounded-lg shadow-sm"
            draggable="true"
            
          >
            <div class="flex justify-between items-start mb-1">
              <span class="text-xs text-blue-600 font-medium">{{
                task.subject.name
              }}</span>

              <div class="relative" v-if="isMobile">
                <button class="text-gray-400" v-if="useNuxtApp().$checkRole(['Leader','Secretary'])" @click="openActionsMenu(task)">
                  <span class="block">···</span>
                </button>

                <div
                  v-if="actionsMenuOpen && selectedTaskId === task.id"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                >
                  <div class="py-1">
                    <button
                      v-for="status in ['ToDo', 'InProgress', 'Completed']"
                      :key="status"
                      @click.prevent="moveTask(task, status)"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    >
                      Move to
                      {{
                        status === "ToDo"
                          ? "To Do"
                          : status === "InProgress"
                          ? "In Progress"
                          : "Completed"
                      }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h3 class="font-bold text-gray-800 mb-1">{{ task.name }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ task.description }}</p>
            <div v-if="task.attachments && task?.attachments?.length">
              <h4 class="font-semibold text-sm text-gray-700 mt-2">
                Attachments:
              </h4>
              <ul class="list-disc pl-5">
                <li v-for="attachment in task.attachments" :key="attachment.id">
                  <a
                    class="text-slate-700 text-xs"
                    :href="attachment.path"
                    target="_blank"
                    >{{ attachment.name }}</a
                  >
                </li>
              </ul>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex -space-x-2">
                <!-- Assuming you have assignees data -->
                <img
                  v-for="avatar in task.assignees"
                  :key="avatar"
                  :src="avatar"
                  class="w-6 h-6 rounded-full border border-white bg-gray-200"
                />
              </div>
              <div class="text-xs text-gray-500">
                {{
                  activeTab === "Completed"
                    ? `Completed ${task.due_to}`
                    : `Due: ${task.due_to}`
                }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Action Button -->
      <div class="fixed bottom-4 right-4">
        

        <!-- Move Options -->
        <div
          v-if="showMoveOptions && isTouchDragging && touchDraggingTask"
          class="absolute bottom-16 right-0 bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div class="p-2">
            <button
              v-for="status in ['ToDo', 'InProgress', 'Completed']"
              :key="status"
              @click="moveTask(touchDraggingTask, status)"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded"
            >
              Move to
              {{
                status === "Todo"
                  ? "To Do"
                  : status === "InProgress"
                  ? "In Progress"
                  : "Completed"
              }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

const draggingTask = ref(null);
const touchDraggingTask = ref(null);
const isTouchDragging = ref(false);
const activeTab = ref("To Do");
const isMobile = ref(false);
const actionsMenuOpen = ref(false);
const selectedTaskId = ref(null);
const showMoveOptions = ref(false);

// Fetch tasks on component mount
onMounted(() => {
  taskStore.getTask();
  checkIfMobile();
  window.addEventListener("resize", checkIfMobile);

  // Cleanup event listener on component unmount
  onUnmounted(() => {
    window.removeEventListener("resize", checkIfMobile);
  });
});

// Computed properties to filter tasks by status
const todoTasks = computed(() =>
  taskStore?.tasks?.filter((task) => task.status === "ToDo")
);
const inProgressTasks = computed(() =>
  taskStore?.tasks?.filter((task) => task.status === "InProgress")
);
const completedTasks = computed(() =>
  taskStore?.tasks?.filter((task) => task.status === "Completed")
);

// Get the active tasks based on selected tab
const activeTasks = computed(() => {
  if (activeTab.value === "To Do") return todoTasks.value;
  if (activeTab.value === "In Progress") return inProgressTasks.value;
  return completedTasks.value;
});

// Get the status string from active tab
const activeTabStatus = computed(() => {
  if (activeTab.value === "To Do") return "ToDo";
  if (activeTab.value === "In Progress") return "InProgress";
  return "Completed";
});

// Touch event handlers
function touchStart(event, task) {
  touchDraggingTask.value = task;
  isTouchDragging.value = true;
}

function touchMove(event) {
  // Prevent default to avoid scrolling when dragging
  if (isTouchDragging.value) {
    event.preventDefault();
  }
}

function touchEnd(event, status) {
  if (isTouchDragging.value && touchDraggingTask.value) {
    moveTask(touchDraggingTask.value, status);
    isTouchDragging.value = false;
    touchDraggingTask.value = null;
  }
}

// Start drag operation
function startDrag(event, task) {
  draggingTask.value = task;
  // Set data transfer with the task id
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", task.id);
}

// Handle drop operation
function onDrop(status) {
  if (draggingTask.value) {
    moveTask(draggingTask.value, status);
    // Reset dragging task
    draggingTask.value = null;
  }
}

async function updateTaskStatus(task, status) {
  const formData = new FormData();
  formData.append("id", task.id);
  formData.append("status", status);
  await taskStore.updateTaskStatus(formData);
  await taskStore.getTask();
}

// Move task to a new status
async function moveTask(task, status) {

  await updateTaskStatus(task, status);
  closeActionsMenu();
  showMoveOptions.value = false;

}

// Open actions menu for a task
function openActionsMenu(task) {
  selectedTaskId.value = task.id;
  actionsMenuOpen.value = true;

  // Add a click event listener to close the menu when clicking outside
  setTimeout(() => {
    document.addEventListener("click", closeActionsMenuOnClickOutside);
  }, 0);
}

// Close actions menu
function closeActionsMenu() {
  actionsMenuOpen.value = false;
  selectedTaskId.value = null;
  document.removeEventListener("click", closeActionsMenuOnClickOutside);
}

// Close actions menu when clicking outside
function closeActionsMenuOnClickOutside(event) {
  closeActionsMenu();
}

// Check if device is mobile
function checkIfMobile() {
  isMobile.value = window.innerWidth < 768;
}
</script>
