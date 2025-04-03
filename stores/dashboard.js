import { defineStore } from 'pinia';

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        user: null,
        token: process.client ? localStorage.getItem('token') : null,
        data : []
    }),

    actions: {
        async getCountData() {
            try {
                const { data } = await useFetch('/getCountData', {
                    method: 'POST',
                    baseURL: useRuntimeConfig().public.apiBase,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.client ? localStorage.getItem('token') : null}`
                    }
                });
                console.log('pinia daat:', data)
                this.data = data.value
            } catch (error) {
                console.error('Registration error:', error);
            }
        },
    }
});
