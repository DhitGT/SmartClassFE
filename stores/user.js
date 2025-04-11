import { defineStore } from "pinia";
import Toast from 'vue-toastification';

const { useToast } = Toast;

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    data: [],
    pagination: null,
    message: null,
    totalMembers: 0,
    members: [],
    filterMonth: '',
    filterYear: '',
    members: [],
    loading: false,
    error: null,
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

    async addMember(payload) {
      try {
        console.log("payload addMem store :");
        for (const [key, value] of payload.entries()) {
          console.log(`${key}:`, value);
        }
    
        const { data } = await useFetch("/member/add", {
          method: "POST",
          body: payload,  // FormData is correctly passed
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
        this.showToast("error", "Failed to add member.");
      }
    },
    async editMember(payload) {
      try {
        const { data } = await useFetch("/member/edit", {
          method: "POST",
          body: payload,  // FormData is correctly passed
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
    async deleteMember(payload) {
      try {
        const { data } = await useFetch("/member/delete", {
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

        console.log("pinia data:", data);

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

    async getMember(search = "", role = "", page = 1, per_page = 10) {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await useFetch(`/member/get`, {
          method: "POST",
          baseURL: useRuntimeConfig().public.apiBase,
          body: { search, role, page, per_page,month : this.filterMonth, year : this.filterYear },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          },
        });

        console.log("Pinia members data:", data);

        if (data.value && data.value.data) {
          this.members = data.value.data.members.data;
          this.totalMembers = data.value.data.members.total;
          this.pagination = {
            current_page: data.value.data.members.current_page,
            last_page: data.value.data.members.last_page,
            per_page: data.value.data.members.per_page,
          };
          console.log("Pinia members list:", this.members);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
        this.error = "Failed to load members.";
      } finally {
        this.loading = false;
      }
    },
  },
});
