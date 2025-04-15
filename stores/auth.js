import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: process.client ? JSON.parse(localStorage.getItem("user")) : null,
    token: process.client ? localStorage.getItem("token") : null,
    message: "",
  }),

  actions: {
    async register(userData) {
      try {
        const { data,message } = await useFetch("/register", {
          method: "POST",
          body: userData,
          baseURL: useRuntimeConfig().public.apiBase,
        });
        this.message = message;
        if(data.value){
            this.setAuth(data.value);
        }
      } catch (error) {
        // this.message = error.message;
        console.error("Registration error:", error);
      }
    },
    async handleGoogleCallback(userData) {
      try {
        const { data,message } = await useFetch("/auth/google", {
          method: "POST",
          body: userData,
          baseURL: useRuntimeConfig().public.apiBase,
        });
        this.message = message;
        if(data.value){
            this.setAuth(data.value);
        }
      } catch (error) {
        // this.message = error.message;
        console.error("Registration error:", error);
      }
    },

    async login(credentials) {
      try {
        const { data } = await useFetch("/login", {
          method: "POST",
          body: credentials,
          baseURL: useRuntimeConfig().public.apiBase,
        });
        this.message = data.message;
        this.setAuth(data.value);
      } catch (error) {
        // this.message = error.message;
        console.error("Login error:", error);
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      if (process.client) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },

    setAuth({ user, token }) {
      this.user = user;
      this.token = token;
      console.log("tokeennnn : ", this.token)
      if (process.client) {
        localStorage.setItem("token", token);
        let userData = { id: user.id, name: user.name, email: user.email, role : user.role };
        localStorage.setItem("user", JSON.stringify(userData));
      }
    },
  },
});
