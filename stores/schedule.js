import { defineStore } from "pinia";
import Toast from 'vue-toastification';

const { useToast } = Toast;

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    user: null,
    message: null,
    // token: process.client ? localStorage.getItem("token") : null,
    data: [],
    idleSubject: [],
    idleMember: [],
    scheduleSubject: [],
    nowScheduleSubject: [],
    scheduleDuty: [],
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
    async GetIdleSubject() {
      try {
        const { data } = await useFetch("/schedule/GetIdleSubject", {
          method: "POST",
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          },
        });
        this.idleSubject = data?.value?.subjects;
        console.log("pinia daatass:", this.idleSubject);
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    async GetIdleMember() {
      try {
        const { data } = await useFetch("/schedule/GetIdleMember", {
          method: "POST",
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          },
        });
        this.idleMember = data?.value?.members;
        console.log("pinia daatass:", this.idleMember);
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    async GetClassSubjectSchedule() {
      try {
        const { data } = await useFetch("/schedule/GetClassSubjectSchedule", {
          method: "POST",
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          },
        });
        this.scheduleSubject = data?.value?.schedule;
        console.log("pinia daatass:", this.scheduleSubject);
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    async GetClassNowSubjectSchedule() {
      try {
        const { data } = await useFetch("/schedule/GetClassNowSubjectSchedule", {
          method: "POST",
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          },
        });
        this.nowScheduleSubject = data?.value?.schedule;
        console.log("pinia daatass:", this.nowScheduleSubject);
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    async GetClassDutySchedule() {
      try {
        const { data } = await useFetch("/schedule/GetClassDutySchedule", {
          method: "POST",
          baseURL: useRuntimeConfig().public.apiBase,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              process.client ? localStorage.getItem("token") : null
            }`,
          },
        });
        this.scheduleDuty = data?.value?.schedule;
        console.log("pinia daatass:", this.scheduleDuty);
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    async SetSchedule(payload) {
      try {
        const { data } = await useFetch("/schedule/SetSchedule", {
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
        this.showToast("error", "Failed to set schedule.");
      }
    },
    async SetDutySchedule(payload) {
      try {
        const { data } = await useFetch("/schedule/SetDutySchedule", {
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
          // this.data = data.value;
          this.message = data.value.message;
          this.showToast(data.value.messageType || "success", this.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
        this.showToast("error", "Failed to set schedule.");
      }
    },
    async RemoveSchedule(payload) {
      try {
        const { data } = await useFetch("/schedule/RemoveSchedule", {
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
          this.message = data.value.message;
          this.showToast(data.value.messageType || "success", this.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
        this.showToast("error", "Failed to set schedule.");
      }
    },
    async RemoveDutySchedule(payload) {
      try {
        const { data } = await useFetch("/schedule/RemoveDutySchedule", {
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
          this.message = data.value.message;
          this.showToast(data.value.messageType || "success", this.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
        this.showToast("error", "Failed to set schedule.");
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
