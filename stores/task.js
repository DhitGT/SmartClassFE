import { defineStore } from "pinia";
import Toast from 'vue-toastification';

const { useToast } = Toast;

export const useTaskStore = defineStore("task", {
  state: () => ({
    user: null,
    message: null,
    // token: process.client ? localStorage.getItem("token") : null,
    tasks:[],
    data:[],
  }),

  actions: {
    showToast(type, message) {
      const toast = useToast(); 
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      }
    },
    async getTask(search = '',subject = '') {
      try {
        const formData = new FormData()
        if(search){
          formData.append('search',search)
        }
        if(subject != '0'){
          formData.append('subject',subject)
        }
        
        const { data } = await useFetch("/task/get", {
          method: "POST",
          body:formData,
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          },
        });
        this.tasks = data.value.tasks;
        console.log("pinia daatass:", this.tasks);
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    async addTask(payload) {
      try {
        console.log("payload addMem store :");
        for (const [key, value] of payload.entries()) {
          console.log(`${key}:`, value);
        }

        const { data } = await useFetch("/task/add", {
          method: "POST",
          body: payload, // FormData is correctly passed
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          }, // Remove "Content-Type"
        });

        console.log("pinia data:", data);

        if (data.value) {
          this.data = data.value;
          this.message = data.value.message;
          this.showToast(data.value.messageType || "success", this.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
        this.showToast("error", "Failed to add teacher.");
      }
    },
    async deleteTask(payload) {
      try {
        const { data } = await useFetch("/task/delete", {
          method: "POST",
          body: payload, // FormData is correctly passed
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          }, // Remove "Content-Type"
        });

        console.log("pinia data:", data);

        if (data.value) {
          this.data = data.value;
          this.message = data.value.message;
          this.showToast(data.value.messageType || "success", this.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
        this.showToast("error", "Failed to add teacher.");
      }
    },
    async updateTaskStatus(payload) {
      try {
        const { data } = await useFetch("/task/updateStatus", {
          method: "POST",
          body: payload, // FormData is correctly passed
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          }, // Remove "Content-Type"
        });

        // console.log("pinia data:", data);

        if (data.value) {
          this.data = data.value;
          this.message = data.value.message;
          this.showToast(data.value.messageType || "success", this.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
        this.showToast("error", "Failed to add teacher.");
      }
    },
    async editTask(payload) {
      try {
        const { data } = await useFetch("/task/edit", {
          method: "POST",
          body: payload, // FormData is correctly passed
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          },
        });

        console.log("pinia data:", data);

        if (data.value) {
          this.data = data.value;
          this.message = data.value.message;
          this.showToast(data.value.messageType || "success", this.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
        this.showToast("error", "Failed to edit member.");
      }
    },
  },
});
