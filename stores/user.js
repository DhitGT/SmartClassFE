import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchUsers() {
      this.loading = true
      try {
        const { data } = await useFetch('http://localhost:8000/api/users')
        this.users = data.value || []
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
