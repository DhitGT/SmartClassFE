import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useTeacherStore = defineStore("teacher", {
  state: () => ({
    user: null,
    message: null,
    // token: process.client ? localStorage.getItem("token") : null,
    data: [],
  }),

  actions: {
    showToast(type, message) {
      const toast = useToast(); // Move inside function to ensure it's properly initialized
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      }
    },
    async getTeacher(search = "", role = "", page = 1, per_page = 10) {
      try {
        const { data } = await useFetch("/teacher/get", {
          method: "POST",
          body: { search, role, page, per_page },
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          },
        });
        this.data = data.value.data;
        console.log("pinia daatass:", this.data);
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    async addTeacher(payload) {
      try {
        console.log("payload addMem store :");
        for (const [key, value] of payload.entries()) {
          console.log(`${key}:`, value);
        }

        const { data } = await useFetch("/teacher/add", {
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
    async deleteTeacher(payload) {
      try {
        const { data } = await useFetch("/teacher/delete", {
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
    async editTeacher(payload) {
      try {
        const { data } = await useFetch("/teacher/edit", {
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
