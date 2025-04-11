import { defineStore } from "pinia";
import Toast from 'vue-toastification';

const { useToast } = Toast;

export const useCashStore = defineStore("cash", {
  state: () => ({
    user: null,
    message: null,
    // token: process.client ? localStorage.getItem("token") : null,
    data: [],
    cashLogData: [],
    dataPerBulan: [],
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
    async getClassCashSummary(payload) {
      try {
        const { data } = await useFetch("/cash/getClassCashSummary", {
          method: "POST",
          body: payload,
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          },
        });
        this.data = data.value;
        console.log("pinia cash daatass:", this.data);
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    async getCashLog(payload) {
      try {
        const { data } = await useFetch("/cash/getCashLog", {
          method: "POST",
          body: payload,
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          },
        });
        this.cashLogData = data.value.data;
        console.log("pinia cash daatass:", this.cashLogData);
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    async listPembayaranPerBulan(payload) {
      try {
        const { data } = await useFetch("/cash/listPembayaranPerBulan", {
          method: "POST",
          body: payload,
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          },
        });
        this.dataPerBulan = data.value;
        console.log("pinia cash daatass:", this.dataPerBulan);
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    async addCash(payload) {
      try {
        console.log("payload addMem store :");
        // for (const [key, value] of payload.entries()) {
        //   console.log(`${key}:`, value);
        // }

        const { data } = await useFetch("/cash/add", {
          method: "POST",
          body: payload, // FormData is correctly passed
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          }, // Remove "Content-Type"
        });

        console.log("pinia cash add data:", data);

        if (data.value) {
          this.data = data.value;
          this.message = data.value.message;
          this.showToast(data.value.messageType || "success", this.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
        this.showToast("error", "Failed to add cash .");
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
    async updateCash(payload) {
      try {
        const { data } = await useFetch("/cash/edit", {
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
