import { defineStore } from "pinia";
import Toast from "vue-toastification";

const { useToast } = Toast;

export const useSubjectStore = defineStore("subject", {
  state: () => ({
    user: null,
    // message: null,
    // token: process.client ? localStorage.getItem("token") : null,
    data: [],
  }),

  actions: {
    showToast(type, message) {
      const toast = useNuxtApp().$toast; // Move inside function to ensure it's properly initialized
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      }
    },
    async getSubject() {
      this.data = [];
      try {
        const { data } = await useFetch("/subject/get", {
          method: "POST",
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          },
        });
        console.log("pinia daat:", data);
        this.data = data.value;
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    async addSubject(payload) {
      try {
        // console.log("payload addMem store :");
        // for (const [key, value] of payload.entries()) {
        //   console.log(`${key}:`, value);
        // }

        const { data } = await useFetch("/subject/add", {
          method: "POST",
          body: payload, // FormData is correctly passed
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          },
        });

        // console.log("pinia data:", data);

        if (data.value) {
          this.data = data.value;
          this.message = data.value.message;
          this.showToast(data.value.messageType || "success", this.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
        this.showToast("error", "Failed to add member.");
      }
    },
    async editSubject(payload) {
      try {
        const { data } = await useFetch("/subject/edit", {
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
    async deleteSubject(payload) {
      try {
        const { data } = await useFetch("/subject/delete", {
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
        this.showToast("error", "Failed to delete Subject.");
      }
    },
  },
});
